import React from "react";
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import "./SideMenu.css";
import { logout } from '../../store/session';
import NotebooksDropdown from "./NotebooksDropdown";

const SideMenu = ({ user }) => {
    const history = useHistory();

    // Log out function:
    const dispatch = useDispatch()
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    if (!user) return <Redirect to='/authenticate' />;

    return (
        <div id="sidemenu-wrapper">

            <div id="sidemenu-top-items">
            <div id="profile-wrapper">
                <div id="sidemenu-username-container">{user.username}</div>
                <div id="profile-options-wrapper">
                    {/* <i className="fa-solid fa-gear clickable"></i> */}
                    <i onClick={onLogout} className="fa-solid fa-right-from-bracket clickable button-sink" title="Log out"></i>
                </div>
            </div>

            <div id="nav-wrapper">
                <div onClick={() => history.push("/dashboard")} className="clickable hover-lgrey" id="home-button">
                    <i className="fa-solid fa-house"></i>
                    <div>Home</div>
                </div>
                <NotebooksDropdown />
            </div>
            </div>

            <div id="contact-links-wrapper">
                <a href="https://github.com/myaswen" target="_blank" rel="noopener noreferrer" className="hover-lgrey">
                    <i className="fa-brands fa-square-github"></i>
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/max-yaswen-6b4132184/" target="_blank" rel="noopener noreferrer" className="hover-lgrey">
                    <i className="fa-brands fa-linkedin"></i>
                    LinkedIn
                </a>
            </div>

        </div>
    )
}

export default SideMenu;
