import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/api/post/all");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center text-t-light loader">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-dark">
      <main className="w-full xl:w-[60%] m-auto">
        <div className="px-4 py-6 w-min max-sm:mx-auto flex flex-row justify-center items-center gap-4">
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
