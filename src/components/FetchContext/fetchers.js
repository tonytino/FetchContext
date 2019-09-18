/**
 *
 * Functions are used to fetch responses for the requests supplied, with various
 * caching strategies employed.
 *
 * @example
 * ```
 * fetchCacheFallbackNetworkResponse(
 *  'https://jsonplaceholder.typicode.com/todos',
 *  'todosAppCache',
 *  setData,
 *  setDataSource,
 * )
 * // Using a
 * fetchCacheFallbackNetworkResponse(
 *  new Request('https://jsonplaceholder.typicode.com/todos'),
 *  'todosAppCache',
 *  setData,
 *  setDataSource,
 * )
 * ```
 */




/**
 * Checks the cacheName specified for the request provided, and returns such.
 *
 * If it fails to find the request in the cache, a network request is made,
 * cached, and served.
 *
 * @param {(string|Request)} request - URL string or Request object
 * @param {string} cacheName - name of cache to capture requests in
 * @param {function} setData - capture json data, e.g. setData(json)
 * @param {function} setDataSource - captures data source, e.g. setDataSource('cache')
 * @returns {null}
 */
function fetchCacheFallbackNetworkResponse(
  request,
  cacheName,
  setData,
  setDataSource
) {
  let dataSource = 'cache';

  fetchCacheResponse(cacheName, request)
    .then(cachedResponse => {
      let response = cachedResponse;
      // If it's not in the cache, make a network request
      if (!cachedResponse) {
        dataSource = 'network';
        console.log(`Failed to find cache for ${request}. Trying network...`);
        response = fetch(request);
      }

      return response;
    })
    .then(response => {
      if (dataSource === 'network') {
        cacheResponse(cacheName, request, response.clone());
      }

      return response.json();
    })
    .then(json => {
      setData(json);
      setDataSource(dataSource);
    });
}

/**
 * Checks the cacheName specified for the request provided, while simultaneously
 * making a network request.
 *
 * If the request exists in the cache, that's returned first.
 *
 * Then, if the network responds, we cache that and return it (meaning the data-
 * consuming component will first receive cache data, then fresh network data).
 *
 * @param {(string|Request)} request - URL string or Request object
 * @param {string} cacheName - name of cache to capture requests in
 * @param {function} setData - capture json data, e.g. setData(json)
 * @param {function} setDataSource - captures data source, e.g. setDataSource('cache')
 * @returns {null}
 */
function fetchCacheThenNetworkResponse(
  request,
  cacheName,
  setData,
  setDataSource
) {
  let networkDataReceived = false;

  // This will process while we attempt to fetch from the cache
  const networkUpdate = fetch(request)
    .then(response => {
      if (response.ok) cacheResponse(cacheName, request, response.clone());

      return response.json();
    })
    .then(json => {
      networkDataReceived = true;
      setData(json);
      setDataSource('network');
    })
    .catch(error => {
      console.warn(`Failed to fetch ${request} from the network.`, error);
    });


  fetchCacheResponse(cacheName, request)
    .then(response => response.json())
    .then(json => {
      // If networkUpdate has not completed yet, use the cached response
      // Otherwise, the cache may be stale and we should use network response
      if (!networkDataReceived) {
        setData(json);
        setDataSource('cache');
      }
    })
    // Try the network once more if we didn't find it in the cache
    .catch(() => networkUpdate);
}

/**
 * A network request is made, cached, and returned.
 *
 * If the network fails to respond, check the cacheName specified for the
 * request provided, and return such.
 *
 * @param {(string|Request)} request - URL string or Request object
 * @param {string} cacheName - name of cache to capture requests in
 * @param {function} setData - capture json data, e.g. setData(json)
 * @param {function} setDataSource - captures data source, e.g. setDataSource('cache')
 * @returns {null}
 */
function fetchNetworkFallbackCacheResponse(
  request,
  cacheName,
  setData,
  setDataSource
) {
  fetch(request)
    .then(response => {
      if (response.ok) cacheResponse(cacheName, request, response.clone());

      return response.json();
    })
    .then(json => {
      setData(json);
      setDataSource('network');
    })
    .catch(error => {
      console.warn(
        `Failed to fetch ${request} from the network. `+
        `Attempting to read from cache: ${cacheName}.`,
        error
      );
      fetchCacheResponse(cacheName, request)
        .then(response => response.json())
        .then(json => {
          setData(json);
          setDataSource('cache');
        })
        .catch(error => {
          console.warn(
            `Failed to fetch ${request} from the cache (and network)...`,
            error
          );
        });
    });
}

/**
 * A network request is made using `fetch`. No caching utilized.
 *
 * @param {(string|Request)} request - URL string or Request object
 * @param {function} setData - capture json data, e.g. setData(json)
 * @param {function} setDataSource - captures data source, e.g. setDataSource('cache')
 * @returns {null}
 */
function fetchNetworkResponse(request, setData, setDataSource) {
  fetch(request)
    .then(response => response.json())
    .then(json => {
      setData(json);
      setDataSource('network');
    })
    .catch(error => {
      console.warn(
        `Failed to fetch ${request} from the network. Not checking cache.`,
        error
      );
    });
}

/**
 *
 *            DO NOT EXPORT - PRIVATE FUNCTIONS – DO NOT EXPORT
 *
 */

/**
 * Fetch a cache entry using the provided cacheName and request.
 *
 * @param {string} cacheName - name of cache to capture requests in
 * @param {(string|Request)} request - URL string or Request object
 * @returns {Response} - Response object in the cache for the Request provided
 */
function fetchCacheResponse(cacheName, request) {
  // TODOAH – Handle case where `caches` is undefined
  return caches
    .open(cacheName)
    .then(cache => cache.match(request).then(cachedResponse => cachedResponse))
    .catch(error => {
      console.log(`Failed to fetch ${request} from cache: ${cacheName}.`);
    });
}

/**
 * Create a cache entry using the provided cacheName, request, & response clone.
 *
 * @param {string} cacheName - name of cache to capture requests in
 * @param {(string|Request)} request - URL string or Request object
 * @param {function} responseClone - response.clone() value
 * @returns {null}
 */
function cacheResponse(cacheName, request, responseClone) {
  // TODOAH – Handle case where `caches` is undefined
  console.info(`Creating cache entry for ${request} in cache: ${cacheName}.`);
  caches
    .open(cacheName)
    .then(cache => cache.put(request, responseClone))
    .catch(error => {
      console.warn(
        `Failed to create cache entry for ${request} in cache: ${cacheName}.`,
        error
      );
    });
}

export {
  fetchCacheFallbackNetworkResponse,
  fetchCacheThenNetworkResponse,
  fetchNetworkFallbackCacheResponse,
  fetchNetworkResponse,
};
