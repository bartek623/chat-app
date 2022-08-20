import React, { useContext, useEffect, useState } from "react";

import UserContext from "./store/UserContext";
import Authentication from "./components/Authentication/Authentication";
import ChatApp from "./components/mainApp/ChatApp";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [users, setUsers] = useState([]);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    socket.on("update_users", (usersList) => {
      setUsers(usersList);
    });
  }, []);

  return (
    <React.Fragment>
      {!userCtx.isLogged && (
        <Authentication
          activeUsers={users.length}
          currentUserid={socket.id}
          users={users}
        />
      )}
      {userCtx.isLogged && <ChatApp socket={socket} users={users} />}
    </React.Fragment>
  );
}

export default App;
