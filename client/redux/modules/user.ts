import { RootState } from './../configStore';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
    username: string,
    password: string,
    name: string,
    email: string,
    location: string,
}

const initialState: User = {
    username: "",
    password: "",
    name: "",
    email: "",
    location: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            return {...state, ...action.payload};
        });
    },
});

export const userJoinAsync = createAsyncThunk("USER_JOIN", async(user: User) => {
    const response = await axios.post("/api/test", user);
    return response.data;
})

export const getUserAsync = createAsyncThunk("USER_GET", async(user:User) : Promise<User> => {
    const response = await axios.get(`/api/${user.username}`);
    return response.data;
})

export const getUserInfo = (state: RootState) => state.user;

export default userSlice.reducer;