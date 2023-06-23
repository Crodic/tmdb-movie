import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    auth: localStorage.getItem("auth") ? localStorage.getItem("auth") : false,
    user: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : { userName: "", avatar: "", email: "" },
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateAuth: (state, action) => {
            state.auth = action.payload
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
        updateToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { updateAuth, updateToken, updateUser } = authSlice.actions;
export default authSlice.reducer