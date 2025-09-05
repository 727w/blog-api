import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { getAllPost } from "../utils/api";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const data = await getAllPost();
    if (!data || data.length === 0) {
      setData([]);
      return;
    }
    setData(data);
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen w-full bg-dark text-center text-main loader"></div>;
  }

  return (
    <div className="min-h-screen w-full bg-dark">
      <main className="w-full xl:w-[60%] m-auto">
        <div className="px-4 py-6 w-full max-sm:mx-auto flex flex-row flex-wrap justify-center items-center gap-4">
          {data.length === 0 ? (
            <p className="">No posts found.</p>
          ) : (
            data.map((post) => <PostCard post={post} />)
          )}
        </div>
      </main>
    </div>
  );
}
