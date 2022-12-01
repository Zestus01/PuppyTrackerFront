import { useGlobalState } from "./context/GlobalState";
import axios from "axios";
import React, { useState, useEffect } from "react";
import request from "./services/api.requests";
import InputActivity from "./InputActivity";


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
      await dispatch ({
        dogData: resp.data
      });
    }
    getData();
    }, []);
  console.log(state.dogData);
  if (state.dogData === null || state.dogData === undefined) {
    return;
  } else {
    return (
      <div>
        {state.dogData.map((dog) => (
          <ul key={new Date() + dog.id} className="App">
            {dog.name}
            <li key={dog.id + dog.breed}>{breedString(dog.breed)}</li>
            <li key={dog.id + dog.gender}>{dog.gender}</li>
            <li key={dog.id + dog.weight + dog.height}>
              W: {dog.weight} H: {dog.height}
            </li>
            <InputActivity id={dog.id} />
          </ul>
        ))}
      </div>
    );
  }
}
