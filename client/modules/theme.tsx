import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createMuiTheme, createTheme, makeStyles, Theme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from '../config/redux/hooks';
import { useSelector } from 'react-redux';
import { selectTheme } from '../requests/theme/themeSlice';


export const ThemeProviderWrapper = ({ children }: React.PropsWithChildren) => {
    const dispatch = useAppDispatch();
    
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = useSelector(selectTheme);
    console.log(prefersDarkMode);
    React.useEffect(() => {
        if(prefersDarkMode) {
            dispatch(selectTheme('dark'))
        } else {
            dispatch(selectTheme('light'))
        }
    }, []);
    

    const themeObject = React.useMemo(() => {
        return createTheme({
            palette: {
                mode: theme.payload.theme.theme === 'dark' ? 'dark' : 'light',
            },
        });
    }, [theme]);


    

    return (
        <ThemeProvider theme={themeObject}>
            {children}
        </ThemeProvider>
    );
};
