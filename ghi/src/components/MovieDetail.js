import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

const MovieDetail = () => {
  const [details, setDetails] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [movieCreated, setMovieCreated] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(1);
  const [movieGroups, setMovieGroups] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [token] = useContext(UserContext);

  const createMovieItem = useCallback(
    async (movieItem, token) => {
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
          alert("Movie is already in this list!");
          movieItemExists = true;
          break;
        }
      }
      if (!movieItemExists) {
        try {
          await fetch(
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
        } catch (error) {
          console.error(error);
        }
      }
    },
    [selectedGroupId]
  );

  const handleCreateMovie = useCallback(
    async (details, token) => {
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
    },
    [createMovieItem, selectedGroupId]
  );

  useEffect(() => {
    let now = new Date();
    if (new Date(localStorage.getItem("loginExp")) < new Date(now.getTime())) {
      localStorage.setItem("loginExp", "null");
      navigate("/movie-mixer/logout");
    }
    async function getMovies() {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/detail-with-trailer/${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        setDetails(data);
        setLoaded(false);
      }
    }
    getMovies();
  }, [id, navigate]);

  useEffect(() => {
    async function fetchMovieGroups() {
      if (token !== "null") {
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
    }
    fetchMovieGroups();
  }, [token]);

  useEffect(() => {
    if (movieCreated) {
      handleCreateMovie(details, token);
      setMovieCreated(false);
    }
  }, [handleCreateMovie, movieCreated, details, token]);

  const handleGroupSelection = (event) => {
    setSelectedGroupId(Number(event.target.getAttribute("value")));
  };

  if (loaded) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const divStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, .6), rgba(0, 0, 0, .4)), url(${
      details.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`
        : null
    })`,
  };

  return (
    <div className="banner" style={divStyle}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div id="poster-detail" className="col-auto px-5 mb-4">
            <img
              className="poster-image"
              style={{ height: "575px", width: "400px" }}
              src={
                details.poster_path
                  ? `https://image.tmdb.org/t/p/w400${details.poster_path}`
                  : `https://static.vecteezy.com/system/resources/previews/007/126/739/original/question-mark-icon-free-vector.jpg`
              }
              alt="detail"
            />

            <div className="d-flex justify-content-center pt-4">
              {token !== "null" ? (
                <Dropdown>
                  <Dropdown.Toggle
                    className="btn btn-outline-info btn-lg bg-transparent"
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
              ) : (
                <NavLink
                  className="btn btn-outline-success bg-transparent"
                  to={"/movie-mixer/login"}
                >
                  Login to add to list
                </NavLink>
              )}
            </div>
          </div>
          <div id="genres-div" className="col-auto align-self-center pb-1">
            <h1 id="detail-text"> {details.title} </h1>
            <div className="genres">
              {details.genres?.map((genre) => {
                return (
                  <span className="genres__item" key={genre.id}>
                    {genre.name}
                  </span>
                );
              })}
            </div>
            <p id="detail-text">{details.overview}</p>
            <h4 id="detail-text"> Released: {details.release_date} </h4>
            <h4 id="detail-text">
              {" "}
              Rating:{" "}
              {details.vote_average > 0
                ? details.vote_average.toFixed(1)
                : "N/A"}
            </h4>
          </div>
        </div>
      </div>

      {details.trailer ? (
        <div className="detail-trailer">
          <h1 className="trailer-text">Watch the Trailer</h1>
          <ReactPlayer
            className="video"
            url={`https://www.youtube.com/embed/${details.trailer.key}`}
            width="720px"
            height="405px"
            margin="auto"
            pip={true}
            playing={false}
            loop={true}
            muted={false}
            controls={true}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetail;
