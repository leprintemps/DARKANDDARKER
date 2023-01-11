import { useRouter } from 'next/router';
import { userDto } from './authSlice';
import { authLocalSignupAsync } from './authSlice';
import { useAppDispatch } from "../../config/redux/hooks";

// export function authLocalSigninDispatcher() {

// }

// export function authLogoutDispatcher() {

// }

// export function authLocalSignupDispatcher() {

// }

export class authDispatcher {

    dispatch = useAppDispatch();
    router = useRouter();
    
    // 회원가입
    authLocalSignupDispatcher = (user: userDto) => {
        this.dispatch(authLocalSignupAsync(user))
        .then(() => {
            this.router.push("/");
        })
        .catch((reason) => {
            console.log(reason);
        })
    }

    // 로그인
    authLocalSigninDispatcher = (user: userDto) => {
        this.dispatch(authLocalSignupAsync(user))
        .then(() => {
            this.router.push("/")
        })
        .catch((reason) => {
            console.log(reason);
        })
    }

}