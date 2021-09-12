import React from "react";
import { connect } from "react-redux";
import { signup } from "../store";

const SignUp = (props) => {
  //map state and dispatch to props
  const { handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username" />
        <input name="password" />
        <input name="confirmPW" />
        <div>
          <button>Create Account</button>
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
      const confirmPW = event.target.confirmPW.value;
      if (password !== confirmPW) {
        console.log("Passwords do not match. Confirm password again.");
      } else {
        dispatch(signup(username, password));
      }
    },
  };
};

export default connect(mapState, mapDispatch)(SignUp);
