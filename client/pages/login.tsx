import { useRouter } from "next/router";
import React, { useState } from "react";
import Seo from "../components/Seo";
import { useAppDispatch } from "../redux/hooks";
import { authLocalSigninAsync, userDto } from "../redux/modules/auth";

export default function Login() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [user, setUser] = useState<userDto> ({
        username: "",
        password: "",
        name: "",
        email: "",
        location: "",
    })
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(authLocalSigninAsync(user))
        .then(() => {
            router.push("/")
        })
        .catch((reason) => {
            console.log(reason);
        })
    }

    return (
        <>
            <Seo title="Login" />
            <form onSubmit={handleSubmit}>
                username: <input type="username" name="username" required onChange={handleChange} />
                password: <input type="password" name="password" required onChange={handleChange} />
                <button type="submit">login</button>
            </form>
        </>
    )
}