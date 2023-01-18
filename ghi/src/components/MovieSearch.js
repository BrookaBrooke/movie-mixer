import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

function MovieSearch() {
  const { searchQuery, pageNumber } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [pageNum, setPageNum] = useState(pageNumber);
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState();

  const [details, setDetails] = useState([]);
  const [movieCreated, setMovieCreated] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(1);
  const [movieGroups, setMovieGroups] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const [token] = useContext(UserContext);

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

  async function getMovies(modalId) {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/detail/${modalId}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setDetails(data);
    }
  }

  useEffect(() => {
    async function fetchMovieGroups() {
      const response = await fetch(
        `http://localhost:8000/movie-groups-by-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setMovieGroups(data);
    }
    fetchMovieGroups();
  }, []);

  useEffect(() => {
    if (movieCreated) {
      handleCreateMovie(details, token);
      setMovieCreated(false);
    }
  }, [movieCreated]);

  const handleGroupSelection = (event) => {
    setSelectedGroupId(Number(event.target.getAttribute("value")));
  };

  const createMovieItem = async (movieItem, token) => {
    let data;
    try {
      const response = await fetch(
        `http://localhost:8000/movie_items/${selectedGroupId}`
      );
      data = await response.json();
    } catch (error) {
      console.error(error);
      return;
    }
    let movieItemExists = false;
    for (let item of data) {
      if (item.movie_id === movieItem.movie_id) {
        alert("Movie is already in this list!");
        movieItemExists = true;
        break;
      }
    }
    if (!movieItemExists) {
      try {
        await fetch(`http://localhost:8000/movie_items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movieItem),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateMovie = async (details, token) => {
    const movie_details = {
      title: details.title,
      released: details.release_date,
      plot: details.overview,
      imdbID: details.imdb_id,
      poster: details.poster_path,
      vote_avr: details.vote_average,
      api3_id: details.id,
    };

    const movieExistResponse = await fetch(
      `http://localhost:8000/movies/${details.imdb_id}`
    );

    if (movieExistResponse.status === 404) {
      try {
        const response = await fetch(`http://localhost:8000/movies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(movie_details),
        });
        if (response.ok) {
          const movieData = await response.json();
          createMovieItem(
            {
              movie_id: movieData.id,
              movie_group_id: selectedGroupId,
              item_position: 0,
            },
            token
          );
        }
      } catch (error) {
        console.error(error);
      }
    } else if (movieExistResponse.status === 200) {
      const movieExistData = await movieExistResponse.json();
      createMovieItem(
        {
          movie_id: movieExistData.id,
          movie_group_id: selectedGroupId,
          item_position: 0,
        },
        token
      );
    }
  };

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
                onClick={(e) => getMovies(modalId)}
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
                  className={`modal ${modalOpen ? "show" : ""}`}
                  id={modalId}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div
                      className="modal-content bg-dark"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="modal-header text-center text-light">
                        <h5
                          className="modal-title w-100"
                          id="exampleModalLabel"
                        >
                          {result.title}
                        </h5>
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
                          data-bs-dismiss="modal"
                          onClick={() => {
                            goToMovieDetail(result.id);
                          }}
                        >
                          View more details
                        </button>
                        {token !== "null" ? (
                          <Dropdown>
                            <Dropdown.Toggle
                              as={Button}
                              className="btn btn-outline-success bg-transparent"
                              id="dropdown-basic"
                            >
                              Add to List
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {movieGroups.map((movieGroup) => (
                                <Dropdown.Item
                                  key={movieGroup.id}
                                  onClick={(event) => {
                                    setMovieCreated(true);
                                    handleGroupSelection(event);
                                  }}
                                  value={movieGroup.id}
                                >
                                  {movieGroup.name}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : null}
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
