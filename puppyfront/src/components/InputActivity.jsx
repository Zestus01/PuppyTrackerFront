import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import React, { useState, useRef } from "react";
import ReactDOM from 'react-dom/client';
import Modal from 'react-bootstrap/Modal'


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
        dataObj['activities'] = "Poop";
        sendData(dataObj, {...props});
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
  let dimensionList = [];
  let selectedActivity = [];
  let placeholderItem;
  if(state.activityList){
      state.activityList.map( (item) => {
        if(item.name !== props.selection){
          activList.push(item.name);
          dimensionList.push(item.dimension);
        } else {
          placeholderItem = item;
        }
      })
  }
  console.log(placeholderItem);
  activList.push("Poop and pee");
  dimensionList.push('Size')
  if(placeholderItem){
    selectedActivity.push(placeholderItem.name);
    selectedActivity.push(placeholderItem.dimension);
  }
  let activityNames = ["Amount", "Description"];
  let reference = [amountRef, descRef];
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header 
          closeButton onClick={() => handleClose({...props})} 
          className="modal-style"
        >
          <Modal.Title 
            id="contained-modal-title-vcenter" 
            className="text-white"
          >
            Record your pet's activity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-style">
          <label 
            key="activityLabel" 
            htmlFor="activity" 
            className="text-white col-6"
          >
            Select the activity
          </label>
          <select 
              className="form-style text-white"
              key="activity" 
              name="activity" 
              id="activity" 
              ref={activRef}
              defaultValue={selectedActivity[0]}
            >
              {activList.map((but, index) => (
                  <option key={but} value={but}>
                      {but +": " + dimensionList[index]}
                  </option>
              ))}
              <option key="selected" value={selectedActivity[0]}>
                {selectedActivity[0] + ": " + selectedActivity[1]}
              </option>
          </select>
          <div className="row container-fluid form-group">
            {activityNames.map((box, index) => (
                <input
                    className="form-style col-3"
                    id={box}
                    ref={reference[index]}
                    key={box}
                    type="text"
                    placeholder={box}
                    autoComplete="off"
                />
            ))}
          </div>
          <button 
            className='btn' 
            onClick={() => handleData({...props})}
            key="modal-submit-btn"
          >
            Submit
          </button>
        </Modal.Body>
        <Modal.Footer className="modal-style">
          <button 
            className="btn" 
            onClick={() => handleClose({...props})}
            key="modal-close-btn"
          >
            Close
          </button>
        </Modal.Footer>
    </Modal>
  );
}