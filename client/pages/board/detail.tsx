import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Board, deleteBoardAsync, detailBoardAsync, initialBoard } from "../../redux/modules/board";

export default function BoardDetail() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [board, setBoard] = useState<Board>(initialBoard);
    const id = router.query.id as string;

    useEffect(() => {
      if(!router.isReady) return;
      dispatch(detailBoardAsync(id))
        .then((response: any) => {
            console.log(response);
            setBoard(response.payload);
        })
        .catch((reason) => {
            alert(reason);
        });
    }, [router.isReady]);
  
    const onClickDelete = () => {
        dispatch(deleteBoardAsync(id))
        .then((response) => {
            router.push("/board");
        })
        .catch((reason) => {
            alert(reason);
        });
    }

    return (
        <div>
            <Seo title="Board"/>
            <Typography variant="h3" component="h2">{board.title}</Typography>
            
            <p>{board.author}</p>
            <p>{board.createdAt}</p>
            <Typography paragraph>{board.body}</Typography>
            <br/>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" component={Link} href={`/board/edit?id=${id}`}>수정</Button>
                <Button variant="contained" onClick={onClickDelete}>삭제</Button>
            </Stack>
        </div>
    )
}
