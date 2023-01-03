import Link from "next/link";


export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/join">
                        Join
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link href="/logout">
                        Logout
                    </Link>
                </li>
                <li>
                    <Link href="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link href="/board">
                        Board
                    </Link>
                </li>
            </ul>
        </nav>
    )
} 