import { Link } from "react-router-dom";
import dateFormat from "../utils/dateFormat";

function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export default function PostCard({ post }) {
  const date = dateFormat(post.createdAt);

  return (
    <Link to={`/post/${post.id}/detail`}>
      <div
        key={post.id}
        className="w-70 h-100 flex flex-col rounded-md border border-slate-500 justify-between bg-dark hover:bg-main/20 transition duration-100 shadow-lg"
      >
        <img
          src={post.imageUrl}
          alt={post.title}
          className="rounded-t-md h-40"
        />
        <div className="p-2 flex-1">
          <h2 className="text-main font-bold text-2xl">{post.title}</h2>
          <p className="text-t-light">
            {stripHtml(post.content).length > 100
              ? stripHtml(post.content).slice(0, 100) + "..."
              : stripHtml(post.content)}
          </p>
        </div>
        <div className="text-t-light mt-2 font-bold m-3 self-end">{date}</div>
      </div>
    </Link>
  );
}
