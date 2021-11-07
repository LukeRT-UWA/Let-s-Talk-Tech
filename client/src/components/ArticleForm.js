import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import LoginModal from "./LoginModal"
import { ADD_ARTICLE } from '../utils/mutations';
import { QUERY_ARTICLES_ONLY } from '../utils/queries';
import { Card, Input, TextArea, Form, Button} from 'semantic-ui-react'
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
  },
  buttonStyle: {
    margin: '20px'
  }
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
          <Form
            
            onSubmit={handleFormSubmit}
          >
            <div>
            <Input
                name="articleName"
                placeholder="Article Title"
                value={title}
                style={styles.inputStyle}
                onChange={handleChange}
            />
            </div>
            <div>
            <Input
                name="articleLink"
                placeholder="Link to article"
                value={link}
                style={styles.inputStyle}
                onChange={handleChange}
            />
            
            </div>
            <div>
            <TextArea
                name="articleDescription"
                placeholder="Article Description"
                value={description}
                style={styles.inputStyle}
                onChange={handleChange}
            />
            
            </div>

            <div>
            <Button style={styles.buttonStyle}>Add Article</Button>
            </div>
            {error && (
              <div>
                {error.message}
              </div>
            )}
          </Form>
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
