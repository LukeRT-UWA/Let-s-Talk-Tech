import React from 'react';
import { useQuery } from '@apollo/client';
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import { QUERY_CATEGORIES } from '../utils/queries';
import { Loader, Container } from 'semantic-ui-react'

const styles = {
    headerStyle: {
        textAlign: 'center'
    },
    containerStyle: {
      backgroundColor: 'red'
    }
}

const Home = () => {
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];
  
    return (
        <div>
        <Container style={styles.containerStyle}>
            <h1 style={styles.headerStyle}>Categories List</h1>
        {loading ? (
          <Loader active inline='centered' />
        ) : (
          <CategoryList
            categories={categories}
          />
        )}     
          <CategoryForm />
      </Container>
      </div>
    );
  };
  //
  export default Home;