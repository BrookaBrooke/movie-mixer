import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import MainPage from "./components/MainPage";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import AccountForm from "./components/AccountForm";
import MovieGroups from "./components/MovieGroups";
import MovieSearch from "./components/MovieSearch";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<AccountForm />} />
        <Route path="groups">
          <Route
            index
            element={<MovieGroups movieGroups={props.movieGroups} />}
          />
        </Route>
        <Route path="/search" element={<MovieSearch />}></Route>
        <Route
          path="/search/:searchQuery/:pageNumber"
          element={<MovieSearch />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

{
  /* //   useEffect(() => {
  //     async function getData() {
  //       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //       console.log('fastapi url: ', url);
  //       let response = await fetch(url);
  //       console.log("------- hello? -------");
  //       let data = await response.json();

  //       if (response.ok) {
  //         console.log("got launch data!");
  //         setLaunchInfo(data.launch_details);
  //       } else {
  //         console.log("drat! something happened");
  //         setError(data.message);
  //       }
  //     }
  //     getData();
  //   }, [])

  //   return (
  //     <div>
  //       <ErrorNotification error={error} />
  //       <Construct info={launch_info} />
  //     </div>
  //   );
  // } */
}

// const [launch_info, setLaunchInfo] = useState([]);
// const [error, setError] = useState(null);
