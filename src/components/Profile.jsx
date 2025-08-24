import { toast } from "sonner";
import { logout } from "../utils/api";

export default function Profile() {
  async function handleLogout() {
    const res = await logout();
    if (res.ok) {
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    toast.success("Logged out");
  }

  if (!localStorage.getItem("username")) {
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen w-full bg-dark">
      <main className="w-full xl:w-[60%] m-auto flex flex-col justify-center items-center gap-4 pt-10">
        <p className="text-t-light">{localStorage.getItem("username")}</p>
        <button
          className="w-20 h-11 rounded-xl cursor-pointer font-bold bg-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </main>
    </div>
  );
}
