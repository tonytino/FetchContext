## FetchContext

### Purpose

Will fetch data from the endpoint provided, and expose such via context.

Has support for reading/writing from the browser cache using several strategies.

_This component will NOT manage your cache lifetime._

### Technologies Leveraged

[React API](https://reactjs.org/docs/react-api.html)

[React DOM API](https://reactjs.org/docs/react-dom.html)

[React Hooks API](https://reactjs.org/docs/hooks-reference.html)

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

[Cache API](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/cache-api)

### Example Usage

```jsx
<FetchContext
  cacheName='todosAppCache'
  cachingStrategy='networkFallbackCache'
  defaultData={{
    userId: 0,
    id: 0,
    title: 'Example Todo',
    completed: false
  }}
  request={new Request('https://jsonplaceholder.typicode.com/todos/1')}
>
  <RenderJSON />
</FetchContext>
```

### Try It Out

`App.js` is already configured to demo all four caching strategies. Try testing
out the functionality by running through this flow:

1. Turn off WiFi and load page

    Default data should be loaded only.

2. Turn on WiFi and load page

    Network data should be loaded only.

3. Turn off WiFi and load page

    Cache and default data should be loaded only.

    _Default data will be loaded where `cachingStrategy = 'network'`._

4. Turn on WiFI and load page

    Network and cache data should be loaded only.

    _Cache data will be loaded where `cachingStrategy = 'cacheFallbackNetwork'`._

    _Cache data will be loaded temporarily where `cachingStrategy = 'cacheThenNetwork'`; you can see this by throttling your network speed to `Slow 3G` in devtools)._



```bash
git clone ${REPO}
npm install
npm start
```

### Concerns

- `fetch` may not be supported in all environments
- `caches` may not be supported in all environments
- Cache lifetime is not managed

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
