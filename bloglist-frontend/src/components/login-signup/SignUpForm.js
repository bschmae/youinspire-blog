import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../reducers/userReducer';

const SignUpForm = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ checkPassword, setCheckPassword ] = useState('');

    const dispatch = useDispatch();

    const users = useSelector((state) => state.users)

    const handleSignUp = (event) => {
        event.preventDefault();

        if (!username) {
            console.log('missing username')
            return 0
        }

        if (!password) {
            console.log('missing password')
            return 0
        }

        for (const user in users) {
            if (users[user].username === username) {
                console.log('username already taken');
                return 0;
            }
        }

        if (password !== checkPassword) {
            console.log('passwords do not match');
            return 0;
        }

        dispatch(createUser({
            username,
            password,
        }));

        setUsername('');
        setPassword('');
        setCheckPassword('');
    }

    return (
        <form onSubmit={handleSignUp}>
            <div className='login-fields'>
                <div className='username'>
                    <h3>username</h3>
                    <br></br>
                    <input 
                        type='text' 
                        name='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        className='username-input'
                    />
                    <br></br>
                </div>
                <div className='passowrd'>
                    <h3>password</h3>
                    <br></br>
                    <input 
                        type='password' 
                        name='passowrd'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        className='password-input'
                    />
                    <br></br>
                <h3>confirm password </h3>
                <br></br>
                <input 
                    type='password' 
                    name='check-password'
                    value={checkPassword}
                    onChange={({ target }) => setCheckPassword(target.value)}
                    className='password-input'
                />
                <br></br>
                </div>
            </div>
            <button className='login-button' type='submit'>signup</button>
        </form>
    );
};

export default SignUpForm;
