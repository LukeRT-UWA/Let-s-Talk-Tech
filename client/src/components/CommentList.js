import React from 'react'
import { Link, } from 'react-router-dom';
import { Card, Divider, Comment } from 'semantic-ui-react'

const styles = {
  headerStyle: {
      textAlign: 'center',
      paddingBottom: '300px'
  },
  commentStyle: {
      height: '80px'
  },
  cardStyle: {
      padding: '20px',
  },
  commentGroupStyle: {
      paddingBottom: '200px',
  } 
}



const CommentList = ({ comments }) => {
    if (comments && !comments.length) {
      return <h3>Can't find any comments!</h3>
    }
  
    return (
      <div style={styles.commentGroupStyle}>
      <Card fluid color='orange' style={styles.cardStyle}>
        <Comment.Group>
          {comments.map((comments) => (
              <Comment color='blue' key={comments._id} >
                <Comment.Avatar src='https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png' />
                  <Comment.Content>
                    <Comment.Author>{comments.commentAuthor}</Comment.Author>
                    <Comment.Text>{comments.commentText}</Comment.Text>
                  </Comment.Content>
              </Comment>
          ))}
        </Comment.Group>
      </Card>
      </div>
    )
  }
  
  export default CommentList
