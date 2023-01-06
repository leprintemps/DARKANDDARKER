import axios, { AxiosRequestConfig } from 'axios';

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
        (error) => {
            // 응답결과에 액세스토큰 만료오류 를 보낼경우 여기서 처리하는등 응답결과에 따른 처리 로직을 작성한다.
        }
    )

    return instance;
}

export const request = createInstance();