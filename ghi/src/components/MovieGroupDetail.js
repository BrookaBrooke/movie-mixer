import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MovieGroupDetail = () => {
  const [movieGroup, setMovieGroup] = useState(null);
  const [movieItems, setMovieItems] = useState([]);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const handleDeleteMovie = async (movieId) => {
    try {
      await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items/${id}/movie/${movieId}`,
        {
          method: "DELETE",
        }
      );
      setMovies(movies.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMovieGroups = async () => {
      try {
        const movieGroupsResponse = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie-groups/${id}`
        );
        const movieGroupData = await movieGroupsResponse.json();
        setMovieGroup(movieGroupData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieGroups();
  }, [id]);

  useEffect(() => {
    if (!movieGroup) {
      return;
    }
    const fetchMovieItems = async () => {
      try {
        const movieItemsResponse = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movie_items/${id}`
        );
        const movieItemsData = await movieItemsResponse.json();
        setMovieItems(movieItemsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieItems();
  }, [movieGroup, id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieIdList = movieItems.map((item) => item.movie_id);
        const movieList = [];
        for (let movie_id of movieIdList) {
          let movieResponse = await fetch(
            `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/movies/id/${movie_id}`
          );
          const movieData = await movieResponse.json();
          movieList.push(movieData);
        }
        setMovies(movieList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
    setLoading(false);
  }, [movieItems]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mb-3">{movieGroup && movieGroup.name}</h1>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Title</th>
            <th>Released</th>
            <th>Plot</th>
            <th>Rated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <Link
                  className="text-secondary text-decoration-none h5"
                  to={`/movie-detail/${movie.imdbID}`}
                >
                  {movie.title}
                </Link>
              </td>
              <td>{movie.released}</td>
              <td>{movie.plot}</td>
              <td>{movie.vote_avr}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteMovie(movie.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {movieItems.length === 0 && (
        <div className="text-center">No movies in this group yet</div>
      )}
    </div>
  );
};

export default MovieGroupDetail;
