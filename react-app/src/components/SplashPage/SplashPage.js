import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginCard from './LoginCard';
import SignUpCard from './SignUpCard';
import "./SplashPage.css"


const SplashPage = () => {
    const user = useSelector(state => state.session.user);
    const [showSignUp, setShowSignUp] = useState(false);

    if (user) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div id='splash-page-wrapper'>
            <div id="splash-info-wrapper">
                <p>Placeholder for splash page info</p>
            </div>
            {!showSignUp && <LoginCard setShowSignUp={setShowSignUp} />}
            {showSignUp && <SignUpCard setShowSignUp={setShowSignUp} />}
        </div>
    );
};

export default SplashPage;
