import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request} from "../../config/axios/interceptor";

export interface userState {
    _id: string;
    username: string;
    isLoading: boolean;
    isSignedIn: boolean;
}

const initialState : userState = {
    _id: "",
    username: "",
    isLoading: false,
    isSignedIn: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser(state) {
            state.isSignedIn = false;
        }
    },
    extraReducers: (builder) => {
        // 로그인 fulfilled
        builder.addCase(userSigninAsync.fulfilled, (state, action) => {
            state.isSignedIn = true;
        })
        // 로그아웃 fulfilled
        builder.addCase(userSignoutAsync.fulfilled, (state, action) => {
            state.isSignedIn = false;
        })
    },
});

// 유저 회원가입
export const userSignupAsync = createAsyncThunk("USER_SIGNUP", async(user: any) => {
    await request.post("/user/signup", user);
})

// 유저 로그인
export const userSigninAsync = createAsyncThunk("USER_SIGNIN", async(user: any) => {
    await request.post("/user/signin", user);
})

// 유저 로그아웃
export const userSignoutAsync = createAsyncThunk("USER_SIGNOUT", async() => {
    await request.post("/user/signout");
})

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;