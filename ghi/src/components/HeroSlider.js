import React, { useState, useEffect } from 'react';
import { useParams } from "react-router"

const HeroSlide = () => {
  const [movies, setMovies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getMovies() {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/detail/${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        setMovies(data);

      }
    }
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      HeroSlide
    </div>
  )
}


export default HeroSlide;
