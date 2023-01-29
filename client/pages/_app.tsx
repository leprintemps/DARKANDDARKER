import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProviderWrapper } from "../modules/ThemeProviderWrapper";
import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import { Hydrate, QueryClient, QueryClientProvider, QueryKey } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

const cacheTime = 1000 * 60 * 60 * 24; // 24 hours

// const localStoragePersistor = createWebStoragePersistor({
//     storage: window.localStorage,
// });

// const doNotPersistQueries: QueryKey[] = [""];

// persistQueryClient({
//     queryClient,
//     persistor: localStoragePersistor,
// maxAge: cacheTime,
// hydrateOptions: {},
// dehydrateOptions: {
//   shouldDehydrateQuery: ({ queryKey }) => {
//     return !doNotPersistQueries.includes(queryKey)
//   },
// },
//   })

/*
    https://nextjs.org/docs/basic-features/typescript#custom-app
    next-js는 페이지를 로딩하기전에 자동으로 이 페이지 부터 로딩한다.
    무조건 ./pages/_app.tsx 와 같은 경로로 작성해야 한다.
    보통 이곳에 모든 글로벌틱한 모듈들을 임포트한다.

    Component == page
*/

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(new QueryClient({
        defaultOptions: {
            queries: {
                // retry: 0,
                // staleTime: 1000 * 60 * 60 * 24, // 24 hours
                // cacheTime
                // refetchOnWindowFocus: false,
                // suspense: true,
            }
        }
    }));
    // const [client] = queryClient;

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ThemeProviderWrapper>
                    <CssBaseline />
                    <BaseLayout>
                        <Component {...pageProps} />
                    </BaseLayout>
                </ThemeProviderWrapper>
            </Hydrate>
        </QueryClientProvider>
    )
} 
