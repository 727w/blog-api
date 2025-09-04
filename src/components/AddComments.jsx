import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../utils/api";
import { toast } from "sonner";

export default function AddComments() {
  const [comment, setComment] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await postComment(id, comment);
      setComment("");
    } catch (error) {
      toast.error("Error adding comment:", error);
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        name="content"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-t-light focus:outline-0"
        placeholder="Add a comments..."
      />
      {comment.trim() && (
        <button type="submit" className="cursor-pointer">
          <svg
            viewBox="0 0 24 24"
            fill="#f6f5f5"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-main w-6 h-6 rounded-md"
          >
            <path
              d="M11.5 12H5.42m-.173.797L4.242 15.8c-.55 1.643-.826 2.465-.628 2.971.171.44.54.773.994.9.523.146 1.314-.21 2.894-.92l10.135-4.561c1.543-.695 2.314-1.042 2.553-1.524a1.5 1.5 0 000-1.33c-.239-.482-1.01-.83-2.553-1.524L7.485 5.243c-1.576-.71-2.364-1.064-2.887-.918a1.5 1.5 0 00-.994.897c-.198.505.074 1.325.618 2.966l1.026 3.091c.094.282.14.423.159.567a1.5 1.5 0 010 .385c-.02.144-.066.285-.16.566z"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </form>
  );
}
