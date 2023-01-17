import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../config/redux/hooks";
import { Post, createPostAsync, initialPost } from "../../requests/post/postSlice";

const PostForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [post, setPost] = useState<{title:string,author:string,body:string}>({
        title:"",
        author:"",
        body:"",
    });

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) => {
        const { name, value } = e.target;

        setPost({
            ...post,
            [name]: value,
        })
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(createPostAsync(post))
        .then((response) => {
            console.log(response);
            router.push("/post");
        })
        .catch((reason) => {
            console.log(reason);
        })
    }


    return (
        <div>
            <Seo title="Post"/>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" required placeholder="title" onChange={handleChange}/>
                <input type="text" name="author" required placeholder="author" onChange={handleChange}/>
                <textarea name="body" placeholder="body" onChange={handleChange}/>
                <button>저장</button>
            </form>
        </div>
    )
}

export default PostForm;
// export async function getStaticPaths() {
    // let musicians = fetchMusicians();
    // let paths = musicians.map(musician => {
    //   return {
    //     params: {
    //       name: musician.name.toLowerCase().split(" ").join("-")
    //     }
    //   }
    // });
    
//     return {
//         paths: [{ params: { id: '63b3104f53e44d68f805a3c3' } }, { params: { id: '63b30ed8f67e2b07965b6f72' } }],
//         fallback: false, // can also be true or 'blocking'
//     }
//   }
  
// export async function getStaticProps({ params }) {
// let fullName = params.name.split("-").map(namePart => namePart[0].toUpperCase() + namePart.slice(1)).join(" ");
// let musician = findMusician(fullName);

// return {
//     props: {
//     post:{}
//     }
// }
// }