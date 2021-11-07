import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Loader, Container } from 'semantic-ui-react'
import ArticleList from "../components/ArticleList"
import ArticleForm from "../components/ArticleForm"
import { QUERY_ARTICLES } from '../utils/queries';
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

const Articles = () => {
    
    const { categoryId } = useParams()
    
    const { loading, data } = useQuery(QUERY_ARTICLES, {
        variables: { categoryId: categoryId}
    });
    
    
    
    const articles = data?.articles || [];
  
    return (
        
      <div className='background'>
      <Container style={styles.containerStyle}>  
            <h1 style={styles.headerStyle}>Articles List</h1>
        {loading ? (
          <Loader active inline='centered' />
        ) : (
          <ArticleList articles={articles} />
        )}
      <ArticleForm categoryId={categoryId}/>
      </Container>
      </div>
    );
}

  export default Articles;
