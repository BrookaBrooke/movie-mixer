import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import ReactPlayer from "react-player";
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
      src: `https://youtu.be/d9MyW72ELq0`,
      credit: "20th Century / 20th Century Studios",
    },
  ];

  return (
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
          {videoProperties.map((videoObj) => {
            return (
              <Carousel.Item key={videoObj.id}>
                <ReactPlayer
                  url={videoObj.src}
                  playing={true}
                  width="100%"
                  height="540px"
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
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default MainPage;
