import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Board, createBoardAsync, detailBoardAsync, editBoardAsync, initialBoard } from "../../redux/modules/board";

const BoardForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [board, setBoard] = useState<{_id:string,title:string,author:string,body:string}>({
        _id:"",
        title:"",
        author:"",
        body:"",
    });

    const id = router.query.id as string;


    useEffect(() => {
        if(!router.isReady) return;
        dispatch(detailBoardAsync(id))
          .then((response:any) => {
              console.log(response);
              setBoard(response.payload);
          })
          .catch((reason) => {
              alert(reason);
          });
      }, [router.isReady]);

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement> ) => {
        const { name, value } = e.target;

        setBoard({
            ...board,
            [name]: value,
        })
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        dispatch(editBoardAsync(board))
        .then((response) => {
            console.log(response);
            router.push("/board/detail?id="+id);
        })
        .catch((reason) => {
            console.log(reason);
        })
    }


    return (
        <div>
            <Seo title="Board"/>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" defaultValue={board.title} required placeholder="title" onChange={handleChange}/>
                <input type="text" name="author" defaultValue={board.author} required placeholder="author" onChange={handleChange}/>
                <textarea name="body" defaultValue={board.body} placeholder="body" onChange={handleChange}/>
                <button>저장</button>
            </form>
        </div>
    )
}

export default BoardForm;