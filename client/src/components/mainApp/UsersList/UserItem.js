import style from "./UserItem.module.css";

function UserItem(props) {
  return <li className={style.item}>{props.user}</li>;
}

export default UserItem;
