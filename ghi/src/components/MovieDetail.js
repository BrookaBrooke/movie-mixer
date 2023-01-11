import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { useNavigate } from "react-router";

const MovieDetail = () => {
  const [original_title, setOriginalTitle] = useState('');
  const [details, setDetails] = useState([]);

  const { id } = useParams()




  useEffect(() => {
    async function getMovies() {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/detail/${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      }
    }
    getMovies();
  }, [])

  // var bg=require(`{https://image.tmdb.org/t/p/w500${details.backdrop_path}`)

  return (
    <div className="card" >
      <div className='background-image' style ={ { backgroundImage: `url({https://image.tmdb.org/t/p/w500${details.backdrop_path})` } }>
      </div>
      <div className="card-body">
        <h2> {details.title} </h2>
          <ul>
            {details.genres?.map(genre => {
            return (
                      <li key={genre.id}>{genre.name}</li>
                    );
            })}
          </ul>
          <section>
            <p>
              {details.overview}
            </p>
          </section>
          <h5> Released: {details.release_date} </h5>
        <div>
          <h4> { details.vote_average?.toFixed(1) } </h4>
        </div>
        <div>
            <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} />
        </div>
          <a href="#" className="btn btn-primary">Add to List</a>
      </div>
    </div>
  )
}

export default MovieDetail;

// .toFixed(1)

 {/* <div id="back-drop">
          <img style={background-image}: {`https://image.tmdb.org/t/p/w500${details.backdrop_path}`} />
        </div> */}
