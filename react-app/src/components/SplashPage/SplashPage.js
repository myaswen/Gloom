import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginCard from './LoginCard';
import "./SplashPage.css"


const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <div id='splash-page-wrapper'>
            <div id="splash-info-wrapper">
                <p>Placeholder for splash page info</p>
            </div>
            <LoginCard />
        </div>
    );
};

export default SplashPage;
