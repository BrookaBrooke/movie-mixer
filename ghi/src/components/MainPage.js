import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from 'swiper';
// import "./VideoCarousel.css";

function MainPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const getMovieInfoWithTrailers = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/trailers`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMovieData(data);
      }
    };
    getMovieInfoWithTrailers();
  }, []);


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
    <div className="main-slider">
      <Swiper
        modules={[EffectCoverflow, Pagination, Autoplay]}
        effect={"coverflow"}
        centeredSlides={true}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{delay: 4000}}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
      >
        {movieData.map((movie, i) => {
          return (
            <SwiperSlide key={i}>
              <img
                className="poster-image"
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
              />
              <div className="slide-item-container">
              <div className="slide-item-content">
            <h2 className="slide-title">{movie.title}</h2>
        </div>
        </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <div className="slide-item-container"> */}
        {/* <div className="slide-item-content">
          {movieData.map((movie) => {
            return (
            <h2 className="slide-title">{movie.title}</h2>
          )
          })}
        </div> */}
      {/* </div> */}
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
          {movieData.map((movieData) => {
            return (
              <Carousel.Item key={movieData.id}>
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${movieData.trailer.key}`}
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
                  <h3>{movieData.title}</h3>
                  <h4>Released: {movieData.release_date}</h4>
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
