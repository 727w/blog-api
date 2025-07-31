import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full px-4 py-2 flex items-center justify-center border-b-slate-700 border bg-dark">
      <div className="w-full xl:w-[70%] flex justify-between items-center">
        <Link to="/">
          <div className="flex w-max items-center">
            <svg
              height="25px"
              width="25px"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#f6f5f5"
            >
              <g id="SVGRepo_iconCarrier">
                <style>{".st0{fill:#f6f5f5}"}</style>
                <path
                  className="st0"
                  d="M93.539 218.584L275.004 218.584 354.699 138.894 355.448 138.145 355.448 125.045 93.539 125.045z"
                />
                <path
                  className="st0"
                  d="M402.213 433.724L46.77 433.724 46.77 78.276 402.213 78.276 402.213 91.467 448.983 56.572 448.983 31.506 0 31.506 0 480.494 448.983 480.494 448.983 289.204 402.213 335.974z"
                />
                <path
                  className="st0"
                  d="M229.358 274.708H93.539v28.062h120.476c4.587-9.912 9.917-19.458 15.343-28.062zM93.539 349.539v28.062h110.935c-3.275-8.796-4.302-18.334-3.649-28.062H93.539zM290.939 268.789c-15.501 15.501-55.612 80.76-40.11 96.27 15.51 15.51 80.76-24.609 96.27-40.11l63.755-63.77-56.155-56.15-63.76 63.76zM500.374 115.509c-15.511-15.502-40.649-15.502-56.15 0l-76.682 76.685 56.156 56.15 76.676-76.685c15.501-15.501 15.501-40.64 0-56.15zm-100.208 86.852l-9.636-9.628 53.684-53.684 9.619 9.618-53.667 53.694z"
                />
              </g>
            </svg>
            <p className="text-3xl font-bold text-main ml-2">Go-</p>
            <p className="text-3xl font-bold text-t-light">Blog</p>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-2 w-max">
          <Link to="/login" className="text-t-light hover:underline">
            Login
          </Link>
          <Link
            to="/signup"
            className="text-alt bg-main font-bold p-2 rounded-md"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
