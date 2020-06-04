import {
  makeAuthPlugin,
  initAuth,
  hydrateApi,
  models,
  cookieStorage,
} from '@/plugins/feathers-client';

const auth = makeAuthPlugin({
  userService: 'user',
  state: {
    publicPages: ['login', 'register', 'index', 'crash'],
    anonymousPages: ['login', 'register'],
  },
  actions: {
    // Handles initial authentication
    onInitAuth({ state, dispatch }, payload) {
      if (payload) {
        return dispatch('authenticate', {
          strategy: 'jwt',
          accessToken: state.accessToken,
        });
      }
    },
  },
});

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
);
const servicePlugins = requireModule
  .keys()
  .map((modulePath) => requireModule(modulePath).default);

export const state = () => ({
  slideOutVisible: false,
  darken: false,
  showLoadingOverlay: false,
});

export const mutations = {
  setLoadingOverlay(state, value) {
    state.showLoadingOverlay = value;
  },
  setSlideOutState(state, value) {
    state.slideOutVisible = value;
  },
  closeSlideOut(state) {
    state.slideOutVisible = false;
  },
  openSlideOut(state) {
    state.slideOutVisible = true;
  },
  setDarkener(state, value) {
    state.darken = value;
  },
  toggleDarkener(state) {
    state.darken = !state.darken;
  },
};

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt',
    });
  },
  async nuxtClientInit(
    { state, dispatch, commit },
    { app: { $toast, router } }
  ) {
    hydrateApi({ api: models.api });
    // Run the authentication with the access token hydrated from the server store
    if (state.auth.accessToken) {
      try {
        await dispatch('auth/onInitAuth', state.auth.payload);
      } catch (err) {
        cookieStorage.removeItem('feathers-jwt');
        setTimeout(async () => {
          await router.push({
            name: 'index',
          });
        }, 10);
      }
    }
  },
};

export const plugins = [...servicePlugins, auth];
