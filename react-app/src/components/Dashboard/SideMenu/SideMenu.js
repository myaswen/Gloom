import React from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import "./SideMenu.css";
import NotebooksDropdown from "./NotebooksDropdown";

const SideMenu = ({ user }) => {

    // Log out function:
    const dispatch = useDispatch()
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <div id="sidemenu-wrapper">
            <div id="profile-wrapper">
                <div>{user.username}</div>
                <div id="profile-options-wrapper">
                    <i className="fa-solid fa-gear"></i>
                    <i onClick={onLogout} className="fa-solid fa-right-from-bracket"></i>
                </div>
            </div>
            <div id="nav-wrapper">
                <div>Home</div>
                <div>Tasks</div>
                <NotebooksDropdown />
                <div>Tags</div>
            </div>
        </div>
    )
}

export default SideMenu;
