import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, provider } from "../firebase.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      setValue(user.email);
      localStorage.setItem("email", user.email);

      // Send user data to Laravel backend for storage
      const response = await axiosClient.post("/loginwithgoogle", { user });

      if (response.status === 200) {
        // Set user and token
        setUser(response.data.user);
        setToken(response.data.token);
        setRedirect(true);
        window.location.reload();
      } else {
        console.error("Error logging in with Google:", response.data.message);
      }
    } catch (error) {
      console.error("Firebase Google login error:", error);
    }
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("userRole", String(data.user.role));
        const userrole = data.user.role;
        if (userrole === "admin") {
          navigate("/userAdmin"); // Correction ici
        } else {
          console.log("trueeeee");
          navigate("/user"); // Correction ici
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };
  if (redirect) {
    return <Navigate to="/user" />;
  }
  return (
    <div className="flex items-center justify-center">
      <div className=" z-10  flex min-h-screen overflow-hidden justify-center items-center gap-52 ">
        <div className=" px-8 pt-4 pb-8  h-full bg-white w-90  rounded-2xl flex flex-col gap-1 items-center justify-center ">
          <img className="h-16" src="/logo2.png" alt="logo" />
          <p className=" mb-4  text-midnightblue font-medium flex items-center justify-center text-xl ">
            Login into your account
          </p>

          <button
            onClick={handleGoogleLogin}
            className="bg-gray-200 h-10 flex items-center w-80 justify-center rounded-xl"
          >
            <p className="flex gap-1 text-gray-500">
              <img
                className="h-7 w-7 relative overflow-hidden shrink-0 z-[2] "
                alt=""
                src="/flatcoloriconsgoogle.svg"
              />
              Login with Google
            </p>
          </button>
          <div className="m-4 self-stretch flex flex-row items-center justify-center gap-[13px]">
            <div className="h-px w-[70px] relative box-border z-[1] border-t-[1px] border-solid border-gray-200" />
            <div className="relative   font-normal  text-gray-400 text-xs z-[1]">
              or Login with Email
            </div>
            <div className="h-px w-[70px] relative box-border z-[1] border-t-[1px] border-solid border-gray-200" />
          </div>
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={onSubmit}
          >
            <input
              className=" w-80 border border-gray-300 text-gray-500 rounded-xl px-5 py-2"
              placeholder="Enter your email"
              ref={emailRef}
              type="email"
            />
            <input
              className=" w-80 border border-gray-300 text-gray-500 rounded-xl px-5 py-2"
              placeholder="Password"
              ref={passwordRef}
              type="password"
            />
            <p className="text-sm text-center -mt-1 text-blue-500 ">
              Forgot your password?{" "}
              <Link to="/passwordreset" className="font-bold">
                Reset it here
              </Link>
            </p>
            {message && (
              <div className="  text-red-500 rounded-lg   flex items-center justify-between">
                <div className="flex items-center">
                  <button onClick={() => setMessage(null)}>
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m-2-2l-2-2m2 2l2 2m-2-2l-2-2m2 2l2 2m-2-2l-2-2m2 2l2 2m-2-2l-2-2"
                      />
                    </svg>
                  </button>
                  <p className="font-medium text-sm">{message}</p>
                </div>
              </div>
            )}
            <button className=" h-8 w-24  bg-[#212177] mb-1   text-white  items-center px-4  pb-1  justify-center font-medium  mt-4 rounded-xl  ">
              Login
            </button>
          </form>

          <div className="relative flex mt-1 justify-center text-gray-400 z-[1]">
            <span className="font-extralight font-inter">Not</span>
            <span className="font-inter">{` `}</span>
            <span className="font-extralight font-inter">{` registered yet? `}</span>
            <Link to="/signup">
              <span className="font-semibold font-inter text-gray-500">
                Signup
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
