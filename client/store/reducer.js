import axios from "axios";
import history from "../history";

const TOKEN = "token";

//action type
const SET_AUTH = "SET_AUTH";

//action creator
const setAuth = (auth) => ({ type: SET_AUTH, auth });

//thunk creator to find if user is authorized to access info

export const signup = (username, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/signup", { username, password });
    //save user token to local storage
    window.localStorage.setItem(TOKEN, data.token);
    dispatch(self());
  } catch (err) {
    return dispatch(setAuth({ error: err }));
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", { username, password });
    //save user token to local storage
    window.localStorage.setItem(TOKEN, data.token);
    //call self thunk to check if token matches
    dispatch(self());
  } catch (err) {
    return dispatch(setAuth({ error: err }));
  }
};

export const self = () => async (dispatch) => {
  //retrieve token from local storage
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data } = await axios.getItem("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(data));
  }
};

export const logout = () => {
  //reset local storage and state, return to login screen
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

//reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
