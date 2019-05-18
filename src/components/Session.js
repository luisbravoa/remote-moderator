import React from "react";

import Socket from 'socket.io-client';

const socket = Socket('http://localhost:3001');
socket.on('connect', () => {
  console.log('connected');
});
socket.on('algo', (data) => {
  console.log(data);
});
socket.on('disconnect', () => {
  console.log('connected');
});

export const Session = ({ match }) => {
  return <div>Session {match.params.id}</div>;
};
