import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login';
import blogService from '../services/blogs';
import userServices from '../services/users';
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    },
});

export const { setUser,  } = loginSlice.actions;

export const initUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
          };

    };
};

export const login = (credentials) => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
              );

            blogService.setToken(user.token);
            dispatch(setUser(user));
            } catch (error) {
                dispatch(setNotification('invalid username or passowrd', 5))
            }
    };
};

export const logout = () => {
    return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
    };
};

export default loginSlice.reducer;