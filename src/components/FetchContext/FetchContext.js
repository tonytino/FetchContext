import React from 'react';
import Context from './Context';
import {
  fetchCacheFallbackNetworkResponse,
  fetchCacheThenNetworkResponse,
  fetchNetworkFallbackCacheResponse,
  fetchNetworkResponse,
} from './fetchers';

const CACHING_STRATEGIES = [
  'cacheFallbackNetwork',
  'cacheThenNetwork',
  'network',
  'networkFallbackCache',
];

/**
 * Loads requests received after page-paint, exposing the response in context.
 *
 * **NOTE:** This component will NOT manage your cache lifetime.
 *
 * Page-paint: https://reactjs.org/docs/hooks-reference.html#timing-of-effects
 *
 * @param {string} cacheName - The name to store the cache under
 * @param {string} cachingStrategy - The strategy to employ for fetching/caching.
 *  Options include:
 *  - cacheFallbackNetwork
 *  - cacheThenNetwork
 *  - network (default)
 *  - networkFallbackCache
 * @param defaultData - The initial data to load (i.e. before API response)
 * @param request - A Request object or a URL string
 */
function FetchContext(props) {
  let { cachingStrategy = 'network' } = props;
  const {
    children = null,
    cacheName = 'fetchContextCache',
    defaultData = [],
    request = 'https://jsonplaceholder.typicode.com/todos',
  } = props;

  // Default to 'network' if we received an unsupported caching strategy
  if (!CACHING_STRATEGIES.includes(cachingStrategy)) {
    console.warn(
      `<FetchContext /> received an invalid value for prop 'cachingStrategy'. `+
      `Received ${cachingStrategy}. Defaulting value to 'network' instead.`
    )
    cachingStrategy = 'network';
  }

  // ['default', 'cache', 'network'] // default is the default data defined
  const [dataSource, setDataSource] = React.useState('default');
  const [data, setData] = React.useState(defaultData);

  const fetchContext = {
    cachingStrategy,
    data,
    dataSource,
    defaultData,
    request, // This will be whatever was passed in! So either String or Request
  };

  React.useEffect(() => {
    switch (cachingStrategy) {
      case 'cacheFallbackNetwork':
        fetchCacheFallbackNetworkResponse(
          request,
          cacheName,
          setData,
          setDataSource
        );
        break;
      case 'cacheThenNetwork':
        fetchCacheThenNetworkResponse(
          request,
          cacheName,
          setData,
          setDataSource
        );
        break;
      case 'network':
        fetchNetworkResponse(request, setData, setDataSource);
        break;
      case 'networkFallbackCache':
        fetchNetworkFallbackCacheResponse(
          request,
          cacheName,
          setData,
          setDataSource
        );
        break;
      default:
        fetchNetworkResponse(request, setData, setDataSource);
        break;
    }
  }, [cacheName, cachingStrategy, request]);

  return (
    <Context.Provider value={fetchContext}>
      {children}
    </Context.Provider>
  );
}

export default FetchContext;
