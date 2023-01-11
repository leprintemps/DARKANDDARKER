import Auth from './modules/auth';
import Post from './modules/post';
import { configureStore } from '@reduxjs/toolkit';

// store: 컴포넌트들의 state들을 관리.
const store = configureStore({
    reducer : {
        Auth,
        Post,
    },
})

// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["user"],
// }

// hooks.ts에서 사용하기 위해 state, dispatch의 타입을 export.
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;