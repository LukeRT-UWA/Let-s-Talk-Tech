import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react'
import ArticleList from "../components/ArticleList"
import ArticleForm from "../components/ArticleForm"
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
          <Loader active inline='centered' />
        ) : (
          <ArticleList
            articles={articles}
          />
        )}

<ArticleForm categoryId={categoryId}/>

      </div>
    );
}

  export default Articles;
