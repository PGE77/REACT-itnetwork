import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  const [emailState, setEmailState] = useState("");
  const [passState, setPassState] = useState("");
  const [cpassState, setCpassState] = useState("");
  const [error, errorState] = useState("");

  function handleChange(event) {
    if (event.target.name === "email") {
      setEmailState(event.target.value);
      // console.log(emailState)
    } else if (event.target.name === "password") {
      setPassState(event.target.value);
      // console.log(passState)
    } else if (event.target.name === "cpassword") {
      setCpassState(event.target.value);
      // console.log(passState)
    } else {
      setEmailState("");
      setPassState("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    if (passState !== cpassState) {
      alert("Passwords Must Match!");
    }
    axios
      .post("http://localhost:5000/api/addUsers", {
        email: emailState,
        password: passState,
      })
      .then(function (response) {
        var data = response.data;
        errorState(data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="offset-3 col-6 mt-5">
      <div className="alert alert-info">
        <span className="pull-left">{error}</span>
        &nbsp;
        <Link className="pull-right" to="/login">
          Máš už účet? Přihlas se!
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
        <div className="form-group">
          <label htmlFor="cpassword">Heslo znovu</label>
          <input
            required={true}
            type="password"
            className="form-control"
            placeholder="Heslo"
            name="cpassword"
            value={cpassState}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="btn btn-danger mt-2"
          value="Registrovat se"
        />
      </form>
    </div>
  );
};

export default RegisterPage;
