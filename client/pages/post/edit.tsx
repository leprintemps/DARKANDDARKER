import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Post, createPostAsync, detailPostAsync, editPostAsync, initialPost } from "../../requests/post/postSlice";

const PostForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [post, setPost] = useState<{_id:string,title:string,author:string,body:string}>({
        _id:"",
        title:"",
        author:"",
        body:"",
    });

    const id = router.query.id as string;


    useEffect(() => {
        if(!router.isReady) return;
        dispatch(detailPostAsync(id))
          .then((response:any) => {
              console.log(response);
              setPost(response.payload);
          })
          .catch((reason) => {
              alert(reason);
          });
      }, [router.isReady]);

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) => {
        const { name, value } = e.target;

        setPost({
            ...post,
            [name]: value,
        })
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(editPostAsync(post))
        .then((response) => {
            console.log(response);
            router.push("/post/detail?id="+id);
        })
        .catch((reason) => {
            console.log(reason);
        })
    }


    return (
        <div>
            <Seo title="Post"/>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" defaultValue={post.title} required placeholder="title" onChange={handleChange}/>
                <input type="text" name="author" defaultValue={post.author} required placeholder="author" onChange={handleChange}/>
                <textarea name="body" defaultValue={post.body} placeholder="body" onChange={handleChange}/>
                <button>저장</button>
            </form>
        </div>
    )
}

export default PostForm;