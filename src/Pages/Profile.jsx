import React, { useState, useContext, useEffect, useRef } from "react";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { db } from "../Firebase/FirebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import toast, { Toaster } from "react-hot-toast";

import { AuthContext } from "../Context/UserContext";
import WelcomePageBanner from "../images/WelcomePageBanner.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Profile() {
  const { User } = useContext(AuthContext);

  const [profilePic, setProfilePic] = useState("");
  const [newProfielPicURL, setNewProfielPicURL] = useState("");
  const [newProfielPic, setNewProfielPic] = useState("");
  const [isUserNameChanged, setIsUserNameChanged] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMyListUpdated, setisMyListUpdated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (User != null) {
      console.log(User.photoURL, "hello");
      setProfilePic(User.photoURL);
    }
  }, []);

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  function notify() {
    toast.success("  Data Updated Sucessfuly  ");
  }

  const handleFileChange = (event) => {
    const fileObj = event.target.files[0];
    setNewProfielPic(fileObj);
    setNewProfielPicURL(URL.createObjectURL(fileObj));
    if (!fileObj) {
      return;
    }
    console.log("fileObj is", fileObj);
    event.target.value = null;
  };

  const changeUserName = (e) => {
    e.preventDefault();
    if (isUserNameChanged) {
      if (userName !== "") {
        const auth = getAuth();
        updateProfile(auth.currentUser, { displayName: userName })
          .then(() => {
            notify();
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        setIsUserNameChanged(false);
      }
    }

    if (newProfielPic != "") {
      const storage = getStorage();
      const storageRef = ref(storage, `/ProfilePics/${User.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, newProfielPic);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          alert(error.message);
          alert(error.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url, "This is the new Url for Profile Pic");
            setProfilePic(url);
            const auth = getAuth();
            updateProfile(auth.currentUser, { photoURL: url })
              .then(() => {
                notify();
                setisMyListUpdated(true);
              })
              .catch((error) => {
                alert(error.message);
              });
          });
        }
      );
    }
  };

  const updateProfilePic = (imageURL) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageURL })
      .then(() => {
        setProfilePic(User.photoURL);
        notify();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const SignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div
        className="flex h-screen justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(0deg, hsl(0deg 0% 0% / 73%) 0%, hsl(0deg 0% 0% / 73%) 35%), url(${WelcomePageBanner})`,
        }}
      >
        {isMyListUpdated ? (
          <Toaster
            toastOptions={{
              style: {
                padding: "1.5rem",
                backgroundColor: "##f4fff4",
                borderLeft: "6px solid green",
              },
            }}
          />
        ) : null}
        <Fade>
          <div className="bg-[#000000bf] p-5 md:p-12 rounded-md">
            <h1 className="text-4xl text-white font-bold mb-4 md:mb-8">
              Edit your Profile
            </h1>
            <div className="flex justify-center flex-col items-center md:flex-row md:items-start">
              <img
                className={
                  profilePic
                    ? "h-28 w-28 rounded-full cursor-pointer mb-3 md:mr-16"
                    : "h-28 w-28 rounded-full cursor-pointer mb-3 md:mr-16"
                }
                src={
                  profilePic
                    ? `${profilePic}`
                    : `https://www.citypng.com/public/uploads/preview/profile-user-round-red-icon-symbol-download-png-11639594337tco5j3n0ix.png`
                }
                alt="NETFLIX"
              />
              <div>
                <hr className="mb-2 h-px bg-gray-500 border-0 dark:bg-gray-700"></hr>
                <h1 className="text-white text-lg font-medium mb-2">
                  User Name
                </h1>
                <input
                  type="text"
                  onChange={(e) =>
                    setUserName(e.target.value) || setIsUserNameChanged(true)
                  }
                  className="block w-full rounded-md bg-stone-900 text-white border-gray-300 p-2 mb-6 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                  placeholder={User ? User.displayName : null}
                />
                <h1 className="text-white text-lg font-medium mb-2">Email</h1>
                <h1 className="text-white text-xl bg-stone-900 p-2 rounded mb-4 md:pr-52">
                  {User ? User.email : null}
                </h1>
                <h1 className="text-white text-xl p-2 rounded mb-4">
                  Unique ID : {User ? User.uid : null}
                </h1>
                <hr className="h-px bg-gray-500 border-0 mb-4 md:mb-10 dark:bg-gray-700"></hr>

                <h1 className="text-white text-lg font-medium mb-4">
                  Who is Watching ?
                </h1>
                <div className="flex justify-between cursor-pointer mb-4 md:mb-8">
                  <img
                    onClick={() =>
                      updateProfilePic(
                        "https://i.pinimg.com/originals/ba/2e/44/ba2e4464e0d7b1882cc300feceac683c.png"
                      )
                    }
                    className="w-16 h-16 rounded-md cursor-pointer"
                    src="https://i.pinimg.com/originals/ba/2e/44/ba2e4464e0d7b1882cc300feceac683c.png"
                  />
                  <img
                    onClick={() =>
                      updateProfilePic(
                        "https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg"
                      )
                    }
                    className="w-16 h-16 rounded-md cursor-pointer"
                    src="https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg"
                  />
                  <img
                    onClick={() =>
                      updateProfilePic(
                        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                      )
                    }
                    className="w-16 h-16 rounded-md cursor-pointer"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                  />
                  <img
                    onClick={() =>
                      updateProfilePic(
                        "https://ih0.redbubble.net/image.618363037.0853/flat,1000x1000,075,f.u2.jpg"
                      )
                    }
                    className="w-16 h-16 rounded-md cursor-pointer"
                    src="https://ih0.redbubble.net/image.618363037.0853/flat,1000x1000,075,f.u2.jpg"
                  />
                  <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <svg
                    onClick={handleClick}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-stone-600 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                {newProfielPicURL ? (
                  <img className="h-30 w-72" src={newProfielPicURL} />
                ) : null}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={SignOut}
                className="flex items-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-14 md:px-24 md:text-xl  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
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
                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
                SignOut
              </button>
              {userName != "" || newProfielPic != "" ? (
                <button
                  onClick={changeUserName}
                  className="flex items-center bg-red-700 text-white font-medium sm:font-bold text-xs px-10 md:px-16 md:text-xl  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
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
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                  Save and continue
                </button>
              ) : (
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center bg-red-700 text-white font-medium sm:font-bold text-xs px-10 md:px-16 md:text-xl  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
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
              )}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Profile;
