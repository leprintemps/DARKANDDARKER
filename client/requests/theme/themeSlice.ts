//theme slice is a redux slice that contains the theme state

import { Theme } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";


export interface themeState {
    theme: string;
}

const initialState : themeState = {
    theme: "initial",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        selectTheme(state, action) {
            state.theme = action.payload;
        }
    }
});

export const { toggleTheme, selectTheme } = themeSlice.actions;

export default themeSlice.reducer;


