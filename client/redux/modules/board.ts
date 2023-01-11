import { request} from "../../lib/axios/interceptor";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Board {
    _id: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    author: string,
    body: string,
    comments: Board[],
}

export const initialBoard: Board = {
    _id: '',
    createdAt: '',
    updatedAt: '',
    title: '',
    author: '',
    body: '',
    comments: [],
}

const boardSlice = createSlice({
    name: "board",
    initialState: initialBoard,
    reducers: {
        getBoardInfo: (state) => {
            state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBoardAsync.fulfilled, (state, action) => {
            console.log("getBoard Success");
        });
        builder.addCase(getBoardAsync.rejected, (state, action) => {
            console.log("개같이 실패");
        });
        builder.addCase(editBoardAsync.rejected, (state, action) => {
            console.log("개같이 실패");
        });
    },
});


export const getBoardAsync = createAsyncThunk("BOARD_GET", async() : Promise<Board[]> => {
    const response = await request.get(`/board`);
    console.log(response)
    return response.data;
})

export const detailBoardAsync = createAsyncThunk("BOARD_DETAIL", async(id : string) : Promise<Board> => {
    const response = await request.get(`/board/${id}`);
    return response.data;
})

export const createBoardAsync = createAsyncThunk("BOARD_CREATE", async(Board : {title:string,author:string,body:string}) : Promise<Board> => {
    const response = await request.post(`/board`, Board);
    return response.data;
})

export const editBoardAsync = createAsyncThunk("BOARD_EDIT", async(Board : {_id:string,title:string,author:string,body:string}) : Promise<Board> => {
    const boardBody = {
        title: Board.title,
        author: Board.author,
        body: Board.body,
    };
    const response = await request.patch(`/board/${Board._id}`, boardBody);
    return response.data;
})

export const deleteBoardAsync = createAsyncThunk("BOARD_EDIT", async(id : string) : Promise<Board> => {
    const response = await request.delete(`/board/${id}`);
    return response.data;
})


// export const getBoardInfo = (state: RootState) => state.user;

export const { getBoardInfo } = boardSlice.actions;

export default boardSlice.reducer;