import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../components/MenuBar";
import { postArticle } from "../utils/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AddPost() {
  const user = useUser();

  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: "<p>Hello World!</p>",
    },
    []
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.files[0];
    const content = editor.getHTML();

    try {
      const data = await postArticle(title, content, image);
      if (data && data.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Post added successfully!");
      navigate(`/post/${data}/detail`);
    } catch (error) {
      toast.error("Failed to add post", { description: error.message });
    }
  };

  if (!user) {
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen w-full bg-dark">
      <main className="w-full xl:w-[60%] m-auto flex flex-col justify-center items-center gap-4 p-8">
        <p className="text-xl text-main font-bold">Add a post</p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <div className="flex gap-2 items-center">
            <label className="text-t-light font-bold" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="px-1 border-2 border-white rounded-md text-t-light h-9 focus:outline-0"
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="image" className="text-t-light font-bold">
              Add post cover
            </label>
            <input type="file" name="image" className="text-t-light" required />
          </div>
          <div className="w-full flex flex-col gap-2 px-1e rounded-md text-t-light focus:outline-0">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          <button
            className="bg-main text-dark font-bold p-2 mt-4 rounded-md cursor-pointer self-center"
            type="submit"
          >
            Add Post
          </button>
        </form>
      </main>
    </div>
  );
}
