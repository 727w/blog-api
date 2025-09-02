import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

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
          {user ? (
            <>
              <div className="flex gap-2 items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="border border-t-light rounded-full w-6 h-6"
                >
                  <g clipPath="url(#a)">
                    <path d="M0 0H24V24H0z" />
                    <g filter="url(#b)">
                      <path
                        d="M14.336 12.347l-.26-.428a.5.5 0 00.115.906l.145-.478zm-4.673 0l.146.478a.5.5 0 00.114-.905l-.26.427zm-5.601 6.655l-.497-.062.497.062zm15.876 0l.497-.062-.497.062zM16 8.5c0 1.448-.77 2.717-1.924 3.42l.52.854A4.997 4.997 0 0017 8.5h-1zm-4-4a4 4 0 014 4h1a5 5 0 00-5-5v1zm-4 4a4 4 0 014-4v-1a5 5 0 00-5 5h1zm1.923 3.42A3.997 3.997 0 018 8.5H7c0 1.811.963 3.397 2.403 4.274l.52-.854zm-.405-.052a8.509 8.509 0 00-5.953 7.072l.993.124a7.508 7.508 0 015.251-6.24l-.291-.956zM3.565 18.94c-.11.888.626 1.56 1.435 1.56v-1c-.295 0-.468-.228-.442-.436l-.993-.124zM5 20.5h14v-1H5v1zm14 0c.81 0 1.545-.672 1.434-1.56l-.992.124c.026.208-.147.436-.442.436v1zm1.434-1.56a8.509 8.509 0 00-5.952-7.072l-.291.957a7.508 7.508 0 015.251 6.239l.992-.124z"
                        fill="#f6f5f5"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="b"
                      x={2.55444}
                      y={3.5}
                      width={18.8911}
                      height={19}
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity={0} result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy={1} />
                      <feGaussianBlur stdDeviation={0.5} />
                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                      <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_15_82"
                      />
                      <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow_15_82"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0H24V24H0z" />
                    </clipPath>
                  </defs>
                </svg>
              <Link to="/user/profile" className="text-t-light font-bold">
                {user.username}
              </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-t-light hover:underline">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-alt bg-main font-bold p-2 rounded-md"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
