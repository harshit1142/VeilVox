import { createSlice } from "@reduxjs/toolkit";


const InitialValue = {
    user: { name: "", userId: "" ,password:""}
}



export const UserSlice = createSlice({
    name: 'user',
    initialState: InitialValue,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        removeUser: (state, action) => {
            localStorage.removeItem('user');
            state.user = { name: "", userId: "" }
        },
        updateUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        }
    }
})

export const { setUser, removeUser, updateUser } = UserSlice.actions
export const UserReducer = UserSlice.reducer

