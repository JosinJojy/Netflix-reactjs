import React, { useState, useEffect, useContext } from "react";
import { Fade } from "react-reveal";
import StarRatings from "react-star-ratings";
import { imageUrl } from "../../Constants/Constance";
import { PopUpContext } from "../../Context/moviePopUpContext";
import useUpdateMylist from "../../CustomHooks/useUpdateMylist";
import usePlayMovie from "../../CustomHooks/usePlayMovie";
import useGenereConverter from "../../CustomHooks/useGenereConverter";
import useUpdateLikedMovies from "../../CustomHooks/useUpdateLikedMovies";
import useUpdateWatchedMovies from "../../CustomHooks/useUpdateWatchedMovies";

function MoviePopUp(props) {
  const { showModal, setShowModal } = useContext(PopUpContext);
  const { addToMyList, removeFromMyList, PopupMessage } = useUpdateMylist();
  const { addToLikedMovies, removeFromLikedMovies, LikedMoviePopupMessage } = useUpdateLikedMovies();
  const { removeFromWatchedMovies, removePopupMessage } =
    useUpdateWatchedMovies();
  const { playMovie } = usePlayMovie();
  const { convertGenere } = useGenereConverter();

  const [PopupInfo, setPopupInfo] = useState({});

  useEffect(() => {
    setPopupInfo(props.data1);
  }, []);

  return (
    <>
      {PopupMessage}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mt-24 sm:my-6 mx-4 max-w-3xl">
              {/*content*/}
              <Fade bottom duration={500}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral-800 outline-none focus:outline-none">
                  {/*header*/}
                  <button
                    className="group p-1 ml-2 mt-2 backdrop-blur-[20px] bg-transparent border-2 border-white hover:bg-white hover:text-black fixed right-4 rounded-full cursor-pointer float-right font-semibold outline-none focus:outline-none ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="text-white w-6 h-6 group-hover:text-black ease-linear transition-all duration-150"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {/*Movie Trailer or Image*/}
                  {PopupInfo.backdrop_path ? (
                    <img src={`${imageUrl + PopupInfo.backdrop_path}`} />
                  ) : null}

                  <div className="flex ml-4 items-center -mt-14">
                    <button
                      className="flex items-center justify-center bg-red-800 text-white active:bg-red-800 font-medium sm:font-bold uppercase text-xs px-4 sm:px-6 md:text-sm  py-2 rounded shadow hover:shadow-lg cursor-pointer outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        playMovie(PopupInfo);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1 text-white hover:text-gray-300 ease-linear transition-all duration-150"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Play
                    </button>
                    {props.from === "LikedMovies" ? (
                      <div
                        onClick={() => removeFromLikedMovies(PopupInfo)}
                        className="text-white w-10 h-10 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] hover:bg-white hover:text-black shadow-md cursor-pointer ease-linear transition-all duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div
                        onClick={() => addToLikedMovies(PopupInfo)}
                        className="text-white w-10 h-10 border-[2px] rounded-full p-2 mr-1 backdrop-blur-[1px] hover:bg-white hover:text-black shadow-md cursor-pointer ease-linear transition-all duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <Fade bottom>
                    <div className="p-5 py-4 -mb-6 mt-2 sm:mb-0 sm:mt-0 sm:py-0 sm:pt-6 rounded-t">
                      <h3 className="text-3xl font-semibold text-white">
                        {PopupInfo.title || PopupInfo.name}
                      </h3>
                      <h1 className="text-green-700 font-bold mt-2">
                        {PopupInfo.release_date}
                      </h1>
                    </div>
                  </Fade>
                  {/*body*/}
                  <Fade bottom>
                    <div className="relative p-4 sm:p-6 flex-auto">
                      <div className="bg-neutral-700 h-[0.125rem]"></div>
                      <p className="my-4 sm:my-7 text-neutral-400 text-xs md:text-lg leading-relaxed line-clamp-4 sm:line-clamp-none">
                        {PopupInfo.overview}
                      </p>
                      <div className="bg-neutral-700 h-[0.125rem]"></div>
                    </div>
                  </Fade>
                  {/*footer*/}
                  <div className="sm:flex items-center justify-end p-2 rounded-b">
                    {/*More Info*/}
                    <Fade bottom>
                      <div className="relative p-2 py-5 sm:p-6 flex-auto">
                        <h1 className="flex -mt-4 text-neutral-400 text-sm leading-relaxed">
                          Rating :
                          <div className="ml-2">
                            {PopupInfo.vote_average && (
                              <StarRatings
                                rating={PopupInfo.vote_average / 2}
                                starRatedColor="red"
                                numberOfStars={5}
                                name="rating"
                                starDimension="1rem"
                                starSpacing="0.2rem"
                              />
                            )}
                          </div>
                        </h1>
                        <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                          Released on :{"  "}
                          <p className="text-white ml-2 font-medium">
                            {PopupInfo.release_date || PopupInfo.first_air_date}
                          </p>
                        </h1>
                        <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                          Language :
                          <p className="text-white ml-2 font-medium">
                            {PopupInfo.original_language}
                          </p>
                        </h1>

                        <h1 className="flex text-neutral-400 text-sm leading-relaxed">
                          Genere :
                          {PopupInfo.genre_ids &&
                            convertGenere(PopupInfo.genre_ids).map((genere) => {
                              return (
                                <span className="text-white ml-2 font-medium">
                                  {genere}
                                </span>
                              );
                            })}
                        </h1>
                      </div>
                    </Fade>

                    <div className="flex justify-between p-2">
                      {props.from === "MyList" ? (
                        <button
                          className="group flex items-center justify-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-4 mr-4 sm:px-6 md:text-sm  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => removeFromMyList(PopupInfo)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6 mr-1 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Remove from MyList
                        </button>
                      ) : (
                        <>
                          {props.from === "WatchedMovies" ? (
                            <button
                              className="group flex items-center justify-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-4 mr-4 sm:px-6 md:text-sm  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => removeFromWatchedMovies(PopupInfo)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 mr-1 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Remove from Watched List
                            </button>
                          ) : (
                            <button
                              className="group flex items-center justify-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs px-4 mr-4 sm:px-6 md:text-sm  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:text-red-700 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => addToMyList(PopupInfo)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-1 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
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
                              Add to MyList
                            </button>
                          )}
                        </>
                      )}

                      <button
                        className="flex items-center text-red-500 background-transparent font-medium sm:font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default MoviePopUp;
