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

/*
    createSlice : name, initialState, reducers로 구성됨
    name : 각각 slice의 이름을 구분짓기 위해 사용
    reducers : action + state의 변화 까지 구현 그리고 immer.js를 내장하고 있어서 state의 값을 return 하지 않아도 됨
*/
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // state를 반환( state == user )
        getUserInfo: (state) => {
            state;
        }
    },
    // promise pending ? fulfilled : rejected
    extraReducers: (builder) => {
        // getUserAsync가 fulfilled일 때
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            return {...state, ...action.payload};
        });
        // getUserAsync가 rejected일 때
        builder.addCase(getUserAsync.rejected, (state, action) => {
        });
    },
});

/*
    https://redux-toolkit.js.org/api/createAsyncThunk
    createAsyncThunk
    비동기 작업을 처리하는 action을 만들어 준다.
    action타입의 문자열, promise를 반환하는 비동기 함수, 추가 옵션 순서대로 인자를 받는 함수.
    입력받은 action 타입 문자열을 기반으로 promise 라이프사이클 action 타입을 생성하고, thunk action creator를 반환.

    reducers vs extraReducers
    동기적 action에는 reducers를, 비동기적 작업에는 extraReducers를 사용하는데 
    reducers는 redux-toolkit이 action creator를 자동으로 만들어주는 반면 
    extraReducers는 redux-toolkit이 action creator를 자동으로 만들어주지 못하므로 action creator를 작성해야 한다.

    thunk action creator
    promise 콜백을 실행하고 promise를 기반으로 라이프사이클 action을 dispatch한다.
    [함수명].pending, [함수명].fulfilled, [함수명].rejected 세가지의 thunk action creator가 생성된다.

    thunk의 실행순서
    1. pending action을 dispatch 한다.
    2. payloadCreator 콜백을 호출하고 promise가 반환되기를 기다린다.
    3. promise가 반환되면 promise 상태에 따라 다음 행동을 실행한다.
        1) promise가 이행된 상태라면, action.payload를 fulfilled 액션에 담아 디스패치한다.
        2) promise가 거부된 상태라면, rejected 액션을 디스패치하되 rejectedValue(value) 함수의 반환값에 따라 
            액션에 어떤 값이 넘어올지 결정된다.
        3) rejectedValue가 값을 반환하면, action.payload를 reject 액션에 담는다.
        4) rejectedValue가 없거나 값을 반환하지 않았다면, action.error 값처럼 오류의 직렬화된 버전을 
            reject 액션에 담는다.
    4. 디스패치된 액션이 어떤 액션인지에 상관없이, 항상 최종적으로 디스패치된 액션을 담고 있는 이행된 프로미스를 반환한다.
*/

// 유저정보 조회
export const getUserAsync = createAsyncThunk("USER_GET", async(User : User) : Promise<User> => {
    const response = await axios.get(`/api/${User.username}`);
    return response.data;
})

// 유저 회원가입
export const joinUserAsync = createAsyncThunk("USER_JOIN", async(User : User) : Promise<User> => {
    const response = await axios.post("/user/join", User);
    return response.data;
})

// 유저 로그인
export const loginUserAsync = createAsyncThunk("USER_LOGIN", async(User : User) : Promise<User> => {
    const response = await axios.post("/user/login");
    return response.data;
})

// 유저 로그아웃
export const logoutUserAsync = createAsyncThunk("USER_LOGOUT", async(User: User) : Promise<User> => {
    const response = await axios.post("/user/logout", User);
    return response.data;
})

// export const getUserInfo = (state: RootState) => state.user;

export const { getUserInfo } = userSlice.actions;

export default userSlice.reducer;