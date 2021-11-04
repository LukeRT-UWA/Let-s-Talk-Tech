import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import CommentList from "../components/CommentList"


import { QUERY_ARTICLE } from '../utils/queries';
import { Card } from 'semantic-ui-react';

const styles = {
    headerStyle: {
        textAlign: 'center'
    },
    commentStyle: {
        height: '80px'
    },
    cardStyle: {
        padding: '20px',
        marginBottom: '40px'
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
            <h1 style={styles.headerStyle}>{article.title}</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
            <div>
                <div>
                    <Card.Group>
                        <Card color='blue' style={styles.cardStyle} fluid>
                            <h2>{article.link}</h2>
                            <h3>{article.description}</h3>
                        </Card>
                    </Card.Group>
                </div>
                <div>
                    <CommentList comments={article.comments}/>
                </div>
            </div>
        )}
      </div>
    );
  };
  
  export default SingleArticle;
