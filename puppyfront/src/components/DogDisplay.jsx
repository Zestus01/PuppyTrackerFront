import { useGlobalState } from "../context/GlobalState";
import { useState, useEffect } from "react";
import request from "../services/api.requests";
import InputActivity from "./InputActivity";
import InputBox from "./InputBox";
import ActivityDisplay from "./ActivityDisplay";
import dogFood from '../img/dogFood.png';
import dogPlay from '../img/dogPlay.png';
import dogPoop from '../img/dogPoop.png';
import dogMan from '../img/dogMan.png';
// import dogWoman from '../img/dogWoman.png';

export default function DogDisplay(props) {
  const [state, dispatch] = useGlobalState();
  const [dogData, setDogData] = useState([]);
  const [selected, setSelected] = useState(''); // Helps with autopopulating the activity input

  const [dogShow, setDogShow] = useState(false);
  const [activityShow, setActivityShow] = useState(false);
  const [dogID, setDogID] = useState(0);
  let selectedOptions = ['Food', 'Pee', 'Walk', 'Playtime']; 
  let photoArray = [dogFood, dogPoop, dogMan, dogPlay]
  let buttonStyleClass = ['foodBtn', 'bathroomBtn', 'walkBtn', 'playBtn'];

  useEffect(() => {
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
      <div key="main-dog-div" className="row container-fluid">
        {dogData.map((dog, index) => (
          <h3 
            key={new Date() + dog.id + index} 
            className="App"
          >
            {dog.name}
          
            <ActivityDisplay 
              id={dog.id} 
            />
            <InputActivity 
              setShow={setActivityShow} 
              show={activityShow} 
              id={dogID}
              selection={selected} 
            />
            <div className="container-fluid row d-flex justify-content-center my-3">
            {photoArray.map((buttonImage, index2) => {
              return(
                  <input 
                    type="image"
                    alt={selectedOptions[index2]} 
                    key={"activity-modal" + index + index2 + dog.id} 
                    className={"imgBtn col-2 mx-2 " + buttonStyleClass[index2]} 
                    src={buttonImage} 
                    onClick={() => {
                      setSelected(selectedOptions[index2]);
                      setDogID(dog.id);
                      setActivityShow(true);
                    }}
                  />
              )})}
            </div>
          </h3>
        ))}
        <div className="container row d-flex justify-content-center">
          <button 
            key="new-dog-modal" 
            className="btn p-1 col-8 col-sm-6" 
            onClick={() => setDogShow(true)}
          >
            New dog?
          </button>
        </div>
        <InputBox show={dogShow} setShow={setDogShow}/>
      </div>
    );
  }
}
