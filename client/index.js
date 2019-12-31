import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, HashRouter, Redirect } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { App } from './components/App';
import { SongsList } from './components/SongsList';
import { CreateSong } from './components/CreateSong';
import { SongDetail } from './components/SongDetail';

const link = new HttpLink('http://localhost:4000/');
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Route path="/">
          <App>
            <Redirect exact={true} path="/" to="/songs" />

            <Route exact={true} path="/songs">
              <SongsList />
            </Route>

            <Route path="/new-song">
              <CreateSong />
            </Route>

            <Route path="/songs/:id">
              <SongDetail />
            </Route>
          </App>
        </Route>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
