import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import axios from "../axios";
import { API_KEY, imageUrl, imageUrl2 } from "../Constants/Constance";

import Navbar from "../componets/Header/Navbar";
import Footer from "../componets/Footer/Footer";
import useUpdateMylist from "../CustomHooks/useUpdateMylist";
import useUpdateLikedMovies from "../CustomHooks/useUpdateLikedMovies";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import usePlayMovie from "../CustomHooks/usePlayMovie";
import useUpdateWatchedMovies from "../CustomHooks/useUpdateWatchedMovies";

function Play() {
  const [urlId, setUrlId] = useState("");
  const [movieDetails, setMovieDetails] = useState({});
  const [isFromMyList, setIsFromMyList] = useState(false);
  const [isFromLikedMovies, setIsFromLikedMovies] = useState(false);
  const [isFromWatchedMovies, setIsFromWatchedMovies] = useState(false);
  const [moreTrailerVideos, setMoreTrailerVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const { addToMyList, removeFromMyList, PopupMessage } = useUpdateMylist();
  const { addToLikedMovies, removeFromLikedMovies, LikedMoviePopupMessage } =
    useUpdateLikedMovies();
  const { removeFromWatchedMovies, removePopupMessage } =
    useUpdateWatchedMovies();
  const { playMovie } = usePlayMovie();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state.From === "MyList") {
      setIsFromMyList(true);
    }
    if (location.state.From === "LikedMovies") {
      setIsFromLikedMovies(true);
    }
    if (location.state.From === "WatchedMovies") {
      setIsFromWatchedMovies(true);
    }

    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((responce) => {
        console.log(responce.data, "This is the data");
        if (responce.data.results.length !== 0) {
          setUrlId(responce.data.results[0]);
          setMoreTrailerVideos(responce.data.results);
        } else {
          console.log("Array Emptey");
        }
      });

    if (urlId === "") {
      axios
        .get(`/tv/${id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((responce) => {
          if (responce.data.results.length !== 0) {
            console.log(responce.data.results[0], "This is using find ");
            setUrlId(responce.data.results[0]);
            setMoreTrailerVideos(responce.data.results);
            console.log(moreTrailerVideos);
          } else {
            console.log("Array Emptey");
          }
        });
    }
    axios
      .get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((responce) => {
        console.log(responce.data, "Movie deatils");
        setMovieDetails(responce.data);
        console.log(responce.data.genres[0]);

        axios
          .get(
            `movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
          )
          .then((res) => {
            console.log(
              res.data.results.slice(0, 8),
              "ksdjfk ahdsfjksadhfjsdahf"
            );
            setSimilarMovies(res.data.results.slice(0, 8));
          });
      });
  }, []);

  return (
    <div>
      <Navbar playPage></Navbar>

      {PopupMessage}

      <div className="mt-12 h-[31vh] sm:h-[42vh] md:h-[45vh] lg:h-[55vh] lg:mt-0 xl:h-[98vh]">
        {urlId ? (
          <iframe
            width="100%"
            style={{ height: "inherit" }}
            src={`//www.youtube.com/embed/${urlId.key}?modestbranding=1&autoplay=1`}
            frameborder="0"
            allow="autoplay fullscreen"
            allowFullScreen
          ></iframe>
        ) : (
          <img src={`${imageUrl + movieDetails.backdrop_path}`} />
        )}
      </div>

      {movieDetails.id ? (
        <>
          {/* Movie details Section  */}
          <section
            style={{
              backgroundImage: `linear-gradient(90deg, #000000f0 0%, #000000e6 35%, #000000c3 100%), url(${
                imageUrl + movieDetails.backdrop_path
              })`,
            }}
            className="bg-cover bg-center object-contain flex flex-col p-5 sm:p-14 lg:flex-row lg:items-center lg:justify-center lg:gap-8 2xl:py-24"
          >
            <div className="lg:w-[45%]">
              <h1 className="text-white font-bold text-3xl mb-2">
                {movieDetails.original_title || movieDetails.title}
              </h1>
              <StarRatings
                rating={movieDetails.vote_average / 2}
                starRatedColor="red"
                numberOfStars={5}
                name="rating"
                starDimension="1rem"
                starSpacing="0.2rem"
              />
              <p className="text-neutral-400 mt-3">{movieDetails.overview}</p>
              <div className="bg-neutral-600 w-full h-[0.1rem] my-5"></div>

              <div className="hidden lg:grid">
                <h1 className=" text-red-700 ">
                  Released on :{" "}
                  <a className="text-white ml-1">
                    {movieDetails.release_date || movieDetails.air_date}
                  </a>
                </h1>
                <h1 className="text-red-700">
                  Language :{" "}
                  <a className="text-white ml-1">
                    {movieDetails.original_language}
                  </a>
                </h1>
                <h1 className="text-red-700">
                  Geners :{" "}
                  {movieDetails.genres &&
                    movieDetails.genres.map((gener) => {
                      return (
                        <>
                          <span className="text-white ml-2">{gener.name}</span>
                        </>
                      );
                    })}
                </h1>
                <div className="hidden lg:flex lg:mt-3">
                  {isFromMyList ? (
                    <button
                      onClick={() => removeFromMyList(movieDetails)}
                      className="group flex items-center border-[0.7px] border-white text-white font-medium sm:font-bold text-xs sm:text-lg sd:text-xl py-3 lg:px-10 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mt-4 mb-3 ease-linear transition-all duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 mr-1  ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Remove Movie
                    </button>
                  ) : isFromWatchedMovies ? (
                    <button
                      onClick={() => removeFromWatchedMovies(movieDetails)}
                      className="group flex items-center border-[0.7px] border-white text-white font-medium sm:font-semibold text-xs sm:text-lg lg:px-10 xl:font-bold py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mt-4 mb-3 ease-linear transition-all duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 mr-1  ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Remove Movie
                    </button>
                  ) : (
                    <button
                      onClick={() => addToMyList(movieDetails)}
                      className="group flex items-center border-[0.7px] border-white text-white font-medium sm:font-semibold text-xs sm:text-lg lg:px-10 xl:font-bold py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mt-4 mb-3 ease-linear transition-all duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1  ml-2 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
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
                      Add To My List
                    </button>
                  )}

                  {isFromLikedMovies ? (
                    <button
                      onClick={() => removeFromLikedMovies(movieDetails)}
                      className="border-white text-white p-4 rounded-full border-2 sm:ml-4 text-xs sm:mt-4 sm:text-lg md:text-xl shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mb-3 ease-linear transition-all duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToLikedMovies(movieDetails)}
                      className="border-white text-white p-4 rounded-full border-2 sm:ml-4 text-xs sm:mt-4 sm:text-lg md:text-xl shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mb-3 ease-linear transition-all duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="lg:hidden">
                <div>
                  <h1 className=" text-red-700 text-sm leading-7 sm:text-lg sm:leading-9 lg:text-2xl lg:leading-10">
                    Released on :{" "}
                    <a className="text-white ml-2">
                      {movieDetails.release_date || movieDetails.air_date}
                    </a>
                  </h1>
                  <h1 className=" text-red-700 text-sm leading-7 sm:text-lg sm:leading-9 lg:text-2xl lg:leading-10">
                    Language :{" "}
                    <a className="text-white ml-2">
                      {movieDetails.original_language}
                    </a>
                  </h1>
                  <h1 className="text-red-700 text-sm leading-7 sm:text-lg sm:leading-9 lg:text-2xl lg:leading-10">
                    Geners :{" "}
                    {movieDetails.genres &&
                      movieDetails.genres.slice(0, 2).map((gener) => {
                        return (
                          <>
                            <span className="text-white ml-2">
                              {gener.name}
                            </span>
                          </>
                        );
                      })}
                  </h1>
                </div>
                <div>
                  <button
                    onClick={() => addToMyList(movieDetails)}
                    className="group flex items-center justify-center w-full border-[0.7px] border-white text-white font-medium sm:font-bold text-xs sm:px-12 sm:text-lg md:px-16 sd:text-xl  py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mt-4 mb-3 ease-linear transition-all duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-1  ml-2 text-white hover:text-red-700 group-hover:text-red-700 ease-linear transition-all duration-150"
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
                    Add To My List
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="group flex items-center justify-center w-full bg-red-600 border-white text-white font-medium sm:font-bold text-xs sm:mt-4 sm:px-12 sm:text-lg md:px-16 md:text-xl py-3 rounded shadow hover:shadow-lg hover:bg-white hover:border-white hover:text-red-700 outline-none focus:outline-none mb-3 ease-linear transition-all duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2 ml-2"
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
              <img
                src={
                  movieDetails.poster_path &&
                  `${
                    imageUrl +
                    (window.innerWidth > 1024
                      ? movieDetails.backdrop_path
                        ? movieDetails.backdrop_path
                        : "https://i.ytimg.com/vi/Mwf--eGs05U/maxresdefault.jpg"
                      : movieDetails.poster_path)
                  }`
                }
                className="w-40 rounded-sm lg:w-[45rem] ml-4 lg:ml-0"
                alt=<img src="https://i.ytimg.com/vi/Mwf--eGs05U/maxresdefault.jpg" />
              />
            </div>
          </section>

          {/* Similar movies section */}
          {similarMovies.length !== 0 && (
            <section>
              <div className="flex flex-wrap justify-center bg-[#000000ac]">
                <div className="p-4 sm:p-14">
                  <h1 className="text-white text-4xl font-semibold my-10 border-l-4 border-red-800 pl-3">
                    Similar Movies
                  </h1>
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                    {similarMovies &&
                      similarMovies.map((similarMovie) => {
                        return (
                          <div class="max-w-sm shadow mb-4">
                            <img
                              src={
                                similarMovie.backdrop_path
                                  ? imageUrl2 + similarMovie.backdrop_path
                                  : "https://i.ytimg.com/vi/Mwf--eGs05U/maxresdefault.jpg"
                              }
                              alt=""
                              className="cursor-pointer"
                              onClick={() => {
                                playMovie(similarMovie);
                                window.location.reload(true);
                              }}
                            />
                            <div class="p-1">
                              <h5 class="mt-1 mb-2 text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white">
                                {similarMovie.original_title ||
                                  similarMovie.title}
                              </h5>
                              <div className="flex justify-between items-center text-white mb-1">
                                <div className="flex items-center">
                                  <div className="flex sm:flex-col">
                                    <h1 className="text-green-500 text-xs lg:text-base">
                                      {Math.floor(
                                        Math.random() * (100 - 60 + 1) + 60
                                      )}
                                      % match
                                    </h1>
                                    <h1 className="text-xs lg:text-base ml-2 sm:ml-0">
                                      {similarMovie.release_date ||
                                        (similarMovie.first_air_date &&
                                          similarMovie.release_date) ||
                                        similarMovie.first_air_date}
                                    </h1>
                                  </div>
                                  <h1 className="hidden sm:grid py-1 px-2 border-2 border-gray-800 rounded-md ml-2">
                                    HD
                                  </h1>
                                </div>
                                <div>
                                  <svg
                                    onClick={() => addToMyList(similarMovie)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-9 h-9 cursor-pointer hidden sm:grid"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <p class="mb-3 font-normal text-stone-400 line-clamp-3 text-xs sm:text-base">
                                {similarMovie.overview}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <div className="px-4 lg:px-10 xl:px-12 animate-pulse">
            <div className="w-72 mt-4 sm:ml-0 sm:w-96 py-5 mb-7 xl:py-7 xl:w-45rem bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-3 xl:py-2 bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-3 xl:py-2 bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-3 xl:py-2 bg-neutral-900 rounded-md"></div>
            <div className="w-full py-1 mb-8 xl:py-2 bg-neutral-900 rounded-md"></div>
          </div>
        </>
      )}
      <Footer></Footer>
    </div>
  );
}

export default Play;
