import { createSlice } from "@reduxjs/toolkit";
import userServices from '../services/users';
import { setNotification } from '../reducers/notificationReducer';

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
        appendUser(state, action) {
            state.push(action.payload);
        }
    },
});

export const { setUsers, appendUser} = userSlice.actions;

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userServices.getAll();
        dispatch(setUsers(users));
    };
};

export const createUser = (user) => {
    return async dispatch => {
        try {
            const newUser = await userServices.create(user)
            dispatch(appendUser(newUser))
            dispatch(setNotification('successfully signed up, please login', 5))
        } catch (error) {
            console.log(error)
            dispatch(setNotification(`something went wrong ${error}`, 5))
        }
    };
};

export default userSlice.reducer;