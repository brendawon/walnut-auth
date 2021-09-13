import React from "react";
import { connect } from "react-redux";
import { login } from "../store";

const Login = (props) => {
  //map state and dispatch to props
  const { handleSubmit, error } = props;

  return (
    <div className="form-container">
      <form className="form-group row" onSubmit={handleSubmit}>
        <div className="col-sm-10 col-md-12 col-lg-12">
          <input
            className="form-control"
            name="username"
            placeholder="Username"
            id="inputUsername"
          />
        </div>
        <div className="col-sm-10 col-md-12 col-lg-12">
          <input
            className="form-control"
            name="password"
            placeholder="Password"
            id="inputPassword"
          />
        </div>
        {error && error.response && (
          <small className="form-text text-muted">
            {" "}
            {error.response.data}{" "}
          </small>
        )}
        <div>
          <button className="btn btn-primary"> Sign In </button>
        </div>
      </form>
    </div>
    // <div className="form-container">
    //   <form className="form-group row" onSubmit={handleSubmit}>
    //     <div className="col-sm-10">
    //       <input
    //         className="form-control"
    //         name="username"
    //         placeholder="Username"
    //         id="inputUsername"
    //       />
    //     </div>
    //     <div className="col-sm-10">
    //       <input
    //         className="form-control"
    //         name="password"
    //         placeholder="Password"
    //         id="inputPassword"
    //       />
    //     </div>
    //     {error && error.response && (
    //       <small className="form-text text-muted">
    //         {" "}
    //         {error.response.data}{" "}
    //       </small>
    //     )}
    //     <div>
    //       <button className="btn btn-primary" type="submit">
    //         Sign In
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

const mapState = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const username = event.target.username.value;
      const password = event.target.password.value;
      dispatch(login(username, password));
    },
  };
};

export default connect(mapState, mapDispatch)(Login);
