import axios, { AxiosRequestConfig } from 'axios';
import { logoutUser } from '../../redux/modules/auth';

/* 
    인터셉터는 1.요청하기 직전, 2. 응답을 받고 then, catch로 처리 직전에 가로챌 수 있습니다.
*/
const createInstance = () => {

    const instance = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true,
    })
    
    instance.interceptors.request.use(
        (config: AxiosRequestConfig<any>): AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>> => {
            return config;
        },
        (error) => {
            Promise.reject(error);
        },
    );

    instance.interceptors.response.use(
        (response) => {
			return response;
		},
        async (error) => {
            // 엑세스 토큰에서 문제가 발생
            if ( error.response.data.code === "AT_401" ){
                
                // access_token 재발급 처리
                await request.post("/auth/refresh");
                
                return instance.request(error.config);
            }
            
            // 리프레쉬 토큰에서 문제가 발생
            if ( error.response.data.code === "RT_401" ){

                // 로그아웃 처리
                logoutUser();
                
                // 로그인 화면으로 이동
                window.location.href = "/login";

                // promise chaining 끊기
                return Promise.reject();
            }
        }
    )

    return instance;
}

export const request = createInstance();