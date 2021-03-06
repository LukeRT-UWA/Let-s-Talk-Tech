import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import LoginModal from "./LoginModal"
import Auth from '../utils/auth';
const styles = {
    menuStyle: {
        marginBottom: '0px',
        
    }
}
const NavBar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
      <Menu stackable style={styles.menuStyle}>
        <Menu.Item name='home'>
            <Link to="/">
            <h1 >Let's Talk Tech</h1>
            </Link>
        </Menu.Item>
        {Auth.loggedIn() ? (
        <Menu.Item>
            <Button content="Logout" icon="log out" onClick={logout}/>
        </Menu.Item>) :
        (<Menu.Item>
            <LoginModal />
        </Menu.Item>)}
        <Menu.Item right name='about'>
            <Link to="/about">
            <h1 >About</h1>
            </Link>
        </Menu.Item>
      </Menu>
    )
}

export default NavBar
