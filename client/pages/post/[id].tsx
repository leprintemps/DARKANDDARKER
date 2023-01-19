//post detail page
import { Button, Grid, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Seo from '../../components/Seo';
import { request } from '../../config/axios/interceptor';
import { useAppDispatch } from '../../config/redux/hooks';
import { detailPostAsync, Post } from '../../requests/post/postSlice';

export default function PostDetailPage({post} : {post:Post}) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const id = router.query.id as string;

    const onClickDelete = () => {
        detailPostAsync(id)
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
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {post.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        {post.author}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <div dangerouslySetInnerHTML={{__html: post.body}} />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" component={Link} href={`/post/edit?id=${id}`}>수정</Button>
                       <Button variant="contained" onClick={onClickDelete}>삭제</Button>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    // const response = await request.get(`/post/${context.params?.id}`);
    // const post = response.data;

    const post = await detailPostAsync(context.params?.id as string);

    return {
        props: {
            post
        }
    }


}