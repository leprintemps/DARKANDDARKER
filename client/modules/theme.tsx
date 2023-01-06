import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';




const theme = (): Theme => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
            },
            }),
        [prefersDarkMode],
    );
    return theme;
}


export default theme;