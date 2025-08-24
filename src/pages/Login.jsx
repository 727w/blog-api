import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import { toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await login(username, password);

    let data;

    try {
      data = await res.json();
    } catch (e) {
      console.error("Response is not JSON:", e);
    }

    if (res.ok) {
      localStorage.setItem("username", data.username); // Save username
      navigate("/");
      toast.success("Logged in successfully!", {
        description: `Welcome back, ${username}!`,
      });
    } else {
      toast.error(data.error || "Failed to log in", {
        description: "Invalid username or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="h-max w-full flex flex-col items-center max-w-md p-8 rounded-lg border-2 border-main">
        <p className="text-xl text-main font-bold">Login</p>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <label htmlFor="username" className="text-t-light">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="px-1 border-2 border-white rounded-md text-t-light h-9 focus:outline-0"
            required
          />
          <label htmlFor="password" className="text-t-light">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="px-1 border-2 border-white rounded-md text-t-light h-9 w-full pr-10 focus:outline-0"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-t-light cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? (
                // Eye open SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z"
                  />
                </svg>
              ) : (
                // Eye closed SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 5c-7 0-10 7-10 7s3 7 10 7c2.21 0 4.21-.5 6-1.35l-1.45-1.45C15.36 18.07 13.74 18.5 12 18.5c-5.52 0-8.5-5.5-8.5-5.5S6.48 7.5 12 7.5c1.74 0 3.36.43 4.55 1.3l1.45-1.45C16.21 5.5 14.21 5 12 5zm0 3a3 3 0 00-3 3c0 .74.27 1.41.72 1.93l1.43-1.43A1.99 1.99 0 0112 10c1.1 0 2 .9 2 2 0 .39-.11.75-.29 1.06l1.43 1.43A2.99 2.99 0 0015 11a3 3 0 00-3-3zm9.19 13.19l-1.41 1.41-2.79-2.79C15.36 21.07 13.74 21.5 12 21.5c-7 0-10-7-10-7s3-7 10-7c2.21 0 4.21.5 6 1.35l2.79-2.79 1.41 1.41-19 19z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-main text-dark font-bold p-2 mt-4 rounded-md cursor-pointer"
          >
            Login
          </button>
          <p className="mt-4 text-gray-200 self-end">
            Doesn't have an account yet?{" "}
            <a href="/signup" className="text-main underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
