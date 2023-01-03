import exp from "constants";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Board, detailBoardAsync, initialBoard } from "../../redux/modules/board";

interface BoardPostProps {
    board: Board
  }

const BoardList = ({board}: BoardPostProps): ReactElement => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    // const [board, setBoard] = useState<Board>(initialBoard);
    const id = router.query.id;

    // useEffect(() => {
    //   if(!router.isReady) return;
    //   dispatch(detailBoardAsync(id))
    //     .then((response) => {
    //         console.log(response);
    //         setBoard(response.payload);
    //     })
    //     .catch((reason) => {
    //         alert(reason);
    //     });
    // }, [router.isReady]);
  


    return (
        <div>
            <Seo title="Board"/>
            <p>제목 : {board.title}</p>
            <p>날짜 : {board.createdAt}</p>
            <p>작성자 : {board.author}</p>
            <p>내용 : {board.body}</p>
            <br/>
            <Link href="/board/form">
                <button>등록</button>
            </Link>
        </div>
    )
}
export default BoardList;

// export async function getStaticPaths(): GetStaticPaths {
export const getStaticPaths: GetStaticPaths = async () => {
    // let musicians = fetchMusicians();
    // let paths = musicians.map(musician => {
    //   return {
    //     params: {
    //       name: musician.name.toLowerCase().split(" ").join("-")
    //     }
    //   }
    // });
    
    return {
        paths: [{ params: { id: '1' } },{ params: { id: '2' } }],
        fallback: true, // can also be true or 'blocking'
    }
  }
  
export const getStaticProps: GetStaticProps = async ({ params }) => {
// let fullName = params.name.split("-").map(namePart => namePart[0].toUpperCase() + namePart.slice(1)).join(" ");
// let musician = findMusician(fullName);
// const { lang, slug } = params
const board = initialBoard
return {
    props: {
    board
    }
}
}