import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import LoginModal from "./LoginModal"
import { ADD_ARTICLE } from '../utils/mutations';
import { QUERY_ARTICLES_ONLY } from '../utils/queries';
import { Card, Container } from 'semantic-ui-react'
import Auth from '../utils/auth';

const styles = {
  cardStyle:{
    marginTop: '10px',
    padding: '20px',
    textAlign: "center",
    position: 'fixed',
    bottom: '10px',
    left: '25%',
    width: '50%'
  },
}

const ArticleForm = ({ categoryId }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');

  const [createArticle, { error }] = useMutation(ADD_ARTICLE, {
    update(cache, { data: { createArticle } }) {
      try {
        const { articles } = cache.readQuery({ 
          query: QUERY_ARTICLES_ONLY,
          variables: { categoryId } });
          console.log(articles)
        cache.writeQuery({
          query: QUERY_ARTICLES_ONLY,
          data: { articles: [createArticle, ...articles] },
          variables: { categoryId }
        });
      } catch (e) {
        console.error(e);
      }

    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createArticle({
        variables: {categoryId, title, link, description},
      });


      setTitle('');
      setLink('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'articleName') {
        setTitle(value)
    }
    else if (name === 'articleLink') {
        setLink(value)
    }
    else if (name === 'articleDescription') {
        setDescription(value)
  }
  };

  return (
    <div>
      <Card style={styles.cardStyle} color='red' fluid centered >

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
            <input
                name="articleName"
                placeholder="Article Title"
                value={title}
                className="form-input w-100"
                style={{ lineHeight: '1.5' }}
                onChange={handleChange}
            />
            </div>
            <div className="col-12 col-lg-9">
            <input
                name="articleLink"
                placeholder="Link to article"
                value={link}
                className="form-input w-100"
                onChange={handleChange}
            />
            
            </div>
            <div className="col-12 col-lg-9">
            <textarea
                name="articleDescription"
                placeholder="Article Description"
                value={description}
                className="form-input w-100"
                onChange={handleChange}
            />
            
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Article
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
          You need to be logged in add an article. Please <LoginModal /> to add an article.
        </p>
      )}
      </Card>
    </div>
  );
};

export default ArticleForm;
