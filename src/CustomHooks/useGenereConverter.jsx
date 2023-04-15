import { genresList } from "../Constants/Constance";

const useGenereConverter = () => {
  const convertGenere = (genreIds) => {
    const genresConvertedList = [];
    genreIds
      .slice(0, 3)
      .map((genreId) =>
        genresList
          .filter((el) => el.id === genreId)
          .map((el) => genresConvertedList.push(el.name))
      );

    return genresConvertedList;
  };

  return { convertGenere };
};

export default useGenereConverter;
