import React, { useState } from 'react'
import { Modal, Button, Grid, Form, Segment, Divider, Message } from 'semantic-ui-react'
import SignupModal from "./SignupModal"
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

function LoginModal() {
    const [open, setOpen] = React.useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [login, { error, data }] = useMutation(LOGIN_USER);
    
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await login({
          variables: { username, password },
        });
  
        Auth.login(data.login.token);
        setOpen(false);
      } catch (e) {
        console.error(e);
      }
    };
    
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === 'username') {
          setUsername(value)
      }
      else if (name === 'password') {
          setPassword(value)
      }
    };

    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button content ="Login" icon="user" size="medium" />}
      >
        <Segment placeholder>
    <Grid columns={2} relaxed='very'>
      <Grid.Column>
        <Form onSubmit={handleFormSubmit}>
          <Form.Input
            name='username'
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
            value={username}
            onChange={handleChange}
          />
          <Form.Input
            name='password'
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            value={password}
            onChange={handleChange}
          />

          <Button content='Login' primary />
          {error && (
              <Message>
                {error.message}
              </Message>
            )}
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <SignupModal />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
      </Modal>
    )
  }

export default LoginModal