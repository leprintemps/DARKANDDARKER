import Link from "next/link";
import { useRouter } from "next/router";
// import style from "./Nav.module.css";

export default function Nav() {
    const router = useRouter();

    return (
        <nav>
            <Link href="/">
                Home
            </Link>
            <Link href="/join">
                Join
            </Link>
            <Link href="/login">
                Login
            </Link>
            <Link href="/logout">
                Logout
            </Link>
            <style jsx>{`
                .container {
                    background-color: tomato;
                }
            `}</style>
        </nav>
    )
} 