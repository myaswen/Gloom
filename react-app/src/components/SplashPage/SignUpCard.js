import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpCard.css";

const SignUpCard = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
            } else {
                history.push("/");
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
            <form onSubmit={onSignUp}>
                <div>
                    <label>User Name</label>
                    <input
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                    ></input>
                    {errors.username && (
                        <div>{errors.username[0]}</div>
                    )}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        onChange={updateEmail}
                        value={email}
                    ></input>
                    {errors.email && (
                        <div>{errors.email[0]}</div>
                    )}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        onChange={updatePassword}
                        value={password}
                    ></input>
                </div>
                <div>
                    <label>Repeat Password</label>
                    <input
                        type='password'
                        name='repeat_password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                    ></input>
                    {errors.password && (
                        <div>{errors.password[0]}</div>
                    )}
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpCard;