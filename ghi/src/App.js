import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Nav from "./Nav";
import MainPage from "./components/MainPage";
import MovieDetail from "./components/MovieDetail";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import AccountForm from "./components/AccountForm";
import MovieGroups from "./components/MovieGroups";
import MyMovieGroups from "./components/MyMovieGroups";
import MovieSearch from "./components/MovieSearch";
import MovieGroupDetail from "./components/MovieGroupDetail";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Trivia from "./components/Trivia";

function App(props) {
  return (
    <BrowserRouter>
      {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<AccountForm />} />
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<MovieSearch />}></Route>
        <Route
          path="/search/:searchQuery/:pageNumber"
          element={<MovieSearch />}
        ></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/my-groups" element={<MyMovieGroups />} />
          <Route path="/groups">
            <Route
              index
              element={<MovieGroups movieGroups={props.movieGroups} />}
            />
            <Route path="/groups/:id" element={<MovieGroupDetail />} />
          </Route>
        </Route>
        <Route path="/trivia" element={<Trivia />} />
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
