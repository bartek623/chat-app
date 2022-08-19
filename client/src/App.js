import React, { useContext } from "react";

import UserContext from "./store/UserContext";
import Authentication from "./components/Authentication/Authentication";
import ChatApp from "./components/Conversation/ChatApp";

function App() {
  const userCtx = useContext(UserContext);

  return (
    <React.Fragment>
      {!userCtx.isLogged && <Authentication />}
      {userCtx.isLogged && <ChatApp />}
    </React.Fragment>
  );
}

export default App;
