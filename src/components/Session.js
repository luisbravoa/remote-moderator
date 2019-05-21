import React, { useState, useEffect } from "react";
import Network from "../common/Network";
import Notification from "./Notification";
import UserList from "./UserList";
import SpeakingIndicator from "./SpeakingIndicator";
import './Session.scss';

export const Session = ({ match, username, userId }) => {
  const { id } = match.params;
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(undefined);
  const [notification, setNotification] = useState(undefined);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    if(!username){
      return;
    }
    Network.connect(
      {
        id,
        userId,
        username
      },
      {
        onError: event => {
          console.log(event.message);
          setError(event.message);
        },
        onDisconnect: () => {},
        onMessage: (event) => {
          const { type, data } = event;
          console.log(event);
          switch(type){
            case 'participants':
              setParticipants(data);
              break;
            case 'joined':
              if(data.id === userId){
                setIsModerator(data.isModerator);
              } else {
                setNotification(`${data.name} joined!`);
              }
              break;
          }
        }
      }
    );
  }, [username]);

  const onErrorClose = () => {
    setError(undefined);
    setNotification(undefined);
  };

  const showNotification = () => {
    return !!error || !!notification;
  }

  return (
    <div className="session">
      <Notification open={showNotification()} handleClose={onErrorClose} message={error || notification} />
      {/* <div>Session {match.params.id}</div>
      <div>isModerator {JSON.stringify(isModerator)}</div>
      <div>participants {JSON.stringify(participants)}</div> */}
      <div className="content">
        <SpeakingIndicator name="Luis"/>
        <UserList users={participants} showActions={isModerator}></UserList>
      </div>
    </div>
  );
};
