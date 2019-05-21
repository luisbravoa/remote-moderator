import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle, Add, Mic } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";

import "./UserListItem.scss";

const useStyles = makeStyles({
  primary: {
    color: "white"
  },
  root: {
    color: "white"
  }
});

const useStyles2 = makeStyles({
  root: {
    color: "white"
  }
});

const UserListItem = ({ name, online, isModerator, showActions }) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const getStatus = () => {
    return (online ? " (Online)" : " (Offline)");
  }

  const getIsModerator = () => {
    return (isModerator ? " (Moderator)" : "");
  }

  return (
    <div className="UserListItem">
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: "gray" }}>
            <AccountCircle style={{ fontSize: 50, color: "white" }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name + getStatus() + getIsModerator()}
          classes={classes}
        />
        {showActions && (
          <ListItemSecondaryAction>
            <IconButton>
              <Mic className="Icon" classes={classes2} />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </div>
  );
};

export default UserListItem;
