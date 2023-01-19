
import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, ReactElement, RefObject, useEffect, useRef, useState } from "react";
import { Button, Grid, TextField, Typography } from '@mui/material';
import 'react-quill/dist/quill.snow.css'
import makeQuill, { quillConfig } from "../../modules/quill";
import { useAppDispatch } from "../../config/redux/hooks";
import { createPostAsync } from "../../requests/post/postSlice";
import Seo from "../../components/Seo";


const ReactQuill = makeQuill();
const PostForm = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [post, setPost] = useState<{
        title: string;
        author: string;
        body: string;
    }>({
        title: "",
        author: "",
        body: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPost({
            ...post,
            [name]: value,
        });
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">글쓰기</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            maxRows={4}
                            label="Title"
                            name="title"
                            required
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                            inputProps={{
                                maxLength: 30,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Author"
                            name="author"
                            required
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill
                            theme="snow"
                            placeholder="내용을 입력하세요"
                            value={post.body}
                            modules={quillConfig.modules} 
                            formats={quillConfig.formats}
                            onChange={
                                (value) => {
                                    setPost({
                                        ...post,
                                        body: value,
                                    });
                                }
                            }

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">저장</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
export default PostForm;









