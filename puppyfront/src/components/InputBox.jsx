import {useState, useRef} from 'react';
import { useGlobalState } from '../context/GlobalState';
import request from '../services/api.requests';
import { useNavigate, Outlet, redirect} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';



export default function InputBox(props){
    const [state, dispatch ] = useGlobalState();
    const [rerender, setRerender] = useState(true);


    let navigate = useNavigate();

    async function sendData(props) {
        let oldDogData = state.dogData;
        let dogObject = {
            name: nameRef.current.value,
            gender: genderRef.current.value,
            weight: parseFloat(weightRef.current.value),
            height: parseFloat(heightRef.current.value),
            age: ageRef.current.value,
            breed: ["Corgi"],
            owner: [state.currentUser.user_id],
        };
        let options = {
        url: "dog/",
        method: "POST",
        data: {
            ...dogObject
        }
        };
        let resp = await request(options);
        props.setDogData([...props.dogData, dogObject]);
    }
    
    const nameRef = useRef(null);
    const weightRef = useRef(null);
    const heightRef = useRef(null);
    const genderRef = useRef(null);
    const ageRef = useRef(null);

    let boxNames = ['Dog Name', 'Weight', 'Height', "Age"] 
    let boxRefs = [nameRef, weightRef, heightRef, ageRef]
    let radioNames = ['Male', 'Female']
    
    function handleSubmit(props){
        sendData({...props});
        setRerender(!rerender);
        navigate('');
    }

    function handleClose(props){
        props.setShow(false);
    }

    return (
            <Modal
                show={props.show}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header 
                    className="modal-style" 
                    closeButton onClick={() => {handleClose({...props})}}
                    key="modal-x-btn"
                >
                    <Modal.Title 
                        className="text-white" 
                        id="contained-modal-title-vcenter"
                    >
                        Input the information of your new dog!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-style">
                    <div className="row" key="row-div">
                        <button 
                            className='btn col-3 py-2 justify-content-center align-center' 
                            key="button" 
                            onClick={() => handleSubmit({...props})}
                        >
                            Submit
                        </button>
                        <label 
                            className="col-3 text-white d-flex justify-content-center"
                            key="label"
                            htmlFor="gender"
                        >
                            Select the gender
                        </label>
                        <select 
                            className="col-3 text-white modal-style" 
                            key="gender" 
                            name="gender" 
                            id="gender" 
                            ref={genderRef}
                        >
                        {radioNames.map((but, index) =>
                            <>
                                <option 
                                    key={but + 2 + index} 
                                    value={but}
                                >
                                        {but}
                                </option>
                            </>
                        )}
                            
                        </select>
                    </div>
                    <div className='row form-group my-4' key="form-div">
                        {boxNames.map( (box, index) => 
                            <input 
                                className='form-style col-3' 
                                id={box} 
                                ref={boxRefs[index]} 
                                key={index + box}
                                type="text" 
                                placeholder={box}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-style">
                    <button 
                        className="btn" 
                        onClick={() => handleClose({...props})}
                        key="close-dog-btn"
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
    )
}


//   console.log([...oldDogData]);
//   let newData = [dogObject, ...oldDogData ];
//   console.log(newData);
//     await dispatch({
//       dogData:  dogObject
//     });

