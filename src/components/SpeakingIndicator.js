import React from "react";
import UserListItem from "./UserListItem";
import Avatar from "@material-ui/core/Avatar";
import { AccountCircle} from "@material-ui/icons";
import { makeStyles } from '@material-ui/styles';

import './SpeakingIndicator.scss';

const useStyles = makeStyles({
  primary: {
    color: 'white'
  },
  root: {
    color: 'white'
  }
});


const SpeakingIndicator = ({ name }) => {
  return (
    <div className="SpeakingIndicator">
      <Avatar style={{width: '150px', height: '150px'}}>
        <AccountCircle style={{ fontSize: 150, color: 'white' }}/>
      </Avatar>
      <h2>{name}</h2>
    </div>
  );
};

export default SpeakingIndicator;
