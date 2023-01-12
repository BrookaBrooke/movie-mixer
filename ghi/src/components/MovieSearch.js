import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieSearch() {
  const { searchQuery, pageNumber } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(pageNumber);
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState(1);

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

  function posterMovieDetail(poster_path) {
    return navigate(`/movie/detail/${poster_path}`);
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (pageNum === undefined) {
      setPageNum(1);
    }
    console.log(movies);
    return navigate(`/search/${query}/1`);
  }

  const movieList =
    results > 0
      ? movies.map((result) => (
          <div className="col-sm-3" key={result.id} value={result.id}>
            <div
              className="d-flex justify-content-center"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#movieModal"
            >
              <img
                className="rounded
              "
                src={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/w185${result.poster_path}`
                    : `https://via.placeholder.com/185x276/FFFFFF/000000/?text=No%20Image%20Available`
                }
              />
            </div>
            <div className="row">
              <div className="col-sm text-center text-light m-3">
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
    <div className="bg-dark">
      <div className="container">
        <form
          className="d-flex justify-content-center"
          role="search"
          onSubmit={onSubmit}
        >
          <div className="container w-50 d-flex justify-content-center">
            <input
              className="form-control m-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
              required
              onChange={onChange}
            />
            <button value={query} className="btn btn-danger m-3" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="text-center text-light m-3">
          Found {results} results matching your search
        </div>
        <div className="row">{movieList}</div>
        <div
          class="modal fade"
          id="movieModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

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
    </div>
  );
}
export default MovieSearch;
