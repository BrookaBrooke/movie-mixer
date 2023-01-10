import { useEffect, useState } from "react";
import { useParams } from 'react-router';

const MovieDetail = () => {
  const [details, setDetails] = useState('');

  const [ imdbID, setImdbID]= useParams()




  useEffect(() => {
    async function getMovies() {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/detail/{imdbID}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      }
    }
    getMovies();
  }, [])


  return (
    <div>
      <h2>Movie Details - { imdbID }</h2>
    </div>
  )
}

export default MovieDetail;
