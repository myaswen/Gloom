import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginCard.css";


const LoginCard = ({ setShowSignUp }) => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            history.push("/dashboard");
        }
    };

    const handleDemoLogin = async () => {
        const data = await dispatch(login("demo@aa.io", "password"));
        if (data) {
            setErrors(data);
        } else {
            history.push("/dashboard");
        }
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div id="login-form-wrapper">
            <div id='login-logo-container'>
                <i className="fa-solid fa-cloud-moon" id='login-logo-icon'></i>
                <div id='login-logo-name'>Gloom</div>
            </div>
            <form onSubmit={onLogin}>
                <div className='login-form-input-container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        name='email'
                        type='text'
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div className='login-form-input-container'>
                    <label htmlFor='password'>Password</label>
                    <input
                        name='password'
                        type='password'
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                {Object.keys(errors).length > 0 && (
                    <div className='login-error'>Authentication Failed</div>
                )}
                <button type='submit' id='login-button' className='clickable'>Log In</button>
            </form>
            <button onClick={handleDemoLogin} id='demo-login-button' className='clickable'>Log In Demo</button>
            <p>Don't have an account?</p>
            <div onClick={() => setShowSignUp(true)} className="clickable green">Create account</div>
        </div>
    );
};

export default LoginCard;
