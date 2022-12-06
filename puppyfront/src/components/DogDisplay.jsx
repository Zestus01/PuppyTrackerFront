import { useGlobalState } from "../context/GlobalState";
import React, { useState, useEffect } from "react";
import request from "../services/api.requests";
import InputActivity from "./InputActivity";
import InputBox from "./InputBox";
import ActivityDisplay from "./ActivityDisplay";
import { Outlet, useNavigate } from "react-router-dom";

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
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    async function getData() {
      let options = {
        url: "dog/",
        method: "GET",
        params: {
          owner__id: state.currentUser.user_id,
        },
      };
      let resp = await request(options);
      await dispatch({
        dogData: resp.data,
      });
      setDogData(resp.data);
    }
    getData();
  }, []);

  if (dogData.length === 0) {
    return;
  } else {
    return (
      <div>
        {dogData.map((dog, index) => (
          <ul key={new Date() + dog.id + index} className="App">
            {dog.name}
            <ActivityDisplay id={dog.id} />
            <InputActivity id={dog.id} /> 
          </ul>
        ))}
        <button className="btn p-1" onClick={() => setShow(true)}>New dog?</button>
        <InputBox show={show} setShow={setShow}/>
      </div>
    );
  }
}
 /// Saving this for when I need to refrence these values
{/* <li key={index + dog.id + dog.breed + new Date()}>
  {breedString(dog.breed)}
</li>
<li key={dog.id + index + dog.gender + new Date()}>{dog.gender}</li>
<li key={dog.id + dog.weight + index + dog.height + new Date()}>
  W: {dog.weight} H: {dog.height}
</li> */}