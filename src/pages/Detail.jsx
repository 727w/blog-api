import { useEffect, useState } from "react";
import { getAllComments, getPostDetail } from "../utils/api";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import dateFormat from "../utils/dateFormat";
import Comments from "../components/Comments";

export default function Detail() {
  const [postData, setPostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const postDetail = async (id) => {
    const data = await getPostDetail(id);
    setPostData(data);
  };

  const getComments = async (id) => {
    const data = await getAllComments(id);
    setCommentData(data);
  };

  const pageId = useParams().id;
  const date = dateFormat(postData.createdAt);

  useEffect(() => {
    const fetchData = async () => {
      await postDetail(pageId);
      await getComments(pageId);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen w-full bg-dark loader text-main"></div>;
  }

  return (
    <div className="min-h-screen w-full bg-dark">
      <main className="w-full xl:w-[60%] m-auto px-4 py-6">
        <h1 className="text-t-light font-bold text-xl mb-8">
          {postData.title}
        </h1>
        <div className="flex items-center mb-8">
          <span className="text-main font-light">{postData.authorName}</span>
          <span className="text-t-light font-light">, {date}</span>
        </div>
        <img
          src={postData.imageUrl}
          alt={postData.title}
          className="w-max h-full lg:h-80 object-cover rounded-xl shadow mx-auto"
        />
        <article className="text-t-light prose lg:prose-xl mt-20">
          {typeof postData.content === "string"
            ? parse(postData.content)
            : null}
        </article>
        <div className="border-t border mt-50">
          <Comments data={commentData} />
        </div>
      </main>
    </div>
  );
}
