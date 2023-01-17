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
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/search/${searchQuery}?page_num=${pageNumber}`
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
      ? movies.map((result) => {
          const modalId = result.id;
          const target = "#" + modalId;

          return (
            <div className="col-sm-3" key={result.id} value={result.id}>
              <div
                className="d-flex justify-content-center"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={target}
              >
                <img
                  className="search-poster-image"
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/w185${result.poster_path}`
                      : `https://via.placeholder.com/185x276/FFFFFF/000000/?text=No%20Image%20Available`
                  }
                />
                <div
                  className="modal fade"
                  id={modalId}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content bg-dark">
                      <div className="modal-header text-light">
                        <button
                          type="button"
                          className="close btn btn-outline-secondary"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body text-light d-flex justify-content-center">
                        {" "}
                        <img
                          className="search-poster-image"
                          src={
                            result.poster_path
                              ? `https://image.tmdb.org/t/p/w185${result.poster_path}`
                              : `https://via.placeholder.com/185x276/FFFFFF/000000/?text=No%20Image%20Available`
                          }
                        />
                      </div>
                      <div className="text-light text-center">
                        <p>{result.title}</p>
                        <p>
                          Released on:{" "}
                          {result.release_date
                            ? result.release_date
                            : "Unknown"}
                        </p>
                      </div>
                      <div className="modal-footer d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => goToMovieDetail(result.id)}
                        >
                          View more details
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-success"
                        >
                          Add to list
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm text-center text-light m-3">
                  {result.title}
                </div>
              </div>
            </div>
          );
        })
      : null;

  return (
    <div className="banner-search">
      <div className="">
        <div className="search-bar-height"></div>
        <div className="container search-bar">
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
              <button
                value={query}
                className="btn btn-danger m-3"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
          <div className="text-center text-light m-3">
            {results !== undefined ? (
              <p>Found {results} results matching your search</p>
            ) : null}
          </div>
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
      </div>
    </div>
  );
}
export default MovieSearch;
