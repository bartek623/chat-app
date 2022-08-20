import React from "react";
import UserItem from "./UserItem";
import style from "./UsersList.module.css";

function UsersList(props) {
  const users = props.users.map((user) => (
    <UserItem user={user} key={Math.random()} />
  ));

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Active Users</h2>
      <ul className={style.list}>{users}</ul>
    </div>
  );
}

export default UsersList;
