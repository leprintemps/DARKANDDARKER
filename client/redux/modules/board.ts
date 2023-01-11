import { request} from "../../lib/axios/interceptor";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Post {
    _id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    author: string,
    body: string,
    comments: Post[],
}

export const initialPost: Post = {
    _id: '',
    createdAt: '',
    updatedAt: '',
    title: '',
    author: '',
    body: '',
    comments: [],
}

const postSlice = createSlice({
    name: "post",
    initialState: initialPost,
    reducers: {
        getPostInfo: (state) => {
            state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPostAsync.fulfilled, (state, action) => {
            console.log("getPost Success");
        });
        builder.addCase(getPostAsync.rejected, (state, action) => {
            console.log("개같이 실패");
        });
        builder.addCase(editPostAsync.rejected, (state, action) => {
            console.log("개같이 실패");
        });
    },
});


export const getPostAsync = createAsyncThunk("BOARD_GET", async() : Promise<Post[]> => {
    const response = await request.get(`/post`);
    console.log(response)
    return response.data;
})

export const detailPostAsync = createAsyncThunk("BOARD_DETAIL", async(id : string) : Promise<Post> => {
    const response = await request.get(`/post/${id}`);
    return response.data;
})

export const createPostAsync = createAsyncThunk("BOARD_CREATE", async(Post : {title:string,author:string,body:string}) : Promise<Post> => {
    const response = await request.post(`/post`, Post);
    return response.data;
})

export const editPostAsync = createAsyncThunk("BOARD_EDIT", async(Post : {_id:string,title:string,author:string,body:string}) : Promise<Post> => {
    const postBody = {
        title: Post.title,
        author: Post.author,
        body: Post.body,
    };
    const response = await request.patch(`/post/${Post._id}`, postBody);
    return response.data;
})

export const deletePostAsync = createAsyncThunk("BOARD_EDIT", async(id : string) : Promise<Post> => {
    const response = await request.delete(`/post/${id}`);
    return response.data;
})


// export const getPostInfo = (state: RootState) => state.user;

export const { getPostInfo } = postSlice.actions;

export default postSlice.reducer;