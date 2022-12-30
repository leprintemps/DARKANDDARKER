import React, { useState } from "react";
import Seo from "../components/Seo";
import { useAppDispatch } from "../redux/hooks";
import { User, userJoinAsync } from "../redux/modules/user";

type JoinProps = {
}

const Join: React.FC<JoinProps> = ({}) => {
    
    const dispatch = useAppDispatch();

    const [User, setUser] = useState<User>({
        username: "",
        password: "",
        name: "",
        email: "",
        location: "",
    })

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;

        setUser({
            ...User,
            [name]: value,
        })
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(userJoinAsync(User));
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
                <button>regist</button>
            </form>
        </>
    )
}

export default Join;