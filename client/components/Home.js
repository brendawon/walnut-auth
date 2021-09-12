import React from "react";
import { connect } from "react-redux";

const Home = (props) => {
  //mapstate to props
  const { username } = props;
  return (
    <div>
      <h1>Hi, {username}</h1>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
