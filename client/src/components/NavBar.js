import React from 'react'
import { Menu, Modal, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import LoginModal from "./LoginModal"


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