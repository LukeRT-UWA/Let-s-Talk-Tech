import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import ArticleList from "../components/ArticleList"

import { QUERY_ARTICLES } from '../utils/queries';

const styles = {
    headerStyle: {
        textAlign: 'center'
    }
}

const Articles = () => {
    
    const { categoryId } = useParams()
    
    const { loading, data } = useQuery(QUERY_ARTICLES, {
        variables: { categoryId: categoryId}
    });
    
    
    
    const articles = data?.articles || [];
  
    return (
        
        <div>
            <h1 style={styles.headerStyle}>Articles List</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ArticleList
            articles={articles}
          />
        )}
      </div>
    );
  };
  //
  export default Articles;