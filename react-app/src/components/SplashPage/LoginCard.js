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
            history.push("/");
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div id="login-form-wrapper">
            <form onSubmit={onLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                    <button type='submit'>Login</button>
                </div>
                {Object.keys(errors).length > 0 && (
                    <div>Authentication failed</div>
                )}
            </form>
            <p>Don't have an account?</p>
            <div onClick={() => setShowSignUp(true)}>Create an account</div>
        </div>
    );
};

export default LoginCard;
