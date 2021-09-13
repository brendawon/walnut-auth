import React from "react";
import { connect } from "react-redux";
import { signup } from "../store";

const SignUp = (props) => {
  //map state and dispatch to props
  const { handleSubmit } = props;

  return (
    <div className="form-container">
      <form className="form-group row" onSubmit={handleSubmit}>
        <div className="col-sm-10">
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            id="inputUsername"
          />
        </div>
        <div className="col-sm-10">
          <input
            className="form-control"
            name="password"
            placeholder="Password"
            id="inputPassword"
          />
          <input
            className="form-control"
            name="confirmPW"
            placeholder="Confirm password"
          />
        </div>

        <div>
          <button className="btn btn-primary">Create Account</button>
        </div>
      </form>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const username = event.target.username.value;
      const password = event.target.password.value;
      const confirmPW = event.target.confirmPW.value;
      if (password !== confirmPW) {
        alert("Passwords do not match. Confirm password again.");
      } else {
        dispatch(signup(username, password));
      }
    },
  };
};

export default connect(null, mapDispatch)(SignUp);
