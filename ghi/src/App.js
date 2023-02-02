import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import MainPage from "./components/MainPage";
import MovieDetail from "./components/MovieDetail";
import "./App.css";
import MovieGroups from "./components/MovieGroups";
import MyMovieGroups from "./components/MyMovieGroups";
import MovieSearch from "./components/MovieSearch";
import MovieGroupDetail from "./components/MovieGroupDetail";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Trivia from "./components/Trivia";
import TriviaLimited from "./components/TriviaLimited";
import TriviaEndless from "./components/TriviaEndless";

function App(props) {
  return (
    <BrowserRouter>
      {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
      <Nav />
      <Routes>
        <Route path="/movie-mixer" element={<MainPage />} />
        <Route path="/movie-mixer/movie-detail/:id" element={<MovieDetail />} />
        <Route path="/movie-mixer/register" element={<Register />} />
        <Route path="/movie-mixer/logout" element={<Logout />} />
        <Route path="/movie-mixer/login" element={<Login />} />
        <Route path="/movie-mixer/search" element={<MovieSearch />}></Route>
        <Route
          path="/movie-mixer/search/:searchQuery/:pageNumber"
          element={<MovieSearch />}
        ></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/movie-mixer/my-groups" element={<MyMovieGroups />} />
          <Route path="/movie-mixer/groups">
            <Route
              index
              element={<MovieGroups movieGroups={props.movieGroups} />}
            />
            <Route
              path="/movie-mixer/groups/:id"
              element={<MovieGroupDetail />}
            />
          </Route>
        </Route>
        <Route path="/movie-mixer/trivia">
          <Route index element={<Trivia />} />
          <Route
            path="/movie-mixer/trivia/limited/:numQuestions/:difficulty"
            element={<TriviaLimited />}
          />
          <Route
            path="/movie-mixer/trivia/endless/:difficulty"
            element={<TriviaEndless />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
