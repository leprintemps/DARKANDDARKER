import Seo from "../components/Seo";
import {  useSelector } from "react-redux";

export default function Home() {
    
    const user = useSelector((state: any) => state.User);

    return (
        <div>
            <Seo title="Home"/>
            HOME
            <br/>
            username : {user.username}
            <br/>
            password : {user.password}
            <br/>
            name : {user.name}
            <br/>
            email : {user.email}
            <br/>
            location : {user.location}
            <br/>
            token : {user.token}
        </div>
    );
}