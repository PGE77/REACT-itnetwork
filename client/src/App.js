import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieIndex from "./movies/MovieIndex";
import PersonIndex from "./persons/PersonIndex";
import MovieDetail from "./movies/MovieDetail";
import PersonDetail from "./persons/PersonDetail";
import MovieForm from "./movies/MovieForm";
import PersonForm from "./persons/PersonForm";
import LoginPage from "./auth/Login";
import RegisterPage from "./auth/Register";

export function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const history = useNavigate();

  const loadId = () => {
    const islogin = localStorage.getItem("is-login");
    console.log(islogin + "___");
    setloggedIn(islogin);
    if (islogin === true) {
      history("/movies");
      <Navigate to="/movies" />;
    } else {
      history("/login");
      <Navigate to="/login" />;
    }
  };
  useEffect(() => {
    loadId();
    if (loggedIn) {
      history("/movies");
      <Navigate to="/movies" />;
    } else {
      history("/login");
      <Navigate to="/login" />;
    }
  }, [loggedIn]);

  const logOut = () => {
    localStorage.setItem("is-login", "false");
    const islogin = localStorage.removeItem("is-login");
    setloggedIn(islogin);
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {!loggedIn || loggedIn === null ? (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Přihlásit se
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Registrovat se
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/movies"} className="nav-link">
                Filmy
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/people"} className="nav-link">
                Osobnosti
              </Link>
            </li>
            <li className="nav-item" onClick={logOut}>
              <Link to={"#"} className="nav-link">
                Odhlásit se
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <Routes>
        {!loggedIn || loggedIn === null ? (
          <>
            <Route path="/login" element={<LoginPage></LoginPage>} />
            <Route path="/register" element={<RegisterPage></RegisterPage>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route exact path="/movies" element={<MovieIndex></MovieIndex>} />
            <Route
              path="/movies/show/:id"
              element={<MovieDetail></MovieDetail>}
            />
            <Route path="/movies/create" element={<MovieForm></MovieForm>} />
            <Route path="/movies/edit/:id" element={<MovieForm></MovieForm>} />
            <Route exact path="/people" element={<PersonIndex></PersonIndex>} />
            <Route
              path="/people/show/:id"
              element={<PersonDetail></PersonDetail>}
            />
            <Route path="/people/create" element={<PersonForm></PersonForm>} />
            <Route
              path="/people/edit/:id"
              element={<PersonForm></PersonForm>}
            />
            <Route path="/" element={<Navigate to="/movies" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
