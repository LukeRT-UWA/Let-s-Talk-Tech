import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ARTICLE } from '../utils/mutations';
import { QUERY_ARTICLES } from '../utils/queries';
import { QUERY_ARTICLES_ONLY } from '../utils/queries';

// import Auth from '../../utils/auth';

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

        cache.writeQuery({
          query: QUERY_ARTICLES_ONLY,
          data: { articles: [createArticle, ...articles] },
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
      <h3>Want to add an article?</h3>

      {/* {Auth.loggedIn()  */}
      {(true) ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
            <textarea
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
            <input
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
          You need to be logged in add an article. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ArticleForm;
