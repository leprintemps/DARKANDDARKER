import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Board, getBoardAsync } from "../../redux/modules/board";

export default function BoardList() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [boards, setBoards] = useState<Board[]>([]);
    
    useEffect(() => {
      dispatch(getBoardAsync())
        .then((response:any) => {
            console.log(response);
            console.log(response.payload);
            setBoards(response.payload.reverse());
        })
        .catch((reason) => {
            alert(reason);
        });
    }, []);
  
    const onClickBoard = (id: string) => {
        router.push("board/detail?id="+id);
    }


    return (
        <div>
            <Seo title="Board"/>
            <h1>게시판 ({boards.length})</h1> 
            <table>
                <tbody>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>저자</th>
                    <th>작성일</th>
                    <th>수정일</th>
                </tr>
                {boards.map((item, index) => 
                    <tr key={item._id} onClick={() => onClickBoard(item._id)}>
                        <td>{boards.length-index}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.updatedAt}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <br/>
            <Link href="/board/form">
                <button>등록</button>
            </Link>
        </div>
    )
}