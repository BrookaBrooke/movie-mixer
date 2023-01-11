import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieSearch() {
  const { searchQuery, pageNumber } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(pageNumber);
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState();

  useEffect(() => {
    const getResults = async () => {
      const response = await fetch(
        `http://localhost:8000/api-movies/search/${searchQuery}?page_num=${pageNumber}`
      );
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
      setResults(data.total_results);
    };
    if (searchQuery && pageNumber) {
      getResults();
    }
  }, [searchQuery, pageNumber]);

  function onChange(event) {
    setQuery(event.target.value);
  }

  function lastPage() {
    console.log("lastPage called");
    const number = parseInt(pageNumber) - 1;
    return navigate(`/search/${searchQuery}/${number}`);
  }
  function nextPage() {
    console.log("nextPage called");
    const number = parseInt(pageNumber) + 1;
    return navigate(`/search/${searchQuery}/${number}`);
  }

  function goToMovieDetail(id) {
    return navigate(`/movie-detail/${id}`);
  }
  async function onSubmit(event) {
    event.preventDefault();
    if (pageNum === undefined) {
      setPageNum(1);
    }
    return navigate(`/search/${query}/1`);
  }

  const movieList = movies
    ? movies.map((result) => (
        <div className="col-sm-3" key={result.id} value={result.id}>
          <div className="d-flex justify-content-center">
            <img
              src={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/w185${result.poster_path}`
                  : null
              }
            />
          </div>
          <div className="row">
            <div className="col-sm d-flex justify-content-center m-3">
              {result.title}{" "}
            </div>
          </div>
          <div className="col-sm d-flex justify-content-center m-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => goToMovieDetail(result.id)}
            >
              View Details
            </button>
          </div>
        </div>
      ))
    : null;

  return (
    <div className="container">
      <form
        className="d-flex justify-content-center"
        role="search"
        onSubmit={onSubmit}
      >
        <input
          className="form-control me-2 m-5"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={onChange}
        />
        <button value={query} className="btn btn-danger m-5" type="submit">
          Search
        </button>
      </form>
      <div className="row">{movieList}</div>

      {pageNumber ? (
        <>
          {pageNumber > 1 ? (
            <div className="p-2 d-flex justify-content-center">
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={lastPage}
              >
                Previous Page
              </button>
            </div>
          ) : null}
          {results / pageNumber > 20 ? (
            <div className="p-2 d-flex justify-content-center">
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={nextPage}
              >
                Next Page
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
export default MovieSearch;
