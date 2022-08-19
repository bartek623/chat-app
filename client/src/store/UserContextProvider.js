import { useReducer } from "react";

import UserContext from "./UserContext";

const defaultUserState = {
  isLogged: false,
  userid: "",
  username: "",
};

const userReducer = function (state, action) {
  if (action.type === "login") {
    return {
      isLogged: true,
      userid: action.userid,
      username: action.username,
    };
  }

  return defaultUserState;
};

function UserContextProvider(props) {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );

  const loginHandler = (userid, username) => {
    dispatchUserAction({ type: "login", userid, username });
  };

  const logoutHandler = () => {
    dispatchUserAction({ type: "logout" });
  };

  const userContext = {
    isLogged: userState.isLogged,
    userid: userState.userid,
    username: userState.username,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
