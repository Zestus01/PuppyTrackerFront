import React from "react";
import { useGlobalState } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [state, dispatch] = useGlobalState();
  let navigate = useNavigate();

  function logout(){
    localStorage.clear()
    navigate("/");
  }
  return (
    <div className="container-fluid ">
      <h1 className="d-flex justify-content-center">Welcome</h1>
      <h1 className="d-flex justify-content-center">{state.currentUser.username}</h1>
      <h1 className="d-flex justify-content-center">{state.currentUser.first_name}</h1>
      <button className="btn mt-4" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
