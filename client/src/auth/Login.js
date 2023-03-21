import React, { useState } from "react";
import axios from "axios";
import { Navigate as Redirect, useNavigate, Link } from "react-router-dom";

const LoginPage = (props) => {
  const [loggedIn, setloggedIn] = useState(false);
  const history = useNavigate();
  const [emailState, setEmailState] = useState("");
  const [passState, setPassState] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("handle submit");
    if (passState === "" || emailState === "") {
      alert("Must Fill All Fields!");
      setError("Špatně vyplněný formulář");
    }

    axios
      .get("http://localhost:5000/api/getUser", {
        params: {
          email: emailState,
          password: passState,
        },
      })
      .then(function (response) {
        response = response.data;
        var data = response.data;
        console.log("___", response);
        if (data.length === 0) {
          setError(response.message);
          console.log(error);
        } else {
          localStorage.setItem("is-login", true);
          const islogin = localStorage.getItem("is-login");
          setloggedIn(islogin);
          if (islogin) {
            console.log(islogin + "__+++_");
            window.location.href = "/movies";
          } else {
            history("/login");
            <Redirect to="/login" />;
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  function handleChange(event) {
    if (event.target.name === "email") {
      setEmailState(event.target.value);
    } else if (event.target.name === "password") {
      setPassState(event.target.value);
    } else {
      setEmailState("");
      setPassState("");
    }
  }
  return (
    <div className=" offset-3 col-6 mt-5">
      <div className="alert alert-info">
        <span className="pull-left">{error} </span>
        &nbsp;
        <Link className="pull-right" to="/register">
          Nemáš ještě účet? Registruj se!
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            required={true}
            type="email"
            className="form-control"
            placeholder="E-mail"
            name="email"
            value={emailState}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Heslo</label>
          <input
            required={true}
            type="password"
            className="form-control"
            placeholder="Heslo"
            name="password"
            value={passState}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="btn btn-success mt-2"
          value="Přihlásit se"
        />
      </form>
    </div>
  );
};

export default LoginPage;
