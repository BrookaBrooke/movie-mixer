import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Carousel} from 'react-bootstrap'
import ReactPlayer from "react-player";
import HeroSlider from 'HeroSlider'
// import "./VideoCarousel.css";


function MainPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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
      src: (`https://youtu.be/d9MyW72ELq0`),
      credit: "20th Century / 20th Century Studios"
    },
  ]



  return (
      <div>
      <div>
        <HeroSlide />
      </div>
        <div className="home-pic">
          <Carousel>
            {videoProperties.map((videoObj) => {
              return (
                <Carousel.Item key={videoObj.id}>
                  <ReactPlayer
                  url={videoObj.src}
                  playing={true}
                  width="100%"
                  height="1080px"
                  pip={true}
                  // fullscreen={true}
                  muted={true}
                  // hover={true}
                  // controls={true}


                  />
                  <Carousel.Caption>
                    <h2>New Release</h2>
                    <h3>{videoObj.title}</h3>
                    <p>Credits: {videoObj.credit}</p>
                    {/* <h4>Add to your Favorites</h4> */}
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
          </div>
          <div className='main-page-search'>
          <h2 className="home-header">Search Movies</h2>
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
      </div>
  );
}

export default MainPage;
