import {useState, useRef} from 'react';
import { useGlobalState } from './context/GlobalState';
import request from './services/api.requests';

export default function InputBox(props){
    return (
        <div>
            <Inputs />
        </div>
    )
}

function Inputs(props){

    const [rerender, setRerender] = useState(true);
    async function sendData() {
      let options = {
        url: "dog/",
        method: "POST",
        data: {
            name: nameRef.current.value,
            gender: genderRef.current.value,
            weight: parseFloat(weightRef.current.value),
            height: parseFloat(heightRef.current.value),
            breed: ["Corgi"],
            owner: [state.currentUser.username],
        }
      };
      let resp = await request(options);
    }

    const nameRef = useRef(null);
    const weightRef = useRef(null);
    const heightRef = useRef(null);
    const genderRef = useRef(null);
    const [state, dispatch ] = useGlobalState();
    let boxNames = ['Dog Name', 'Weight', 'Height'] 
    let boxRefs = [nameRef, weightRef, heightRef]
    let radioNames = ['Male', 'Female']

    function handleSubmit(){
        sendData();
    }

    return (
        <>
            <button onClick={handleSubmit}>Submit a new dog</button>
            <label htmlFor="gender">Select the gender</label>
            <select key="gender" name="gender" id="gender" ref={genderRef}>
            {radioNames.map((but, index) =>
                <>
                    <option key={but + 2} value={but}>{but}</option>
                </>
            )}
            </select>
            {boxNames.map( (box, index) => 
                <input id={box} ref={boxRefs[index]} key={box} type="text" placeholder={box}></input>
            )}
        </>
    )
}


