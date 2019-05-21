import React from "react";

export const Home = (props) => {
  return (
    <div>
      <div>Home</div>
      <button onClick={props.createSession}>Create Session</button>
    </div>
  );
};
