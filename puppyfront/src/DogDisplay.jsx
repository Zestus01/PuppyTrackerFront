import { useGlobalState } from "./context/GlobalState";
import axios from "axios";
import React, { useState, useEffect } from "react";
import request from "./services/api.requests";



function breedString(breeds) {
  let breedStr = "";
  breeds.map((breed) => {
    breedStr += breed + " ";
    return;
  });
  return breedStr;
}

export default function DogDisplay(props) {
  const [state, dispatch] = useGlobalState();
  const [dogData, setDogData] = useState([]);
  const header = state.currentUserToken; 
  
  React.useEffect(() => {
    async function getData(){
      let options = {
        url: "dog/",
        method: 'GET',
        params: {
          'owner__id': state.currentUser.user_id
        }
      };
      let resp = await request(options)
      setDogData(resp.data)
    }
    getData();
    }, []);

  // if (dogData.length === 0) {
  //   return;
  // } else {
    return (
      <div>
        {dogData.map((dog) => (
          <ul key={new Date() + dog.id} className="App">
            {dog.name}
            <li key={dog.id + dog.breed}>{breedString(dog.breed)}</li>
            <li key={dog.id + dog.gender}>{dog.gender}</li>
            <li key={dog.id + dog.weight + dog.height}>
              W: {dog.weight} H: {dog.height}
            </li>
          </ul>
        ))}
      </div>
    );
  }

