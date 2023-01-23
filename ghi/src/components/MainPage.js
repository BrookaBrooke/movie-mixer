import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide, SwiperSlider } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper';

// import "./VideoCarousel.css";

function MainPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const sampleMovieIds = [315162, 299534, 675353, 76600, 809];
  const [movies, setMovies] = useState([]);
  const [videoLinks, setVideoLinks] = useState([]);

  useEffect(() => {
    const getMovieData = async () => {
      const tempList = [];
      for (const id of sampleMovieIds) {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/detail/${id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          tempList.push(data);
        }
      }
      setMovies(tempList);
    };

    const getMovieTrailers = async () => {
      const tempList = [];
      for (const id of sampleMovieIds) {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/trailer/${id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          tempList.push(data.video);
        }
      }
      setVideoLinks(tempList);
    };
    getMovieData();
    getMovieTrailers();
  }, []);

  const movieDataWithKey = movies.map((x, i) => {
    return [x, videoLinks[i].key];
  });

  function onChange(event) {
    setQuery(event.target.value);
  }

  function redirectToSearchPage(event) {
    event.preventDefault();
    return navigate(`/search/${query}/1`);
  }


  const videoProperties = [
    {
      id: 76600,
      title: "Avatar: The Way of Water",
      src: `https://youtu.be/d9MyW72ELq0`,
      credit: "20th Century / 20th Century Studios",
    },
  ];

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={true}
        slidesPerView={5}
        autplay={{delay: 3000}}
      >
        {
          movies.map((movie, i) => (
            <SwiperSlide key={movie.id}>
              {({ isActive }) => (
                <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} />
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
    <div className="banner-search text-light">
      <div>
        <h1 className="home-header">MovieMixer</h1>
        <p className="text-center">
          Find information for any movie you desire and organize them into lists
          to keep track of upcoming titles or old favorites!
        </p>
      </div>
      <div>
        <div className="pb-3 d-flex justify-content-center">
          <div className="p-2">
            {" "}
            <h2 className="text-center">Search Movies</h2>
            <form
              className="d-flex container"
              role="search"
              onSubmit={redirectToSearchPage}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                required
                onChange={onChange}
              />
              <button className="btn btn-outline-danger" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="text-center p-2">
            <p>Log in to get started!</p>
            <button className="btn btn-outline-primary">Log in</button>
          </div>
        </div>
      </div>

      <div className="">
        <Carousel>
          {movieDataWithKey.map((movieData) => {
            return (
              <Carousel.Item key={movieData[0].id}>
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${movieData[1]}`}
                  playing={true}
                  width="100%"
                  height="540px"
                  pip={true}
                  // fullscreen={true}
                  muted={true}
                  // hover={true}
                  controls={false}
                />
                <Carousel.Caption>
                  <h3>{movieData[0].title}</h3>
                  <h4>Released: {movieData[0].release_date}</h4>
                  {/* <h4>Add to your Favorites</h4> */}
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
    </div>
  );
}

export default MainPage;
