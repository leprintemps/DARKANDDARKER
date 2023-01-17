import { useRouter } from "next/router";
import Seo from "../components/Seo";
import { useAppDispatch } from "../config/redux/hooks";
import { userSignoutAsync } from "../requests/user/userSlice";

export default function Logout() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(userSignoutAsync())
        .then(() => {
            router.push("/");
        })
        .catch((reason) => {
            console.log(reason);
        })
    }

    return (
        <div>
            <Seo title="Logout"/>
            <button type="button" onClick={handleLogout}>logout</button>
        </div>
    )
}