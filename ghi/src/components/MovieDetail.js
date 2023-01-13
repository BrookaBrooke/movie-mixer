import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const MovieDetail = () => {
  const [details, setDetails] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [movieCreated, setMovieCreated] = useState(false);
  // const [movieItemExists, setMovieItemExists] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getMovies() {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/detail/${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        setDetails(data);
        setLoaded(false);
      }
    }
    getMovies();
  }, []);

  useEffect(() => {
    if (movieCreated) {
      handleCreateMovie(details);
      setMovieCreated(false);
    }
  }, [movieCreated]);

  const createMovieItem = async (movieItem) => {
    let data;
    try {
      const response = await fetch(`http://localhost:8000/movie-items`);
      data = await response.json();
    } catch (error) {
      console.error(error);
      return;
    }
    let movieItemExists = false;
    for (let item of data) {
      if (
        item.movie_id === movieItem.movie_id &&
        item.movie_group_id === movieItem.movie_group_id
      ) {
        alert("Movie is already in list!");
        movieItemExists = true;
        break;
      }
    }
    if (!movieItemExists) {
      try {
        console.log(movieItem);
        await fetch(`http://localhost:8000/movie-items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieItem),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateMovie = async (details) => {
    const movie_details = {
      title: details.title,
      release_date: details.release_date,
      overview: details.overview,
      imdb_id: details.imdb_id,
      poster_path: details.poster_path,
      vote_average: details.vote_average,
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
          },
          body: JSON.stringify(movie_details),
        });
        if (response.ok) {
          const movieData = await response.json();
          createMovieItem({
            movie_id: movieData.id,
            movie_group_id: 1,
            item_position: 0,
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else if (movieExistResponse.status === 200) {
      const movieExistData = await movieExistResponse.json();
      createMovieItem({
        movie_id: movieExistData.id,
        movie_group_id: 1,
        item_position: 0,
      });
    }
  };

  if (loaded) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const divStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, .6), rgba(0, 0, 0, .4)), url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`,
  };

  return (
    <div className="banner" style={divStyle}>
      <div className="container-fluid">
        <div className="row text-center">
          <div id="poster-detail" className="col-auto align-self-end pt-2">
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/w400${details.poster_path}`}
            />

            <div className="d-flex justify-content-center p-4">
              <button
                className="btn btn-outline-info btn-lg"
                type="button"
                onClick={() => setMovieCreated(true)}
              >
                Add to List
              </button>
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
              Rating: {details.vote_average?.toFixed(1)}{" "}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

// .toFixed(1)

{
  /* <div id="back-drop">
          <img style={background-image}: {`https://image.tmdb.org/t/p/w500${details.backdrop_path}`} />
        </div> */
}

//   <div className='background-image' style ={ { backgroundImage: `url({https://image.tmdb.org/t/p/w500${details.backdrop_path})` } }>
// </div>
