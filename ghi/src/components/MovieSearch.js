import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState();
  const [movies, setMovies] = useState([]);

  const { searchQuery, pageNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getResults = async () => {
      const response = await fetch(
        `http://localhost:8000/api-movies/search/${searchQuery}?page_num=${pageNumber}`
      );
      const data = await response.json();
      console.log(data);
      setMovies(data.Search);
    };
    if (searchQuery && pageNumber) {
      getResults();
    }
  }, [searchQuery, pageNumber]);

  async function onChange(event) {
    setQuery(event.target.value);
  }
  async function lastPage() {
    setPageNum(pageNum - 1);
    return navigate(`/search/${searchQuery}/${pageNum}`);
  }
  async function nextPage() {
    setPageNum(pageNum + 1);
    return navigate(`/search/${searchQuery}/${pageNum}`);
  }
  async function onSubmit(event) {
    event.preventDefault();
    if (pageNum === undefined) {
      setPageNum(1);
    }
    return navigate(`/search/${query}/${pageNum}`);
  }

  const movieList = movies
    ? movies.map((result) => (
        <div className="col-12">
          <div className="card">
            <img src={result.Poster} />
          </div>
          {result.Title}
        </div>
      ))
    : null;

  return (
    <div>
      <form className="d-flex offset-8" role="search" onSubmit={onSubmit}>
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
      <div className="row w-25">{movieList}</div>

      {pageNumber ? (
        <>
          {pageNumber > 1 ? (
            <div className="p-2">
              <button
                className="btn btn-outline-primary"
                type="submit"
                onClick={lastPage}
              >
                Previous Page
              </button>
            </div>
          ) : null}
          <div className="p-2">
            <button
              className="btn btn-outline-primary"
              type="submit"
              onClick={nextPage}
            >
              Next Page
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
export default MovieSearch;
