import { useRouter } from 'next/router';
import { userDto } from './authSlice';
import { authLocalSignupAsync } from './authSlice';
import { useAppDispatch } from "../../config/redux/hooks";

export class authDispatcher {

    private dispatch;
    private router;

    constructor() {
        this.dispatch = useAppDispatch();
        this.router = useRouter();
    }
    
    // 회원가입
    authLocalSignupDispatcher = (user: userDto, done: Function, error: Function) => {
        this.dispatch(authLocalSignupAsync(user))
        .then(() => {
            // this.router.push("/");
            done
        })
        .catch((reason) => {
            // console.log(reason);
            error
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