import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import { useAppDispatch } from "../../redux/hooks";
import { Post, getPostAsync } from "../../requests/post/postSlice";

export default function PostList() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    
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
        router.push("post/detail?id="+id);
    }


    return (
        <div>
            <Seo title="Post"/>
            <h1>게시판 ({posts?.length})</h1> 
            {posts?.length &&
                <table>
                    <tbody>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>저자</th>
                        <th>작성일</th>
                        <th>수정일</th>
                    </tr>
                    {posts.map((item, index) => 
                        <tr key={item._id} onClick={() => onClickPost(item._id)}>
                            <td>{posts.length-index}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.createdAt}</td>
                            <td>{item.updatedAt}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            }
            {!(posts?.length) &&
                <table>
                    <tbody>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>저자</th>
                        <th>작성일</th>
                        <th>수정일</th>
                    </tr>
                    <tr>
                        <td colSpan={5}>없음</td>
                    </tr>
                    </tbody>
                </table>
            }
            <br/>
            <Link href="/post/form">
                <button>등록</button>
            </Link>
        </div>
    )
}