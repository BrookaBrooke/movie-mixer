import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieGroupDetail = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedMovieItems = sessionStorage.getItem(`movieItems_${id}`);
    const storedMovies = sessionStorage.getItem(`movies_${id}`);

    if (storedMovieItems && storedMovies) {
      setMovieItems(JSON.parse(storedMovieItems));
      setMovies(JSON.parse(storedMovies));
      setLoading(false);
      return;
    }
    const fetchMovieItems = async () => {
      try {
        const movieItemsResponse = await fetch(
          `http://localhost:8000/movie_items?movie_group_id=${id}`
        );
        const movieItemsData = await movieItemsResponse.json();
        setMovieItems(movieItemsData);
        sessionStorage.setItem(
          `movieItems_${id}`,
          JSON.stringify(movieItemsData)
        );
        const movieIdList = movieItemsData.map((item) => item.movie_id);
        const movieList = [];

        for (let movie_id of movieIdList) {
          let movieResponse = await fetch(
            `http://localhost:8000/movies/${movie_id}`
          );
          const movieData = await movieResponse.json();
          movieList.push(movieData);
        }
        setMovies(movieList);
        sessionStorage.setItem(`movies_${id}`, JSON.stringify(movieList));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieItems();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <h1>Movie Group Detail</h1>
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
              <td>{movie.title}</td>
              <td>{movie.released}</td>
              <td>{movie.plot}</td>
              <td>{movie.rated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieGroupDetail;
