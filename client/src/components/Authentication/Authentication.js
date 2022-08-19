import { useContext, useRef } from "react";

import UserContext from "../../store/UserContext";
import style from "./Authentication.module.css";

function Authentication() {
  const usernameRef = useRef();
  const userCtx = useContext(UserContext);

  const submitHandler = function (e) {
    e.preventDefault();
    const username = usernameRef.current.value;

    if (username !== "" && username.length > 16) return;

    userCtx.login(userCtx.id, username);
  };

  return (
    <div className={style["modal-container"]}>
      <div className={style.modal}>
        <div className={style.logo}>ChatApp</div>
        <form onSubmit={submitHandler}>
          <input
            ref={usernameRef}
            id="username"
            type="text"
            className={style.input}
            placeholder="Your Name"
          />
        </form>
      </div>
    </div>
  );
}

export default Authentication;
