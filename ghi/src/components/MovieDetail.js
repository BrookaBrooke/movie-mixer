import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router";

const MovieDetail = () => {
  const [details, setDetails] = useState([]);
  const [loaded, setLoaded] = useState(true);

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
  }, [])

  if (loaded) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const divStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, .7), rgba(93, 41, 41, 0.542)), url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`,
  }

  return (
    <div className='banner' style={divStyle} >
      <div className='container'>


          <h2 id="detail-text"> {details.title} </h2>
            <ul className="genres">
              {details.genres?.map(genre => {
              return (
                        <li key={genre.id}>{genre.name}</li>
                      );
              })}
            </ul>

              <p id="detail-text">
                {details.overview}
              </p>

            <h5 id="detail-text"> Released: {details.release_date} </h5>
            <h4 id="detail-text"> { details.vote_average?.toFixed(1) } </h4>
            <div className="card-body pb-4">
              <img className="poster-image" src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} />


        </div>
        <a href="#" className="btn btn-outline-info">Add to List</a>
      </div>
    </div>
  )
}

export default MovieDetail;

// .toFixed(1)

 {/* <div id="back-drop">
          <img style={background-image}: {`https://image.tmdb.org/t/p/w500${details.backdrop_path}`} />
        </div> */}


      //   <div className='background-image' style ={ { backgroundImage: `url({https://image.tmdb.org/t/p/w500${details.backdrop_path})` } }>
      // </div>
