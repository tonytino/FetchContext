import React from 'react';
import { useFetchContext } from './Context';
import './RenderJSON.css';

/**
 * @description Renders JSON received via context from
 *  FetchContext (along with endpoint)
 */
function RenderJSON() {
  const {
    data,
    endpoint,
  } = useFetchContext();
  return (
    <div className='RenderJSON'>
      <h3>
        GET {endpoint}
      </h3>

      <pre>
        <code>
          {JSON.stringify(data, undefined, 4)}
        </code>
      </pre>
    </div>
  );
}

export default RenderJSON;
