import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    useInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.useInfo = action.payload;
            localStorage.setItem('useInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },

    }
});
export const {setCredentials, logout} = authSlices.actions;

export default authSlices.reducer;
