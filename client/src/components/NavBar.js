import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <Menu>
        <Menu.Item name='home'>
            <Link to="/">
            <h1 >Let's Talk Tech</h1>
            </Link>
        </Menu.Item>
        <Menu.Item name='login/signup'>
          <h1>Login/Signup</h1>
        </Menu.Item>
      </Menu>
    )
}

export default NavBar