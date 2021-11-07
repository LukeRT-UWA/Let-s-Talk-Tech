import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import LoginModal from "./LoginModal"
import { Button } from 'semantic-ui-react'
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
      <Menu style={styles.menuStyle}>
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
      </Menu>
    )
}

export default NavBar