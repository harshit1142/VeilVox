import { createSlice } from "@reduxjs/toolkit";


const InitialValue = {
    user: { name: "", userId: "", pic: ""}
}



export const UserSlice = createSlice({
    name: 'user',
    initialState: InitialValue,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user.name = action.payload.name;
            state.user.userId = action.payload._id;
            state.user.pic = action.payload.pic;
        },
        removeUser: (state, action) => {
            localStorage.removeItem('user');
            state.user = { name: "", userId: "", pic: "" }
        },
        updateUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        }
    }
})

export const { setUser, removeUser, updateUser } = UserSlice.actions
export const UserReducer = UserSlice.reducer

