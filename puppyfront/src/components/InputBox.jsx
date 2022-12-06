import {useState, useRef} from 'react';
import { useGlobalState } from '../context/GlobalState';
import request from '../services/api.requests';

export default function InputBox(props){

    const [state, dispatch ] = useGlobalState();
    const [rerender, setRerender] = useState(true);
    
    async function sendData(props) {
        let oldDogData = state.dogData;
        let dogObject = {
            name: nameRef.current.value,
            gender: genderRef.current.value,
            weight: parseFloat(weightRef.current.value),
            height: parseFloat(heightRef.current.value),
            age: ageRef.current.value,
            breed: ["Corgi"],
            owner: [state.currentUser.username],
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
    }

    return (
        <>
            <button key="button" onClick={() => handleSubmit({...props})}>Submit a new dog</button>
            <label key="label" htmlFor="gender">Select the gender</label>
            <select key="gender" name="gender" id="gender" ref={genderRef}>
            {radioNames.map((but, index) =>
                <>
                    <option key={but + 2 + index} value={but}>{but}</option>
                </>
            )}
            </select>
            {boxNames.map( (box, index) => 
                <input id={box} ref={boxRefs[index]} key={index + new Date()} type="text" placeholder={box}></input>
            )}
        </>
    )
}

//   console.log([...oldDogData]);
//   let newData = [dogObject, ...oldDogData ];
//   console.log(newData);
//     await dispatch({
//       dogData:  dogObject
//     });

