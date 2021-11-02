import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { QUERY_ARTICLE } from '../utils/queries';

const styles = {
    headerStyle: {
        textAlign: 'center'
    }
}

const SingleArticle = () => {
    
    const { articleId } = useParams()
    
    const { loading, data } = useQuery(QUERY_ARTICLE, {
        variables: { articleId: articleId}
    });
    
    
    
    const article = data?.article || [];
  
    return (
        
        <div>
            <h1 style={styles.headerStyle}>Single Article</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
            <div>
                <h1>{article.title}</h1>
                <h2>{article.link}</h2>
            </div>
        )}
      </div>
    );
  };
  
  export default SingleArticle;