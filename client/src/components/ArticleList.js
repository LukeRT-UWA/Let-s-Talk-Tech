import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Divider } from 'semantic-ui-react'

const styles = {
    cardStyle:{
      margin: '10px',
      height: '120px',
      width: '800px'
    }
}

const ArticleList = ({ articles }) => {
    if (articles && !articles.length) {
      return <h3>Can't find any articles!</h3>
    }
  
    return (
      <Card.Group centered itemsPerRow={1} >
        {articles.map((articles) => (
          <Link to={`/article/${articles._id}`}>
            <Card color='blue' key={articles._id} link style={styles.cardStyle}>
              <Card.Content>
                <Card.Header>{articles.title}</Card.Header>
                <Divider />
                <Card.Description>{articles.description}</Card.Description>    
              </Card.Content>
            </Card>
          </Link>  
        ))}
      </Card.Group>
    )
  }
  
  export default ArticleList