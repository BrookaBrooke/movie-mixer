import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Button, Dropdown, Modal, Alert } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

import SwiperCore, { Grid, Pagination } from "swiper";

SwiperCore.use([Pagination]);

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
  const [loading, setLoading] = useState(true);

  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorAlert] = useState(false);

  const [token] = useContext(UserContext);

  useEffect(() => {
    let now = new Date();
    if (new Date(localStorage.getItem("loginExp")) < new Date(now.getTime())) {
      console.log(
        "token has expired -------------------------------------------------------"
      );
      localStorage.setItem("loginExp", "null");
      navigate("/logout");
    }
    const getResults = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/search/${searchQuery}?page_num=${pageNumber}`
      );
      const data = await response.json();
      if (response.ok) {
        setMovies(data.results);
        setResults(data.total_results);
      }
    };
    if (searchQuery && pageNumber) {
      getResults();
      setTimeout(() => {
        setLoading(false);
      }, 300);
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
      if (token !== "null") {
        const response = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups-by-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMovieGroups(data);
        }
      }
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
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items/${selectedGroupId}`
      );
      data = await response.json();
    } catch (error) {
      console.error(error);
      return;
    }
    let movieItemExists = false;
    for (let item of data) {
      if (item.movie_id === movieItem.movie_id) {
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 5000);
        movieItemExists = true;
        break;
      }
    }
    if (!movieItemExists) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(movieItem),
          }
        );
        if (response.ok) {
          setSuccessAlert(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateMovie = async (details, token) => {
    const movie_details = {
      title: details.title,
      released: details.release_date ? details.release_date : null,
      plot: details.overview,
      imdbID: details.imdb_id,
      poster: details.poster_path,
      vote_avr: details.vote_average,
      api3_id: details.id,
    };

    const movieExistResponse = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movies/${details.imdb_id}`
    );

    if (movieExistResponse.status === 404) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movies`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(movie_details),
          }
        );
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

  function LastPageButton() {
    function goToLastPage() {
      const number = parseInt(pageNumber) - 1;
      swiper.slideTo(0, 500);
      setLoading(true);
      return navigate(`/search/${searchQuery}/${number}`);
    }
    const swiper = useSwiper();

    return <Button onClick={goToLastPage}>Load Previous Movies</Button>;
  }
  function NextPageButton() {
    function goToNextPage() {
      const number = parseInt(pageNumber) + 1;
      swiper.slideTo(0, 500);
      setLoading(true);
      return navigate(`/search/${searchQuery}/${number}`);
    }
    const swiper = useSwiper();

    return <Button onClick={goToNextPage}>Load More Movies</Button>;
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

  const movieList =
    results > 0
      ? movies.map((result) => {
          const modalId = result.id;
          const target = "#" + modalId;

          return (
            <SwiperSlide key={result.id} value={result.id}>
              <div
                className="d-flex justify-content-center modal-container"
                onClick={(e) => getMovies(modalId)}
              >
                <img
                  className="search-poster-image"
                  src={
                    result.poster_path
                      ? `https://image.tmdb.org/t/p/w400${result.poster_path}`
                      : `https://via.placeholder.com/300x450/FFFFFF/000000/?text=No%20Image%20Available`
                  }
                  onClick={() => {
                    setModalOpen(modalId);
                  }}
                />
                <Modal
                  show={modalId == modalOpen}
                  onHide={() => {
                    setModalOpen(null);
                    setSuccessAlert(false);
                    setErrorAlert(false);
                  }}
                  contentClassName="bg-dark text-light text-center"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id={modalId}>{result.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{result.overview}</Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setModalOpen(null)}
                      className="btn-secondary bg-transparent"
                    >
                      Close
                    </Button>
                    <Button onClick={() => goToMovieDetail(result.id)}>
                      View more details
                    </Button>
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
                          {movieGroups.length > 0 ? (
                            movieGroups.map((movieGroup) => (
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
                            ))
                          ) : (
                            <div className="text-center p-3">
                              <p>You have no movie groups.</p>
                              <NavLink
                                className="btn btn-primary"
                                to="/my-groups"
                              >
                                Click here to make one!
                              </NavLink>
                            </div>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <NavLink
                        className="btn btn-outline-success bg-transparent"
                        to={"/login"}
                      >
                        Login to add to list
                      </NavLink>
                    )}
                  </Modal.Footer>
                  <Alert
                    show={showSuccessAlert}
                    variant="success"
                    className="m-3"
                    onClose={() => setSuccessAlert(false)}
                    dismissible
                  >
                    <p>Movie has been successfully added to list</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                      <NavLink className="btn btn-primary" to="/my-groups">
                        View my lists
                      </NavLink>
                    </div>
                  </Alert>
                  <Alert show={showErrorAlert} variant="danger" className="m-3">
                    <p>Movie is already in this list!</p>
                  </Alert>
                </Modal>
              </div>
              <div>
                <div className="text-center text-light">{result.title}</div>
              </div>
            </SwiperSlide>
          );
        })
      : null;

  const currentResults =
    results / pageNumber > 20
      ? `${20 * (pageNumber - 1) + 1} - ${pageNumber * 20}`
      : `${20 * (pageNumber - 1) + 1} - ${results}`;

  return (
    <div className="banner-search-page">
      <div className="">
        <div className="search-bar-height"></div>
        <div className="search-bar">
          <form
            className="d-flex justify-content-center"
            role="search"
            onSubmit={onSubmit}
          >
            <div className="w-75 d-flex justify-content-center">
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
        </div>
        <div className="text-center text-light m-3">
          {results !== undefined ? (
            results !== 0 ? (
              <>
                <p>
                  Showing {currentResults} of {results} results
                </p>
                <h1 className="text-light text-center">Swipe to see results</h1>
              </>
            ) : (
              <p>There are no results that match your search query</p>
            )
          ) : null}
        </div>

        <Swiper
          modules={[Grid]}
          slidesPerView={4}
          slidesPerGroup={2}
          spaceBetween={0}
          grid={{ rows: 2, fill: "row" }}
          pagination={{
            clickable: true,
          }}
          className={loading ? "d-none" : ""}
        >
          {movieList}
          {pageNumber ? (
            <div className="d-flex justify-content-center p-5">
              {pageNumber > 1 ? (
                <div className="p-2 d-flex justify-content-center">
                  <LastPageButton />
                </div>
              ) : null}
              {results / pageNumber > 20 ? (
                <div className="p-2 d-flex justify-content-center">
                  <NextPageButton />
                </div>
              ) : null}
            </div>
          ) : null}
        </Swiper>
        <div className="d-flex justify-content-center p-5">
          <div
            className={loading ? "spinner-border text-light" : "d-none"}
            role="status"
            style={{ height: "10em", width: "10em", alignSelf: "center" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieSearch;
