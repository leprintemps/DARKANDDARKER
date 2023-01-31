import { useMutation, useQuery } from 'react-query';
import { request } from '../config/axios/interceptor';
import * as themeRequest from './themeRequest';
import { useQueryClient } from 'react-query';

const theme_key = 'theme';

export const useThemeQuery = () => {
    const { data, status, error } = useQuery(theme_key, themeRequest.getTheme, {
        staleTime: Infinity,
    });

    return { data, status, error };
}

export const setTheme = (theme: string) => {
    const { data, status, error } = useQuery([theme_key, theme], () => themeRequest.setTheme(theme), {
    });

    return { data, status, error };
}

export const toggleTheme = () => {
    const { data, status, error } = useQuery(theme_key, () => themeRequest.toggleTheme(), {
    });
    
    return { data, status, error };
}

// export const setTheme = (theme: string) => {
//     const { mutate, status, error  } = useMutation(theme => themeRequest.setTheme(theme), {
//         onSuccess: (data) => {
//             console.log(data);
//             queryClient.setQueryData(theme_key, data);
//         }
//     });

//     return { mutate, status, error };
// }

// export const toggleTheme = () => {
//     const { mutate, status, error  } = useMutation(themeRequest.toggleTheme, {
//         onSuccess: (data) => {
//             console.log(data);
//             queryClient.setQueryData(theme_key, data);
//         }
//     });

//     return { mutate, status, error };
// }
