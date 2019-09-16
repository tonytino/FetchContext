import React from 'react';
import FetchContext from './components/FetchContext/FetchContext';
import RenderJSON from './components/FetchContext/RenderJSON';

function App() {
  return (
    <div className='App'>
      <FetchContext
        endpoint='https://jsonplaceholder.typicode.com/todos'
      >
        <RenderJSON />

        <FetchContext
          endpoint='https://jsonplaceholder.typicode.com/todos/1'
        >
          <RenderJSON />
        </FetchContext>

        <FetchContext
          endpoint='https://jsonplaceholder.typicode.com/posts/1'
        >
          <RenderJSON />
        </FetchContext>
      </FetchContext>
    </div>
  );
}

export default App;
