import React, { useState } from 'react';
import { Card } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import LoginModal from "./LoginModal"
import { ADD_COMMENT } from '../utils/mutations';
import { QUERY_COMMENT } from '../utils/queries';
import Auth from '../utils/auth';

const styles = {
  cardStyle:{
    marginTop: '10px',
    padding: '20px',
    textAlign: "center"
   
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
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
            <textarea
                name="commentText"
                placeholder="Enter comment text"
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5' }}
                onChange={handleChange}
            />
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
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
