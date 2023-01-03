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
            <p>제목 : {board.title}</p>
            <p>날짜 : {board.createdAt}</p>
            <p>작성자 : {board.author}</p>
            <p>내용 : {board.body}</p>
            <br/>
            <Link href={`/board/edit?id=${id}`}>
                <button>수정</button>
            </Link>
            <button onClick={onClickDelete}>삭제</button>
        </div>
    )
}
