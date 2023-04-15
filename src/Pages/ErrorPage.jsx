import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-center text-9xl font-black mb-2">
          404 error
        </h1>
        <h1 className="text-white text-center text-5xl font-bold mb-10">
          Page not found
        </h1>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex justify-center items-center w-11/12 ml-2 bg-red-700 text-white font-medium sm:font-bold text-xl px-16 md:text-xl  py-3 rounded shadow hover:shadow-lg hover:bg-red-900 outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
