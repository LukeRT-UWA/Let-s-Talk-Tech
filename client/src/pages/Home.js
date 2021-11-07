import React from 'react';
import { useQuery } from '@apollo/client';
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import { QUERY_CATEGORIES } from '../utils/queries';
import { Loader, Container } from 'semantic-ui-react'
import '../background.css';
const styles = {
    headerStyle: {
        textAlign: 'center',
        paddingTop: '30px',
        paddingBottom: '20px'
    },
    containerStyle: {
      minHeight: '100vh'
    }
}

const Home = () => {
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];
  
    return (
        <div className='background'>
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