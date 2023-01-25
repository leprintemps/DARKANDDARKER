import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createMuiTheme, createTheme, makeStyles, Theme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from '../config/redux/hooks';
import { useSelector } from 'react-redux';
import { selectTheme } from '../requests/theme/themeSlice';


export const ThemeProviderWrapper = ({ children }: React.PropsWithChildren) => {
    const dispatch = useAppDispatch();
    
    const theme = useSelector(selectTheme);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    console.log(prefersDarkMode);
    React.useEffect(() => {
        if(theme.payload.theme.theme === 'initial'){
            if(prefersDarkMode) {
                dispatch(selectTheme('dark'))
            } else {
                dispatch(selectTheme('light'))
            }
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
