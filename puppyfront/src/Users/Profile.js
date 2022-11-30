import React from "react";
import { useGlobalState } from "../../context/GlobalState";

const Profile = () => {
  const [state, dispatch] = useGlobalState();

  return (
    <div>
      <h1>{state.currentUser.user_id}</h1>
      <h1>{state.currentUser.username}</h1>
      <h1>{state.currentUser.first_name}</h1>
    </div>
  );
};

export default Profile;
