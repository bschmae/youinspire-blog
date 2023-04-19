import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        showNotification(state, action) {
            state = action.payload;
            return state;
        },
        hideNotification(state, action) {
            state = null;
            return state;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, timer) => {
    return async dispatch => {
        dispatch(showNotification(message));
        setTimeout(() => {
            dispatch(hideNotification())
        }, timer * 1000);
    };
};

export default notificationSlice.reducer;