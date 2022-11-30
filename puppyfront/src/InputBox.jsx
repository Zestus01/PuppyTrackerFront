import {useState, useRef} from 'react';
import axios from 'axios'

const URL = 'https://8000-zestus01-puppytrackerba-c2ujgp24ze0.ws-us77.gitpod.io/dog/';

export default function InputBox(props){

    function postData(){
        axios.post(URL, {
            "name": "Rosie",
            "gender": "Female",
            "weight": 45,
            "height": 25,
            "breed": ["Corgi"],
            "owner": ["Zestus2"]
        });
    }

    function patchData(){
        axios.put(URL + '2/', {
            "name": "Rosie",
            "gender": "Female",
            "weight": 45,
            "height": 25,
            "breed": ["Labrador"]
        })
    }
    function deleteData(){
        axios.delete(URL + '11/');
    }

    return (
        <div>
            <Inputs />
            <button className='btn button primary' onClick={postData}>Submit</button>
            <button onClick={patchData}>Patch?</button>
            <button onClick={deleteData}>Delete</button>
        </div>
    )
}

function Inputs(props){
    const nameRef = useRef(null);
    const weightRef = useRef(null);
    const heightRef = useRef(null);
    const genderRef = useRef(null);
    let boxNames = ['Dog Name', 'Weight', 'Height'] 
    let boxRefs = [nameRef, weightRef, heightRef]
    let radioNames = ['Male', 'Female']

    function handleSubmit(){
        axios.post(URL, {
            "name": nameRef.current.value,
            "gender": genderRef.current.value,
            "weight": parseFloat(weightRef.current.value),
            "height": parseFloat(heightRef.current.value),
            "breed": ["Corgi"],
            "owner": ["Zestus"]
        });
    }

    return (
        <>
            <button onClick={handleSubmit}>Send request?</button>
            <label htmlFor="gender">Select the gender</label>
            <select key="gender" name="gender" id="gender" ref={genderRef}>
            {radioNames.map((but, index) =>
                <>
                    <option key={but} value={but}>{but}</option>
                </>
            )}
            </select>
            {boxNames.map( (box, index) => 
                <input id={box} ref={boxRefs[index]} key={box} type="text" placeholder={box}></input>
            )}
        </>
    )
}


