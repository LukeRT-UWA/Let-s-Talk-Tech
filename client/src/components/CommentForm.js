import React, { useState } from 'react';
import { Card, TextArea, Button, Form, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import LoginModal from "./LoginModal"
import { ADD_COMMENT } from '../utils/mutations';
import { QUERY_COMMENT } from '../utils/queries';
import Auth from '../utils/auth';

const styles = {
  cardStyle:{
    marginTop: '10px',
    padding: '20px',
    textAlign: "center",
    position: 'fixed',
    bottom: '10px',
    left: '20%',
    width: '60%'
  },
  inputStyle: {
    maxHeight: '100px',
    width:'80%',
    paddingBottom: '20px'
  },
  buttonStyle: {
    marginTop: '10px'
  }
}

const CommentForm = ({ articleId }) => {
  const [commentText, setCommentText] = useState('');

  const [createComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { createComment } }) {
      try {
        const { comments } = cache.readQuery({ 
          query: QUERY_COMMENT,
          variables: { articleId } });
        cache.writeQuery({
          query: QUERY_COMMENT,
          data: { comments: [createComment, ...comments] },
          variables: { articleId }
        });
      } catch (e) {
        console.error(e);
      }

    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createComment({
        variables: {articleId, commentText},
      });


      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText') {
        setCommentText(value)
  }}

  return (
    <div>
      <Card color='red' fluid centered style={styles.cardStyle}>
      {Auth.loggedIn() ? (
        <>
          <Form
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
            <TextArea
                name="commentText"
                placeholder="Enter comment text"
                value={commentText}
                style={styles.inputStyle}
                onChange={handleChange}
            />
            </div>

            <div className="col-12 col-lg-3">
            <Button style={styles.buttonStyle} icon="add square" content="Add Comment"/>
            </div>
            {error && (
              <Message>
                <p>{error.message}</p>
              </Message>
            )}
          </Form>
        </>
      ) : (
        <p>
          You need to be logged in to add a comment. Please <LoginModal /> to add a comment.
        </p>
      )}
      </Card>
    </div>
     );
}
export default CommentForm;
