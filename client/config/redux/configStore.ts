import { combineReducers, configureStore, EnhancedStore, Store } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import userSlice from "../../requests/user/userSlice";
import postSlice from "../../requests/post/postSlice";
import storage from 'redux-persist/lib/storage';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

const reducers = combineReducers({
    user: userSlice,
    post: postSlice,
})

const persistConfig = {
    key: "root",
    storage,
    devTools: true,
    whitelist: ["user"],
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const setupStore = (context : any) : EnhancedStore => store;
const makeStore : MakeStore<any> = (context : any) => setupStore(context);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper<Store>(makeStore);
export const persistor = persistStore(store);