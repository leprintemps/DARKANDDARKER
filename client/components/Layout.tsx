import React from "react"
import Nav from "./Nav"

export default function Layout({ children } : React.PropsWithChildren) {
    return (
        <>
            <Nav />
            <div>{children}</div>
        </>
    )
}