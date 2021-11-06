import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import LoginModal from "./LoginModal"
import Auth from '../utils/auth';

const NavBar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
      <Menu>
        <Menu.Item name='home'>
            <Link to="/">
            <h1 >Let's Talk Tech</h1>
            </Link>
        </Menu.Item>
        {Auth.loggedIn() ? (
        <Menu.Item>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
            </button>
        </Menu.Item>) :
        (<Menu.Item>
            <LoginModal />
        </Menu.Item>)}
      </Menu>
    )
}

export default NavBar