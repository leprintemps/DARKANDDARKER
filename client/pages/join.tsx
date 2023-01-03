import React, { useState } from "react";
import Seo from "../components/Seo";
import { useAppDispatch } from "../redux/hooks";
import { User, joinUserAsync } from "../redux/modules/user";
import { useRouter } from "next/router";

type JoinProps = {
}

const Join: React.FC<JoinProps> = ({}) => {
    
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [User, setUser] = useState<User>({
        username: "",
        password: "",
        name: "",
        email: "",
        location: "",
    })

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = event.target;

        setUser({
            ...User,
            [name]: value,
        })
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(joinUserAsync(User))
        .then((response) => {
            console.log(response);
        })
        .catch((reason) => {
            console.log(reason);
        })
    }

    return (
        <>
            <Seo title="Join"/>
            <form onSubmit={handleSubmit}>
                username : <input type="username" name="username" required onChange={handleChange}/>
                password : <input type="password" name="password" required onChange={handleChange}/>
                email : <input type="email" name="email" required onChange={handleChange}/>
                name : <input type="name" name="name" required onChange={handleChange}/>
                location : <input type="location" name="location" required onChange={handleChange}/>
                <button type="submit">regist</button>
            </form>
        </>
    )
}

export default Join;