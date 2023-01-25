import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import { UserContext } from "../context/UserContext";
// import "./VideoCarousel.css";

function MainPage() {
  const navigate = useNavigate();
  const [token] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const getMovieInfoWithTrailers = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api-movies/trailers`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setMovieData(data.results);
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

  const parallax = Array.from(document.querySelectorAll(".parallax"));

  // window.onscroll = () => {
  //   parallax.forEach((el) => {
  //     const speed = el.dataset.speed || 1;
  //     const windowYOffset = window.pageYOffset;
  //     const newBgPos = "50% " + windowYOffset * speed + "px";

  //     el.style.backgroundPosition = newBgPos;
  //   });
  // };

  return (
    <>
      <div className="banner-search text-light">
        <div className="main-slider">
          <div id="overlay-search-bar">
            <div className="home-header">
              <h1 className="home-header">MovieMixer</h1>
            </div>
            <form
              className="d-flex"
              role="search"
              onSubmit={redirectToSearchPage}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Movies"
                aria-label="Search"
                required
                onChange={onChange}
              />
              <button
                className="d-inline btn btn-lg btn-outline-danger mx-2"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay]}
            effect={"coverflow"}
            centeredSlides={true}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 10000 }}
            className="mySwiper"
          >
            {movieData.map((movie, i) => {
              const divStyle = {
                backgroundImage: `linear-gradient(to left, rgba(46, 21, 27, 0.932), rgba(161, 81, 44, 0.529), rgba(111, 50, 65, 0.6)), url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
              };
              return (
                <SwiperSlide key={i}>
                  <div className="backdrop-image" style={divStyle}>
                    <div className="slide-item-container">
                      <div className="slide-item-content">
                        {/* <h2 className="search-movies">Search Movies</h2> */}

                        {/* <h2 className="slide-title">{movie.title}</h2> */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="movie-info">
          <h1 className="home-header">MovieMixer</h1>
          <p className="text-center p-2">
            Find information for any movie you desire and organize them into
            your personal list to keep track of upcoming titles or old
            favorites! You can create different lists with many genres or a
            specific genre. Then rank them from best to worst. You can also
            check out other users movie lists to find something new to watch.
            Happy watching!
          </p>
          <div className="pb-3 d-flex justify-content-center">
            {localStorage.getItem("username") === "null" ? (
              <div className="text-center p-2">
                <div className="login-button m-3">
                  <h4>Log in to get started!</h4>
                  <button
                    className="btn btn-lg btn-outline-danger"
                    onClick={() => {
                      window.scroll(0, 0);
                      navigate("/login");
                    }}
                  >
                    Log in
                  </button>
                </div>
                <div className="signup-button m-3">
                  <h4>Not signed up?</h4>
                  <button
                    className="btn btn-lg btn-outline-danger"
                    onClick={() => {
                      window.scroll(0, 0);
                      navigate("/register");
                    }}
                  >
                    Register Today
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-2">
                <h2>Hello {localStorage.getItem("username")}!</h2>
              </div>
            )}
          </div>
        </div>
        <div></div>
        <div className="">
          <Carousel>
            {movieData.map((movieData) => {
              return (
                <Carousel.Item key={movieData.id}>
                  <ReactPlayer
                    url={`https://www.youtube.com/embed/${movieData.trailer.key}`}
                    playing={true}
                    width="100%"
                    height="720px"
                    pip={true}
                    // fullscreen={true}
                    muted={true}
                    loop={true}
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
        <div className="all-favorites-section">
          <h2>See Users Favorite Movies!</h2>
          <p>
            Checkout other users favorite movies, and find something new to
            watch!
          </p>
          <div className="pb-3 d-flex justify-content-center">
            <div className="text-center p-2">
              <button
                className="btn btn-lg btn-outline-danger"
                onClick={() => {
                  if (token === "null") {
                    window.scroll(0, 0);
                    navigate("/login");
                  } else {
                    navigate("/groups");
                  }
                }}
              >
                See Favorite Movies
              </button>
            </div>
          </div>
        </div>
        <section className="parallax" data-speed=".009">
          {/* <h1 className="parallax-header"></h1> */}
          <div className="parallax-container">
            <div className="parallax-content">
              <h1 className="text-box-main">Discover New Movies</h1>
            </div>
          </div>
        </section>
        <div className="bottom-div row justify-content-center">
          <div className="movie-trivia-image col-auto pb-4"></div>
          <div className="movie-trivia-home col-auto">
            <h2 className="">Play Movie Trivia</h2>
            <p className="">
              Test your knowledge with a quick Movie Trivia Game! How many
              questions can you answer correctly?
            </p>
            <div className="pb-3 col-auto">
              <div className="text-center p-2">
                <button className="btn btn-lg btn-outline-danger">
                  Movie Trivia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-center text-white">
        <div className="container p-4">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>

          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Questions</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="form5Example21"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="form5Example21">
                      Email address
                    </label>
                  </div>
                </div>

                <div className="col-auto pb-4">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Contact Today
                  </button>
                </div>
              </div>
            </form>
          </section>

          <section className="mb-4">
            <p>Enjoy MovieMixer</p>
          </section>

          <section className="">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Contact</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Register</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Log in</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">My Favorites</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Link 4
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center p-3">
          © 2022 Copyright
          <a className="text-white" href="">
            MovieMixer
          </a>
        </div>
      </footer>
    </>
  );
}

export default MainPage;
