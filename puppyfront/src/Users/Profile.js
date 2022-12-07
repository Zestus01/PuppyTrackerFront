import React from "react";
import { useGlobalState } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import request from "../services/api.requests";

const Profile = () => {
  const [state] = useGlobalState();
  let navigate = useNavigate();
  let dogData = (state.dogData ? state.dogData : []);

  function logout(){
    localStorage.clear()
    navigate("/");
  }

  async function sendDelete(id){
    let options = {
      url: "edit/dog/" + id + '/',
      method: "DELETE",
      };
      await request(options);
  }

  function handleDelete(id){
    
    sendDelete(id);
  }

  return (
    <div className="container-fluid d-flex justify-content-end">
      <h1 >Welcome</h1>
      <h2 >{state.currentUser.username}</h2>
      <h2 >{state.currentUser.first_name} {state.currentUser.last_name}</h2>
      {dogData.map( (dog, index) => {
        return(
          <div>
            <h3 
              key={new Date() + dog.id + index} 
              className="App"
            >
              {dog.name}
            </h3>
            <h5>W: {dog.weight}</h5>
            <h5>H: {dog.height}</h5>
            <button className="btn" key="delete btn" onClick={() => handleDelete(dog.id)}>DELETE</button>
          </div>    
        )
      })}
      <button className="btn mt-4" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
