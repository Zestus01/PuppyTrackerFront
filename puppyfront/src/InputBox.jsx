import {useState, useRef} from 'react';
import axios from 'axios'

export default function InputBox(props){
    let boxNames = ['Dog Name', 'Weight', 'Height']
    const URL = 'https://8000-zestus01-puppytrackerba-c2ujgp24ze0.ws-us77.gitpod.io/dog/';

    function postData(){
        axios.post(URL, {
            "name": "Rosie",
            "gender": "Female",
            "weight": 45,
            "height": 25,
            "breed": ["Corgi"]
        });
    }

    function patchData(){
        axios.put(URL + '2/', {
            "name": "Rosie",
            "gender": "Female",
            "weight": 45,
            "height": 25,
            "breed": ["Labador"]
        })
    }
    function deleteData(){
        axios.delete(URL + '11/');
    }

    return (
        <div>
            <button className='btn button primary' onClick={postData}>Submit</button>
            <button onClick={patchData}>Patch?</button>
            <button onClick={deleteData}>Delete</button>
        </div>
    )
}



