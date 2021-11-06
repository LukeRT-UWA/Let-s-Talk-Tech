import React, { useState } from 'react'
import { Modal, Header, Button, Image, Grid, Form, Segment, Divider } from 'semantic-ui-react'
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

function SignupModal() {
    const [open, setOpen] = React.useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [addUser, { error, data }] = useMutation(ADD_USER);
    
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await addUser({
          variables: { username, password },
        });
  
        Auth.login(data.addUser.token);
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
        trigger={<Button content ="Sign up" icon="signup" size="big"/>}
      >
        <Segment placeholder>
    <Grid columns={2} relaxed='very'>


      <Grid.Column verticalAlign='middle'>
        <Button content ="Login" icon="user" size="big" onClick={() => setOpen(false)}/>
      </Grid.Column>

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

          <Button content='Register' primary />
        </Form>
      </Grid.Column>

    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
      </Modal>
    )
  }

export default SignupModal