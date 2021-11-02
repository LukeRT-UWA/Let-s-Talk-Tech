import React from 'react';
import { useQuery } from '@apollo/client';
import CategoryList from "../components/CategoryList"

import { QUERY_CATEGORIES } from '../utils/queries';

const styles = {
    headerStyle: {
        textAlign: 'center'
    }
}

const Home = () => {
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];
  
    return (
        
        <div>
            <h1 style={styles.headerStyle}>Categories List</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <CategoryList
            categories={categories}
          />
        )}
      </div>
    );
  };
  
  export default Home;