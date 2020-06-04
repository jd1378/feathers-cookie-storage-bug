const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  mode: 'universal',
  env: {
    baseUrl,
    backendUrl,
  },
  /*
   ** Headers of the page
   */
  head: {},
  /*
   ** Customize the progress-bar color
   */
  // loading: '@/components/loading.vue',
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@/plugins/feathers-client.js',
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-client-init-module'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
    // plugins: [new ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|fa/)],
    transpile: ['@feathersjs/client', 'feathers-vuex'],
    babel: {
      sourceType: 'unambiguous',
      presets({ isServer }) {
        const targets = isServer ? { node: 'current' } : { ie: 11 };
        return [[require.resolve('@nuxt/babel-preset-app'), { targets }]];
      },
    },
  },
  render: {
    // HTTP2 header for assets
    pushAssets: (req, res, publicPath, preloadFiles) =>
      preloadFiles
        .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
        .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
  },
  router: {
    middleware: ['auth'],
  },
};
