import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/loginReducer';

const LoginForm = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login({
                username,
                password,
            }));
    
            setUsername('');
            setPassword('');
    };

    return (    
    <form onSubmit={handleLogin} >
        <div className='login-fields'>
            <div className='username'>
                <h3>username</h3>
                <br></br>
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                className='username-input'
                />
            </div>
            <div className='password'>
                <h3>password</h3>
                <br></br>
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                className='password-input'
                />
            </div>
        </div>
        <button className='login-button' type="submit">login</button>
        
  </form>)
};

export default LoginForm;