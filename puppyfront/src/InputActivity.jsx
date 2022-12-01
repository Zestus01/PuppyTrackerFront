import { useGlobalState } from "./context/GlobalState";
import request from "./services/api.requests";
import React, { useState, useRef } from "react";

function ActivityList() {
  const [state, dispatch] = useGlobalState();
  const [activList, setActivList] = useState([]);
  React.useEffect(() => {
    async function getData() {
      let options = {
        url: "list/",
        method: "GET",
      };
      let resp = await request(options);
      await dispatch({
        activityList: resp.data,
      });
    }
    getData();
  }, []);
  console.log(state.activityList);
}


export default function InputActivity(props){
    const [state, dispatch] = useGlobalState();

    const amountRef = useRef(null);
    const descRef = useRef(null);
    const activRef = useRef(null);
    let activList = [];
    if(state.activityList){
        state.activityList.map( (item) => {
            activList.push(item.name);
        })
    }
    let activityNames = ["Amount", "Description"];
    let reference = [amountRef, descRef];
     async function sendData() {
      let options = {
        url: "create/",
        method: "POST",
        data: {
            dog: props.id,
            amount: amountRef.current.value,
            activities: activRef.current.value,
            description: descRef.current.value,

        },
      };
      let resp = await request(options);
    }
    console.log('DogID');
    console.log(props.id);
    return (
      <>
        <ActivityList />
        <label htmlFor="activity">Select the activity</label>
        <select 
            key="activity" 
            name="activity" 
            id="activity" 
            ref={activRef}>
            {activList.map((but) => (
                <option key={but} value={but}>
                    {but}
                </option>
            ))}
        </select>
        {activityNames.map((box, index) => (
            <input
                id={box}
                ref={reference[index]}
                key={box}
                type="text"
                placeholder={box}
            ></input>
        ))}
        <button onClick={sendData}>Submit</button>
      </>
    );
}