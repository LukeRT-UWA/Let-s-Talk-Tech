import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <Menu>
        <Menu.Item
          name='home'
        
        >
            <Link to="/">
            <h1 >Tech Thoughts</h1>
            </Link>
        </Menu.Item>

        <Menu.Item
          name='login/signup'
          
        >
          Login/Signup
        </Menu.Item>

      </Menu>
    )
}

export default NavBar