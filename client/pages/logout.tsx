import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Seo from "../components/Seo";
import { useAppDispatch } from "../redux/hooks";
import { authLogoutAsync } from "../redux/modules/auth";

export default function Logout() {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const auth = useSelector((state: any) => state.Auth);

    const handleLogout = () => {
        dispatch(authLogoutAsync(auth._id))
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