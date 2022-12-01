import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpCard.css";

const SignUpCard = ({ setShowSignUp }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            } else {
                history.push("/dashboard");
            }
        } else {
            setErrors({ password: ["Password fields do not match"] })
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    return (
        <div id="signup-form-wrapper">
            <div id='signup-logo-container'>
                {Object.keys(errors).length === 0 && (
                    <i className="fa-solid fa-cloud-moon" id='signup-logo-icon'></i>
                )}
                <div id='signup-logo-name'>Gloom</div>
            </div>
            <form onSubmit={onSignUp}>
                <div className='signup-form-input-container'>
                    <label>User Name</label>
                    <input
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                    ></input>
                    {errors.username && (
                        <div className='signup-error'>{errors.username[0]}</div>
                    )}
                </div>
                <div className='signup-form-input-container'>
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        onChange={updateEmail}
                        value={email}
                    ></input>
                    {errors.email && (
                        <div className='signup-error'>{errors.email[0]}</div>
                    )}
                </div>
                <div className='signup-form-input-container'>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        onChange={updatePassword}
                        value={password}
                    ></input>
                    {errors.password && (
                        <div className='signup-error'>{errors.password[0]}</div>
                    )}
                </div>
                <div className='signup-form-input-container'>
                    <label>Repeat Password</label>
                    <input
                        type='password'
                        name='repeat_password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                    ></input>
                    {errors.password && (
                        <div className='signup-error'>{errors.password[0]}</div>
                    )}
                </div>
                <button type='submit' id='signup-button' className='clickable'>Sign Up</button>
            </form>
            <p>Already have an account?</p>
            <div onClick={() => setShowSignUp(false)} className="clickable green">Log In</div>
        </div>
    );
};

export default SignUpCard;
