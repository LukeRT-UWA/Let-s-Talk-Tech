import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import SingleArticle from './pages/SingleArticle';
import NavBar from "./components/NavBar"
import About from "./pages/About"
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

  function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar/>
          <div>
            <Route exact path="/">
                  <Home />
            </Route>
            <Route exact path="/articles/:categoryId">
                  <Articles />
            </Route>
            <Route exact path="/article/:articleId">
                  <SingleArticle />
            </Route>
            <Route exact path="/about">
                  <About />
            </Route>
          </div>
      </Router>
    </ApolloProvider>
  );
}
//
export default App;
