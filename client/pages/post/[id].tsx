import exp from "constants";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Post, detailPostAsync, initialPost } from "../../redux/modules/post";

interface PostPostProps {
    post: Post
  }

const PostList = ({post}: PostPostProps): ReactElement => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    // const [post, setPost] = useState<Post>(initialPost);
    const id = router.query.id;

    // useEffect(() => {
    //   if(!router.isReady) return;
    //   dispatch(detailPostAsync(id))
    //     .then((response) => {
    //         console.log(response);
    //         setPost(response.payload);
    //     })
    //     .catch((reason) => {
    //         alert(reason);
    //     });
    // }, [router.isReady]);
  


    return (
        <div>
            <Seo title="Post"/>
            <p>제목 : {post.title}</p>
            <p>날짜 : {post.createdAt}</p>
            <p>작성자 : {post.author}</p>
            <p>내용 : {post.body}</p>
            <br/>
            <Link href="/post/form">
                <button>등록</button>
            </Link>
        </div>
    )
}
export default PostList;

// export async function getStaticPaths(): GetStaticPaths {
export const getStaticPaths: GetStaticPaths = async () => {
    // let musicians = fetchMusicians();
    // let paths = musicians.map(musician => {
    //   return {
    //     params: {
    //       name: musician.name.toLowerCase().split(" ").join("-")
    //     }
    //   }
    // });
    
    return {
        paths: [{ params: { id: '1' } },{ params: { id: '2' } }],
        fallback: true, // can also be true or 'blocking'
    }
  }
  
export const getStaticProps: GetStaticProps = async ({ params }) => {
// let fullName = params.name.split("-").map(namePart => namePart[0].toUpperCase() + namePart.slice(1)).join(" ");
// let musician = findMusician(fullName);
// const { lang, slug } = params
const post = initialPost
return {
    props: {
    post
    }
}
}