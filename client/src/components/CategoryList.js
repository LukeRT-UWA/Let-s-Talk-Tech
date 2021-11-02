import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Divider } from 'semantic-ui-react'

const styles = {
    cardStyle:{
      margin: '10px',
      height: '180px'
    }
}

const CategoryList = ({ categories }) => {
  if (!categories.length) {
    <h3>Can't find any articles!</h3>
  }

  return (
    <Card.Group centered>
      {categories.map((categories) => (
        <Link to={`/articles/${categories._id}`}>
          <Card color='blue' key={categories._id} link style={styles.cardStyle}>
            <Card.Content>
              <Card.Header>{categories.name}</Card.Header>
              <Divider />
              <Card.Description>{categories.description}</Card.Description>    
            </Card.Content>
          </Card>
        </Link>  
      ))}
    </Card.Group>
  )
}

export default CategoryList