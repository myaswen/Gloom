import React from "react";
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogoutButton from "../LogoutButton";

const Dashboard = () => {
    const user = useSelector(state => state.session.user);



    if (!user) return <Redirect to='/authenticate' />;

    return (
        <div>
            Hello from dashboard!
            <LogoutButton />
        </div>
    )
}

export default Dashboard;
