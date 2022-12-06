import {useState, useRef} from 'react';
import { useGlobalState } from '../context/GlobalState';
import request from '../services/api.requests';
import { useNavigate, Outlet, redirect} from "react-router-dom";

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

    return (
            <div className='container-fluid row'>
                <button className='btn col-3 py-2 justify-content-center align-center' key="button" onClick={() => handleSubmit({...props})}>Submit</button>
                <label className="col-3" key="label" htmlFor="gender">Select the gender</label>
                <select className="col-3" key="gender" name="gender" id="gender" ref={genderRef}>
                {radioNames.map((but, index) =>
                    <>
                        <option key={but + 2 + index} value={but}>{but}</option>
                    </>
                )}
                </select>
                <div className='row form-group my-4'>
                    {boxNames.map( (box, index) => 
                        <input className='form-style col-3' id={box} ref={boxRefs[index]} key={index + box} type="text" placeholder={box}></input>
                    )}
                </div>
            </div>
    )
}

//   console.log([...oldDogData]);
//   let newData = [dogObject, ...oldDogData ];
//   console.log(newData);
//     await dispatch({
//       dogData:  dogObject
//     });

