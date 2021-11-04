import React from 'react'
import { Modal, Header, Button, Image, Grid, Form, Segment, Divider } from 'semantic-ui-react'
import LoginModal from "./LoginModal"

function SignupModal() {
    const [open, setOpen] = React.useState(false)
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button content ="Sign up" icon="signup" size="big"/>}
      >
        <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>


      <Grid.Column verticalAlign='middle'>
        <Button content ="Login" icon="user" size="big" onClick={() => setOpen(false)}/>
      </Grid.Column>

      <Grid.Column>
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
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