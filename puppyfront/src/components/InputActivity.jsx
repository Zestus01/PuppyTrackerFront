import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import React, { useState, useRef } from "react";
import ReactDOM from 'react-dom/client';
import Modal from 'react-bootstrap/Modal'



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

    function handleData(props){
      let dataObj = {
        dog: props.id,
        amount: amountRef.current.value,
        activities: activRef.current.value,
        description: descRef.current.value,
      }
      if(activRef.current.value === "Poop and pee"){
        dataObj['activities'] = "Poop"
        sendData(dataObj, {...props})
        dataObj["activities"] = "Pee";
        sendData(dataObj), {...props};
      } else {
        sendData(dataObj, {...props});
      }
      handleClose({...props})
    }

    async function sendData(dataObj, props) {
      let options = {
        url: "create/",
        method: "POST",
        data: {
            ...dataObj
        },
      };
      let resp = await request(options);
      handleClose({...props});
    }
    
    function handleClose(props){
      props.setShow(false);
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

    activList.push("Poop and pee");
    let activityNames = ["Amount", "Description"];
    let reference = [amountRef, descRef];
    

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header closeButton onClick={() => handleClose({...props})} className="modal-style">
            <Modal.Title id="contained-modal-title-vcenter" className="text-white">
              Record your pet's activity
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-style">
            <label htmlFor="activity" className="text-white col-6">Select the activity</label>
            <select 
                className="modal-style text-white"
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
            <div className="row container-fluid">
              {activityNames.map((box, index) => (
                  <input
                      className="form-style col-3"
                      id={box}
                      ref={reference[index]}
                      key={box}
                      type="text"
                      placeholder={box}
                  ></input>
              ))}
            </div>
            <button className='btn' onClick={() => handleData({...props})}>Submit</button>
          </Modal.Body>
          <Modal.Footer className="modal-style">
            <button className="btn" onClick={() => handleClose({...props})}>Close</button>
          </Modal.Footer>
      </Modal>
    );
}