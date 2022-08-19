import React from "react";

const UserContext = React.createContext({
  isLogged: false,
  userid: "",
  username: "",
  login: (userid, username) => {},
  logout: () => {},
});

export default UserContext;
