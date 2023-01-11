import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Post, deletePostAsync, detailPostAsync, initialPost } from "../../redux/modules/post";

export default function PostDetail() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [post, setPost] = useState<Post>(initialPost);
    const id = router.query.id as string;

    useEffect(() => {
      if(!router.isReady) return;
      dispatch(detailPostAsync(id))
        .then((response: any) => {
            console.log(response);
            setPost(response.payload);
        })
        .catch((reason) => {
            alert(reason);
        });
    }, [router.isReady]);
  
    const onClickDelete = () => {
        dispatch(deletePostAsync(id))
        .then((response) => {
            router.push("/post");
        })
        .catch((reason) => {
            alert(reason);
        });
    }

    return (
        <div>
            <Seo title="Post"/>
            <Typography variant="h3" component="h2">{post.title}</Typography>
            
            <p>{post.author}</p>
            <p>{post.createdAt}</p>
            <Typography paragraph>{post.body}</Typography>
            <br/>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" component={Link} href={`/post/edit?id=${id}`}>수정</Button>
                <Button variant="contained" onClick={onClickDelete}>삭제</Button>
            </Stack>
        </div>
    )
}
