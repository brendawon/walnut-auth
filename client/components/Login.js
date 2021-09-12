import React from "react";
import { connect } from "react-redux";
import { login } from "../store";

const Login = (props) => {
  //map state and dispatch to props
  const { handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username" />
        <input name="password" />
        <div>
          <button type="submit">Sign In</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
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
