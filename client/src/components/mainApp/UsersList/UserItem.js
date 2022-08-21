import { useContext } from "react";

import UserContext from "../../../store/UserContext";
import style from "./UserItem.module.css";

function UserItem(props) {
  const userCtx = useContext(UserContext);
  return (
    <li
      className={`${style.item} ${
        userCtx.userid === props.user.userid ? style["im-here"] : ""
      }`}
    >
      {props.user.username ? props.user.username : props.user.userid}
    </li>
  );
}

export default UserItem;
