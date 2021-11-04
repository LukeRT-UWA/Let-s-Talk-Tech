import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CATEGORY } from '../utils/mutations';
import { QUERY_CATEGORIES } from '../utils/queries';

// import Auth from '../../utils/auth';

const CategoryForm = () => {
  const [formState, setFormState] = useState({
      name: '',
      description:''
  });

  const [addCategory, { error }] = useMutation(ADD_CATEGORY, {
    update(cache, { data: { addCategory } }) {
      try {
        const { categories } = cache.readQuery({ query: QUERY_CATEGORIES });

        cache.writeQuery({
          query: QUERY_CATEGORIES,
          data: { categories: [addCategory, ...categories] },
        });
      } catch (e) {
        console.error(e);
      }

    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCategory({
        variables: {...formState},
      });

      setFormState({
        name: '',
        description:''
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'categoryText') {
      setFormState(value);
    }
  };

  return (
    <div>
      <h3>Want to add a category?</h3>

      {/* {Auth.loggedIn()  */}
      {(true) ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="categoryText"
                placeholder="Category Description"
                // value={description}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Category
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
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CategoryForm;
