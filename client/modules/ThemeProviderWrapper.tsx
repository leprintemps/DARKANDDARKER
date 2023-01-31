"use client";
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTheme, setTheme } from '../querys/themeRequest';

// export async function getStaticsProps() {
//     const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
//     const theme = prefersDarkMode ? 'dark' : 'light';
//     console.log(prefersDarkMode);
    // const queryClient = new QueryClient()
 
//    await queryClient.prefetchQuery('posts', getPosts)
   
//     return { props: { theme } }
// }

export const ThemeProviderWrapper = (props: { theme?: string, children: React.ReactNode }) => {
    const queryClient = useQueryClient();

    // const { data, status, error } = setTheme(props.theme);



    const { data, status, error } = useQuery('theme', getTheme);
    // const themeData = data;
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    // console.log("1",prefersDarkMode);
    console.log(data);
    const theme = data;
    // const mutation = useMutation(setTheme(theme), {
    //     onSuccess: (data) => {
    //         console.log("mutate theme", data);
    //         queryClient.invalidateQueries("theme");
    //     }
    // });
    // mutation.mutate(theme);

    // setTheme(theme as string);
    // console.log(data);
    // React.useEffect(() => {
    //     console.log("2",prefersDarkMode);
    //     console.log(data);
        //     const theme = prefersDarkMode ? 'dark' : 'light';
    //     localStorage.setItem('theme', theme);
    //     // setTheme(themeData as string);
    // }, []);


    const themeObject = React.useMemo(() => {
        return createTheme({
            palette: {
                mode: data === 'dark' ? 'dark' : 'light',
            },
        });
    }, [data]);




    return (
        <ThemeProvider theme={themeObject}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
};

