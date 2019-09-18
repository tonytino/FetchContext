import React from 'react';
import FetchContext from './components/FetchContext/FetchContext';
import RenderJSON from './components/FetchContext/RenderJSON';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='BorderColorKey'>
        <span className='default'>
          default
        </span>
        <span className='cache'>
          cache
        </span>
        <span className='network'>
          network
        </span>
      </div>

      <div className='Content'>
        <FetchContext
          cachingStrategy='cacheThenNetwork'
          request='https://jsonplaceholder.typicode.com/todos'
        >
          <RenderJSON />

          <FetchContext
            cachingStrategy='cacheFallbackNetwork'
            request='https://jsonplaceholder.typicode.com/todos/1'
          >
            <RenderJSON />
          </FetchContext>

          <FetchContext
            cachingStrategy='networkFallbackCache'
            request='https://jsonplaceholder.typicode.com/posts/1'
          >
            <RenderJSON />
          </FetchContext>

          <FetchContext
            request='https://jsonplaceholder.typicode.com/posts/1'
          >
            <RenderJSON />
          </FetchContext>
        </FetchContext>
      </div>
    </div>
  );
}

export default App;
