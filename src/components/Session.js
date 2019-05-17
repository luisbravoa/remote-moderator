import React from "react";


// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3001');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

export const Session = ({ match }) => {
  return <div>Session {match.params.id}</div>;
};
