# feathers-cookie-storage-bug

clone repo then:

```bash
cd back && yarn && yarn dev
```
and
```bash
cd front && yarn && yarn dev
```

server runs on 8080 and vue on 3000

visit http://localhost:3000/

### Problem explained by [Marshall](https://github.com/marshallswain) (Thank you Marshall):
When you `await` anything inside of the async `mounted` method, the return value for the method becomes the awaited promise.  Vue will then handle the reponse or error from that promise.  In this case, you're getting an error back, so Nuxt's default global error handler turns the error message into a reactive object so that it can attempt to display the error message on the error page.  If you look at the first screenshot I sent, the `app` key in the error object is the feathers-client app.  Vue then crawls the entire object and turns it into a reactive.  The problem is that down inside the app object is an object for the auth plugin, which also contains the options used to initialize the auth plugin, which includes the `cookieStorage` instance.  So when Vue tries to crawl the `cookieStorage`, it ends up running `setItem`.
So this problem is caused by a missing try/catch in the `mounted` hook.
