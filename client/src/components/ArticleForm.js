import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import LoginModal from "./LoginModal"
import { ADD_ARTICLE } from '../utils/mutations';
import { QUERY_ARTICLES_ONLY } from '../utils/queries';
import { Card, Input, TextArea, Form, Button, Message, Grid} from 'semantic-ui-react'
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
    width:'100%',
    paddingBottom: '10px'
  },
  buttonStyle: {
    marginTop: '10px'
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
            <Grid celled='internally' columns={2} relaxed='very'>
            <Grid.Column>
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
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
            <div>
            <Button style={styles.buttonStyle} icon="add square" content="Add Article"/>
            </div>
            {error && (
              <Message>
                <p>{error.message}</p>
              </Message>
            )}

            </Grid.Column>
          </Grid>
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
