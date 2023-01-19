import { AppBar, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Pagination, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../config/redux/hooks";
import { getPostAsync, Post } from "../../requests/post/postSlice";

export default function PostList() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
      dispatch(getPostAsync())
        .then((response:any) => {
            console.log(response);
            console.log(response.payload);
            setPosts(response.payload?.reverse());
        })
        .catch((reason) => {
            alert(reason);
        });
    }, []);
  
    const onClickPost = (id: string) => {
        router.push(`/post/${id}`);
    }


    return (
        <div>
            <Seo title="Post"/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>게시글 목록 </Typography>
                    <Button color="inherit" component={Link} href="/post/write">글쓰기</Button>
                </Toolbar>
            </AppBar>

            
            <Grid container spacing={2}>
                {posts?.length &&
                    posts.slice(indexOfFirstItem, indexOfLastItem).map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} md={4} onClick={() => onClickPost(post._id)}>
                            <Post post={post}/>
                        </Grid>
                    ))
                }
                {!(posts?.length) &&
                    <Typography variant="h5" component="h2">게시글이 없습니다.</Typography>
                }
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Pagination
                    count={Math.ceil(posts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

const Post: React.FC<{post: Post}> = ({ post }) => {
    return (
        <Card>
        <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography variant="subtitle2">by {post.author}</Typography>
            <Typography variant="body1">{post.body}</Typography>
            <Typography variant="subtitle2">{new Date(post.createdAt).toLocaleString()}</Typography>
        </CardContent>
        </Card>
    );
}