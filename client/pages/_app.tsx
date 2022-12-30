import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "mvp.css";
import { Provider } from "react-redux";
import store from "../redux/configStore";

/*
    https://nextjs.org/docs/basic-features/typescript#custom-app
    next-js는 페이지를 로딩하기전에 자동으로 이 페이지 부터 로딩한다.
    무조건 ./pages/_app.tsx 와 같은 경로로 작성해야 한다.
    보통 이곳에 모든 글로벌틱한 모듈들을 임포트한다.

    Component == page
*/
export default function App({ Component, pageProps } : AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component { ...pageProps } />
            </Layout>
        </Provider>
    )
} 