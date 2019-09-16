import React from 'react';
import Context from './Context';

/**
 * @description Performs GET for endpoint provided after page paint, then it
 *  makes the response available via context.
 *
 *  https://reactjs.org/docs/hooks-reference.html#timing-of-effects
 *
 * @param defaultData - The initial data to load (i.e. before API response)
 * @param endpoint - The URL to fetch (GET endpoint)
 */
function FetchContext(props) {
  const {
    children = null,
    defaultData = [],
    endpoint = 'https://jsonplaceholder.typicode.com/todos',
  } = props;

  const [data, setData] = React.useState(defaultData);

  const fetchContext = {
    data,
    defaultData,
    endpoint,
  };

  React.useEffect(() => {
    async function performFetch(endpoint) {
      await fetch(endpoint)
        .then(response => response.json())
        .then(json => setData(json));
    }

    performFetch(endpoint)
  }, [endpoint]);

  return (
    <Context.Provider value={fetchContext}>
      {children}
    </Context.Provider>
  )
}

export default FetchContext;
