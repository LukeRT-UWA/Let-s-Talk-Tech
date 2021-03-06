import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import CommentList from "../components/CommentList"
import CommentForm from "../components/CommentForm"
import { Loader } from 'semantic-ui-react'
import { QUERY_ARTICLE } from '../utils/queries';
import { Card, Container } from 'semantic-ui-react';
import '../background.css';
const styles = {
    headerStyle: {
        textAlign: 'center',
        paddingTop: '30px',
        paddingBottom: '20px',
        color: 'white'
    },
    commentStyle: {
        height: '80px'
    },
    cardStyle: {
        padding: '20px',
        marginBottom: '40px'
    },
    containerStyle: {
        minHeight: '100vh'
      }
}

const SingleArticle = () => {
    
    const { articleId } = useParams()
    
    const { loading, data } = useQuery(QUERY_ARTICLE, {
        variables: { articleId: articleId}
    });
    
    
    
    const article = data?.article || [];
  
    return (
        
        <div className='background'>
            <Container style={styles.containerStyle}>
            <h1 style={styles.headerStyle}>{article.title}</h1>
        {loading ? (
          <Loader active inline='centered' />
        ) : (
            <div>
                <div>
                    <Card.Group>
                        <Card color='blue' style={styles.cardStyle} fluid>
                            <a href={article.link}><h2>Link to article</h2></a>
                            <h3>{article.description}</h3>
                        </Card>
                    </Card.Group>
                </div>
                <div>
                    <CommentList comments={article.comments}/>
                </div>
            </div>
        )}


        <CommentForm articleId={articleId}/>
        </Container>
      </div>
    );
  };
  
  export default SingleArticle;
