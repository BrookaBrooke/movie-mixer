import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const MovieDetail = () => {
  const [details, setDetails] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [movieId, setMovieId] = useState();

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
          setMovieId(movieData.id);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (movieExistResponse.status === 200) {
      const movieExistData = await movieExistResponse.json();
      setMovieId(movieExistData.id);
    }
    const movie_item = {
      movie_id: movieId,
      movie_group_id: 1,
      item_position: 1,
      // Last two are placeholders for now
    };
    try {
      await fetch(`http://localhost:8000/movie-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie_item),
      });
    } catch (error) {
      console.error(error);
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
          <div id="poster-detail" className="col align-self-end pt-5">
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
            />
            <div className="d-flex justify-content-center pt-4">
              <button
                className="btn btn-outline-info btn-lg"
                type="button"
                onClick={() => handleCreateMovie(details)}
              >
                Add to List
              </button>
            </div>
          </div>
          <div className="col align-self-end pb-5">
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
