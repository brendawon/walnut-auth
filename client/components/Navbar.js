import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ isLoggedIn, handleClick }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        //if logged in, show logout button
        <div>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {/* <button onClick={handleClick}>Logout</button> */}
        </div>
      ) : (
        //if not logged in, links to log in or sign up
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
