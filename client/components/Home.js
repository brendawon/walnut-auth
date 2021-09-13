import React from "react";
import { connect } from "react-redux";

const Home = (props) => {
  //mapstate to props
  const { username } = props;
  return (
    <div className="home-page">
      <h3>Hi, {username}</h3>
      <img src="/squirrel-stock-photo.png" alt="squirrel" />
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
