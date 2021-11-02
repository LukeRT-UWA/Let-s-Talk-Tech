import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import SingleArticle from './pages/SingleArticle';
import NavBar from "./components/NavBar"

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
          <div className="container">
            <Route exact path="/">
                  <Home />
            </Route>
            <Route exact path="/articles/:categoryId">
                  <Articles />
            </Route>
            <Route exact path="/article/:articleId">
                  <SingleArticle />
            </Route>
          </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
