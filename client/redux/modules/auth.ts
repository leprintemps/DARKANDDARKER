import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request} from "../../lib/axios/interceptor";

export interface userDto {
    username: string;
    password: string;
    name: string;
    email: string;
    location: string;
}

export interface authState {
    _id: string;
    username: string;
    isLoading: boolean;
    isLoggedin: boolean;
}

const initialState = {
    _id: "",
    username: "",
    isLoading: false,
    isLoggedin: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser(state) {
            state.isLoggedin = false;
        }
    },
    extraReducers: (builder) => {
        // 회원가입 pending
        builder.addCase(authLocalSignupAsync.pending, (state, action) => {
            console.log("authLocalSignupAsync - pending");
        })
        // 회원가입 fulfilled
        builder.addCase(authLocalSignupAsync.fulfilled, (state, action) => {
            console.log("authLocalSignupAsync - fulfilled");
        })
        // 회원가입 rejected
        builder.addCase(authLocalSignupAsync.rejected, (state, action) => {
            console.log("authLocalSignupAsync - rejected");
            console.log(action.error)
        })
        // 로그인 pending
        builder.addCase(authLocalSigninAsync.pending, (state, action) => {
            console.log("authLocalSigninAsync - pending");
            state.isLoading = true;
            state._id = state._id;
            state.username = state.username;
        })
        // 로그인 fulfilled
        builder.addCase(authLocalSigninAsync.fulfilled, (state, action) => {
            console.log("authLocalSigninAsync - fulfilled");
            state.isLoggedin = true;
            state.isLoading = false;
        })
        // 로그인 rejected
        builder.addCase(authLocalSigninAsync.rejected, (state, action) => {
            console.log("authLocalSigninAsync - rejected");
            console.log(action.error)
        })
        // 로그아웃 pending
        builder.addCase(authLogoutAsync.pending, (state, action) => {
            console.log("authLogoutAsync - pending");
        })
        // 로그아웃 fulfilled
        builder.addCase(authLogoutAsync.fulfilled, (state, action) => {
            console.log("authLogoutAsync - fulfilled");
            state.isLoggedin = false;
        })
        // 로그아웃 rejected
        builder.addCase(authLogoutAsync.rejected, (state, action) => {
            console.log("authLogoutAsync - rejected");
            console.log(action.error)
        })
    },
});

// 유저 회원가입
export const authLocalSignupAsync = createAsyncThunk("AUTH_LOCAL_SIGNUP", async(user: userDto) => {
    await request.post("/auth/local/signup", user);
})

// 유저 로그인
export const authLocalSigninAsync = createAsyncThunk("AUTH_LOCAL_SIGNIN", async(user: userDto) => {
    await request.post("/auth/local/signin", user);
})

// 유저 로그아웃
export const authLogoutAsync = createAsyncThunk("AUTH_LOGOUT", async(_id: string) => {
    await request.post("/auth/logout", _id);
})

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;