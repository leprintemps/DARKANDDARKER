import Head from "next/head";

interface props {
    title: string
}

// Search Engine Optimization
export default function Seo({ title } : props) {
    const pagename = `${title} | DARKER`;
    return (
        <Head>
            <title>{pagename}</title>
        </Head>
    )
}