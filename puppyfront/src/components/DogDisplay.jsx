import { useGlobalState } from "../context/GlobalState";
import React, { useState, useEffect } from "react";
import request from "../services/api.requests";
import InputActivity from "./InputActivity";
import InputBox from "./InputBox";
import ActivityDisplay from "./ActivityDisplay";
import { Outlet, useNavigate } from "react-router-dom";
import dogFood from '../img/dogFood.png';
import dogPlay from '../img/dogPlay.png';
import dogPoop from '../img/dogPoop.png';
import dogMan from '../img/dogMan.png';
import dogWoman from '../img/dogWoman.png';


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

  const [dogShow, setDogShow] = useState(false);
  const [activityShow, setActivityShow] = useState(false);
  let photoArray = [dogFood, dogPoop, dogMan, dogPlay]
  let buttonStyleClass = ['foodBtn', 'bathroomBtn', 'walkBtn', 'playBtn'];
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
      <div className="row container-fluid">
        {dogData.map((dog, index) => (
          <ul key={new Date() + dog.id + index} className="App">
            {dog.name}
            <ActivityDisplay id={dog.id} />
            <InputActivity setShow={setActivityShow} show={activityShow} id={dog.id} />
            <div className="container-fluid row d-flex justify-content-center">
            {photoArray.map((buttonImage, index) => {
              return(
                  <input type="image" className={"imgBtn col-2 mx-2 " + buttonStyleClass[index]} src={buttonImage} onClick={() => setActivityShow(true)}/>
              )})}
            </div>
          </ul>
        ))}
        <div className="container row d-flex justify-content-center">
          <button className="btn p-1 col-6" onClick={() => setDogShow(true)}>New dog?</button>
        </div>
        <InputBox show={dogShow} setShow={setDogShow}/>
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