import React from 'react';
import { useQuery } from '@apollo/client';
import { CategoryList } from "../components/CategoryList"

import { QUERY_CATEGORIES } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];
  
    return (
        <div className="col-12 col-md-10 my-3">
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