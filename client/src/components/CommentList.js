import React from 'react'
import { Link, } from 'react-router-dom';
import { Card, Divider, Comment } from 'semantic-ui-react'

const styles = {
  headerStyle: {
      textAlign: 'center'
  },
  commentStyle: {
      height: '80px'
  }
}


const CommentList = ({ comments }) => {
    if (!comments.length) {
      return <h3>Can't find any comments!</h3>
    }
  
    return (
      <Comment.Group>
        {comments.map((comments) => (
            <Comment color='blue' key={comments._id}>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Author> User </Comment.Author>
              
              <Comment.Text>Comment Text: {comments.commentText}</Comment.Text>
              
            </Comment>
            
        ))}
      </Comment.Group>
    )
  }
  
  export default CommentList