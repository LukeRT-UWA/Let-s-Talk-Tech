import React from 'react'
import { Menu, Modal, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function LoginModal() {
    const [open, setOpen] = React.useState(false)
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Login/Signup</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }

const NavBar = () => {
    return (
      <Menu>
        <Menu.Item name='home'>
            <Link to="/">
            <h1 >Let's Talk Tech</h1>
            </Link>
        </Menu.Item>
        <Menu.Item name='home'>
            <LoginModal />
        </Menu.Item>
      </Menu>
    )
}

export default NavBar