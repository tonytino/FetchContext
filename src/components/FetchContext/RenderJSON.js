import React from 'react';
import { useFetchContext } from './Context';
import './RenderJSON.css';

const cachingStrategyDescriptions = {
  'cacheFallbackNetwork': (
    <p>
      Post-paint, the component will load data found in the cache.
      <br></br>
      <br></br>
      If no data is found in the cache, data will be fetched from the network
      and cached.
    </p>
  ),
  'cacheThenNetwork': (
    <p>
      Post-paint, the component will load data found in the cache, while also
      simultaneously fetching data from the network.
      <br></br>
      <br></br>
      If the cache is returned before the network, that will be loaded first.
      <br></br>
      <br></br>
      If no data is found in the cache, data will be fetched from the network
      and cached.
      <br></br>
      <br></br>
      Once the network responds, it will be loaded and will not be replaced.
    </p>
  ),
  'network': (
    <p>
      Post-paint, the component will load data from the network. No caching.
    </p>
  ),
  'networkFallbackCache': (
    <p>
      Post-paint, the component will load data from the network and cache it.
      <br></br>
      <br></br>
      If the network request fails, data will be loaded from the cache.
    </p>
  )
}

/**
 * @description Renders JSON received via context from
 *  FetchContext (along with endpoint)
 */
function RenderJSON() {
  const {
    cachingStrategy = 'network',
    data,
    dataSource,
    request,
  } = useFetchContext();
  const cacheStatusColorMap = {
    'cache': 'salmon',
    'default': 'slategray',
    'network': 'teal',
  }
  const endpoint = typeof request === 'string' ? request : request.url;
  return (
    <div className='RenderJSON'>
      <h3>
        {cachingStrategy}
      </h3>

      {cachingStrategyDescriptions[cachingStrategy]}

      <pre
        style={{ borderColor: cacheStatusColorMap[dataSource] }}
      >
        <code>
          GET {endpoint.split('com')[1]}
          <br></br>
          {JSON.stringify(data, undefined, 4)}
        </code>
      </pre>
    </div>
  );
}

export default RenderJSON;
