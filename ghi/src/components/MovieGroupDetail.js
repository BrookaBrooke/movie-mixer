import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MovieGroupDetail = () => {
  const [movieGroup, setMovieGroup] = useState(null);
  const [movieItems, setMovieItems] = useState([]);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieGroups = async () => {
      try {
        const movieGroupsResponse = await fetch(
          `http://localhost:8000/movie-groups/${id}`
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
          `http://localhost:8000/movie_items/${id}`
        );
        const movieItemsData = await movieItemsResponse.json();
        setMovieItems(movieItemsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieItems();
  }, [movieGroup]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieIdList = movieItems.map((item) => item.movie_id);
        const movieList = [];

        for (let movie_id of movieIdList) {
          let movieResponse = await fetch(
            `http://localhost:8000/movies/${movie_id}`
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

  return movieItems.length != 0 ? (
    <div>
      <h1>{movieGroup && movieGroup.name}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Released</th>
            <th>Plot</th>
            <th>Rated</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <Link to={`/movie-detail/${movie.imdbID}`}>{movie.title}</Link>
              </td>
              <td>{movie.released}</td>
              <td>{movie.plot}</td>
              <td>{movie.rated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <h1>{movieGroup && movieGroup.name}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Released</th>
            <th>Plot</th>
            <th>Rated</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div>No movies in this group yet</div>
    </div>
  );
};

export default MovieGroupDetail;
