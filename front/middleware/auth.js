// If it's a private page and there's no payload, redirect.
export default function({ store, redirect, route }) {
  const auth = store.state.auth;
  if (route.name && !auth.publicPages.includes(route.name) && !auth.payload) {
    return redirect('/login');
  }

  // anonymous pages
  if (route.name && auth.anonymousPages.includes(route.name) && auth.payload) {
    return redirect('/');
  }
}
