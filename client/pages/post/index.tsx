import { Pagination } from "@mui/material";
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
    const [itemsPerPage] = useState(5);

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
                        <th>No.</th>
                        <th>제목</th>
                        <th>저자</th>
                        <th>작성일</th>
                        <th>수정일</th>
                    </tr>
                    {posts?.slice(indexOfFirstItem, indexOfLastItem).map((post, index) => (
                        <tr key={post._id} onClick={() => onClickPost(post._id)}>
                            <td>{posts?.length - (itemsPerPage * (currentPage - 1)) - index}</td>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{new Date(post.createdAt).toLocaleString()}</td>
                            <td>{new Date(post.updatedAt).toLocaleString()}</td>
                            
                        </tr>
                    ))}
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
            <Pagination
            count={Math.ceil(posts.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            />
            <Link href="/post/form">
                <button>등록</button>
            </Link>
        </div>
    )
}