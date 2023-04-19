import { useEffect } from 'react';

import BlogList from './components/blogs/Blog';
import { UserList, UserDisplay } from './components/UserList';
import LoginForm from './components/login-signup/LoginForm';
import BlogForm from './components/blogs/BlogForm';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import Navbar from './components/Navbar';

import './App.css';

import { initializeBlogs } from './reducers/blogReducer';
import { initUser, logout } from './reducers/loginReducer';
import { initializeUsers } from './reducers/userReducer';

import { useDispatch, useSelector } from 'react-redux';
import { useMatch, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/login-signup/SignUpForm';



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initUser());
    dispatch(initializeUsers());
  }, []);

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logout());
  };

  const match = useMatch('/users/:id');
  const userToDisplay = match 
  ? users.find(user => user.id === match.params.id) : null;

  if (user === null) {
    return (
    <div className='container-login'>
      <h1 className='brand-name'>YouInspire</h1>
        <Notification  />
        <Toggle showLabel='login' hideLabel='cancel'>
          <LoginForm />
        </Toggle>
        <Toggle showLabel='sign up' hideLabel='cancel'>
          <SignUpForm />
        </Toggle>
      </div>
        )
      };

  return (
    <div className='container'>  
      <Navbar logout={handleLogout}/>     
      <Routes >
        <Route path='/' element={<BlogList />} ></Route>
        <Route path='/users/:id'  element={<UserDisplay user={userToDisplay} />}></Route>
        <Route path='/blogform' element={<BlogForm />}></Route>
        <Route path='/users' element={<UserList />} ></Route>
      </Routes>
      <Notification  />
    </div>
  );
};
export default App;