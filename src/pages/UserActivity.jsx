import { useEffect, useState } from "react";
import { getUserComments, getUserPosts } from "../utils/api";
import PostCard from "../components/PostCard";

export default function UserActivity() {
  const [postData, setpostData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostData = async () => {
    const data = await getUserPosts();
    if (!data || data.length === 0) {
      setpostData([]);
      return;
    }
    setpostData(data);
  };

  const fetchCommentData = async () => {
    const data = await getUserComments();
    if (!data || data.length === 0) {
      setCommentData([]);
      return;
    }
    setCommentData(data);
  };

  useEffect(() => {
    fetchPostData();
    fetchCommentData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-dark flex items-center justify-center">
        <p className="min-h-screen w-full bg-dark loader text-main"></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-dark">
      <main className="w-full xl:w-[60%] m-auto flex flex-col justify-center gap-4 p-10">
        <p className="text-main font-bold text-xl">Your Posts</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {postData.length === 0 ? (
            <p className="text-t-light">No posts found.</p>
          ) : (
            postData.map((post) => <PostCard post={post} />)
          )}
        </div>
        <p className="text-main font-bold text-xl">Your Comments</p>
        <div>
          {commentData.length === 0 ? (
            <p className="text-t-light">No comments found</p>
          ) : (
            commentData.map((comment) => {
              return <p className="text-t-light">{comment.content}</p>;
            })
          )}
        </div>
      </main>
    </div>
  );
}
