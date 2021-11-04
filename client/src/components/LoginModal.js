import React from 'react'
import { Modal, Header, Button, Image, Grid, Form, Segment, Divider } from 'semantic-ui-react'
import SignupModal from "./SignupModal"
function LoginModal() {
    const [open, setOpen] = React.useState(false)
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button content ="Login" icon="user" size="big" />}
      >
        <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
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

          <Button content='Login' primary />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        {/* <Button content='Sign up' icon='signup' size='big' /> */}
        <SignupModal />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
      </Modal>
    )
  }

export default LoginModal