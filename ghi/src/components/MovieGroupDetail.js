import React, { useState, useEffect } from "react";

const MoviesList = (movie_group_id) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async (movie_group_id) => {
      try {
        const response = await fetch(
          `http://localhost:8000/movies?movie_group_id=${movie_group_id}`
        );
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies(movie_group_id);
  }, [movie_group_id]);
};

return (

);

export default MoviesList;
