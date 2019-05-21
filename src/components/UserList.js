import React from "react";
import UserListItem from "./UserListItem";
import List from "@material-ui/core/List";

const UserList = ({ users, showActions }) => {
  return (
    <div className="UserList">
      <div>
        <List dense={true}>
          {users.map(user => {
            return <UserListItem key={user.id} {...user} showActions={showActions} />;
          })}
        </List>
      </div>
    </div>
  );
};

export default UserList;
