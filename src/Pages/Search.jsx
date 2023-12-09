import React from "react";
import { useState, useContext } from "react";
import { API_KEY, imageUrl2 } from "../Constants/Constance";
import { PopUpContext } from "../Context/moviePopUpContext";
import useUpdateMylist from "../CustomHooks/useUpdateMylist";
import axios from "../axios";
import MoviePopUp from "../componets/PopUp/MoviePopUp";
import usePlayMovie from "../CustomHooks/usePlayMovie";
import useUpdateLikedMovies from "../CustomHooks/useUpdateLikedMovies";
import useGenereConverter from "../CustomHooks/useGenereConverter";
import StarRatings from "react-star-ratings";

function Search() {
  const { showModal, setShowModal } = useContext(PopUpContext);
  const { addToMyList, PopupMessage } = useUpdateMylist();
  const { playMovie } = usePlayMovie();
  const { addToLikedMovies } = useUpdateLikedMovies();
  const { convertGenere } = useGenereConverter();

  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviePopupInfo, setMoviePopupInfo] = useState({});

  const Search = (e) => {
    setSearchQuery(e.target.value);
    e.preventDefault();
    console.log(searchQuery);

    axios
      .get(
        `/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      )
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      });

    if (searchQuery === "") {
      setMovies([]);
    }
  };

  const handleMoviePopup = (movieInfo) => {
    setMoviePopupInfo(movieInfo);
    setShowModal(true);
  };

  return (
    <div>
      {PopupMessage}

      <div className="flex justify-center mt-20 mb-8">
        <input
          onChange={Search}
          type="text"
          class="w-[60%] xl:w-1/4 bg-stone-700 text-white outline-none sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block p-2.5 placeholder:text-white"
          placeholder="Search for Movie name"
          required=""
        ></input>
        <button
          onClick={Search}
          class="flex items-center px-8 text-white bg-red-800 -ml-2 focus:outline-none focus:ring-primary-300 transition ease-in-out font-medium rounded text-sm py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 items-center text-white mt-auto mb-auto pr-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>{" "}
          Search
        </button>
      </div>

      {/* Search results */}
      <div className="grid-cols-2 grid p-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 md:p-5 space-y-1 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">
        {movies.length !== 0 ? (
          movies.map((movie) => {
            const converted = convertGenere(movie.genre_ids);
            return (
              <div className="p-1 mt-2 mb-5">
                <div class="hover:scale-105 hover:border-2 group relative block overflow-hidden rounded-sm transition-all duration-500">
                  <a
                    class="lightbox transition-all duration-500 group-hover:scale-105 tobii-zoom"
                    title=""
                  >
                    <img
                      onClick={() => handleMoviePopup(movie)}
                      className=""
                      src={
                        movie.backdrop_path
                          ? imageUrl2 + movie.backdrop_path
                          : "https://i.ytimg.com/vi/Mwf--eGs05U/maxresdefault.jpg"
                      }
                    />
                  </a>
                  <div
                    style={{
                      background:
                        "linear-gradient(0deg, hsl(0deg 0% 4% / 92%) 0%, hsl(0deg 0% 0% / 50%) 35%, hsl(220deg 26% 44% / 0%) 100%)",
                    }}
                    class="hidden xl:block absolute -bottom-52 group-hover:bottom-0 w-full transition-all duration-500 p-4 rounded"
                  >
                    <div className="flex mb-1 transition ease-in-out delay-150">
                      {/* Play Button */}
                      <div
                        onClick={() => playMovie(movie)}
                        className="text-white w-10 h-10 2xl:w-14 2xl:h-14 border-[2px] 2xl:border-[3px] rounded-full p-2 mr-2 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:border-red-600 hover:text-red-600"
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
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                          />
                        </svg>
                      </div>

                      {/* Like Button */}
                      <div
                        onClick={() => addToLikedMovies(movie)}
                        className="text-white w-10 h-10 2xl:w-14 2xl:h-14 border-[2px] 2xl:border-[3px] rounded-full p-2 mr-2 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:border-red-600 hover:text-red-600"
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

                      {/* Add to MyList Button */}
                      <div
                        onClick={() => addToMyList(movie)}
                        className="text-white w-10 h-10 2xl:w-14 2xl:h-14 border-[2px] 2xl:border-[3px] rounded-full p-2 mr-2 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:border-red-600 hover:text-red-600"
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
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>

                      {/* PopUp Button */}
                      <div
                        onClick={() => handleMoviePopup(movie)}
                        className="text-white w-10 h-10 2xl:w-14 2xl:h-14 border-[2px] 2xl:border-[3px] rounded-full p-2 mr-2 backdrop-blur-[1px] shadow-md ease-linear transition-all duration-150 hover:border-red-600 hover:text-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="text-shadow-xl"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </div>
                    </div>

                    <a class="hover:text-primary-600 text-shadow-xl shadow-red-700 text-white text-base 2xl:text-2xl transition duration-500 font-medium">
                      {movie.name || movie.title}
                    </a>

                    <br></br>
                    <StarRatings
                      rating={movie.vote_average / 2}
                      starRatedColor="red"
                      numberOfStars={5}
                      name="rating"
                      starDimension="1.2rem"
                    />
                    <br></br>
                    <div className="mt-1">
                      {converted &&
                        converted.map((genre) => {
                          return (
                            <span className="text-white mr-4 text-xs  2xl:text-sm font-thin">
                              {genre}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div>
              <div className="w-[100vw] h-[70vh] flex justify-center items-center">
              </div>
            </div>
          </>
        )}
      </div>

      {showModal ? <MoviePopUp data1={moviePopupInfo} /> : null}
    </div>
  );
}

export default Search;
