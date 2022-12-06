import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import React, { useState, useRef } from "react";

function ActivityList() {
  const [state, dispatch] = useGlobalState();
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
}


export default function InputActivity(props){
    const [state, dispatch] = useGlobalState();

    function handleData(){
      let dataObj = {
        dog: props.id,
        amount: amountRef.current.value,
        activities: activRef.current.value,
        description: descRef.current.value,
      }
      if(activRef.current.value === "Poop and pee"){
        dataObj['activities'] = "Poop"
        sendData(dataObj)
        dataObj["activities"] = "Pee";
        sendData(dataObj);
      } else {
        sendData(dataObj);
      }
    }

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
    async function sendData(dataObj) {
      let options = {
        url: "create/",
        method: "POST",
        data: {
            ...dataObj
        },
      };
      let resp = await request(options);
    }
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
        <button onClick={handleData}>Submit</button>
      </>
    );
}