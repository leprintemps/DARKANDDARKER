import { useRouter } from "next/router";
import React, { useState } from "react";
import Seo from "../components/Seo";
import { useAppDispatch } from "../redux/hooks";
import { loginUserAsync, User, login } from "../redux/modules/user";

export default function Login() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [User, setUser] = useState<User> ({
        username: "",
        password: "",
        name: "",
        email: "",
        location: "",
    })
    
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
    
            setUser({
                ...User,
                [name]: value,
            })
        }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(loginUserAsync(User))
        .then((response) => {
            console.log("login.tsx : ", response.payload);
            // login(response.payload);
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