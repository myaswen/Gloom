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

            <div id="profile-wrapper">
                <div>{user.username}</div>
                <div id="profile-options-wrapper">
                    {/* <i className="fa-solid fa-gear clickable"></i> */}
                    <i onClick={onLogout} className="fa-solid fa-right-from-bracket clickable"></i>
                </div>
            </div>

            <div id="nav-wrapper">
                <div onClick={() => history.push("/dashboard")} className="clickable">Home</div>
                <NotebooksDropdown />
            </div>

        </div>
    )
}

export default SideMenu;
