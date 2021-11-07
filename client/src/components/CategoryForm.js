import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import LoginModal from "./LoginModal"
import { CREATE_CATEGORY } from '../utils/mutations';
import { QUERY_CATEGORIES } from '../utils/queries';
import { Card, Form, Button, Input, TextArea } from 'semantic-ui-react'

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
  inputStyle: {
    maxHeight: '100px',
    width:'80%',
    paddingBottom: '20px'
  }
}

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [createCategory, { error }] = useMutation(CREATE_CATEGORY, {
    update(cache, { data: { createCategory } }) {
      try {
        const { categories } = cache.readQuery({ query: QUERY_CATEGORIES });

        cache.writeQuery({
          query: QUERY_CATEGORIES,
          data: { categories: [createCategory, ...categories] },
        });
      } catch (e) {
        console.error(e);
      }

    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createCategory({
        variables: {name, description},
      });


      setName('');
      setDescription('')
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'categoryName') {
        setName(value)
    }
    else if (name === 'categoryDescription') {
        setDescription(value)
    }
  };

  return (
    <div>
      <Card color='red' fluid centered style={styles.cardStyle}>
      
      {Auth.loggedIn() ? (
        <>
          <Form
            onSubmit={handleFormSubmit}
          >
            <div className="col-12">
            <Input style={styles.inputStyle}
                name="categoryName"
                placeholder="Category Name"
                value={name}
                onChange={handleChange}
            />
            </div>
            <div className="col-12 col-lg-9">
            <TextArea style={styles.inputStyle}
                name="categoryDescription"
                placeholder="Category Description"
                value={description}
                className="form-input w-100"
                onChange={handleChange}
            />
            
            </div>

            <div className="col-12 col-lg-3">
            <Button>Click Here</Button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </Form>
        </>
      ) : (
        
        <p>
          You need to be logged in to add a category. Please <LoginModal /> to add a category.
        </p>
        
      )}
      </Card>
    </div>
  );
};

export default CategoryForm;
