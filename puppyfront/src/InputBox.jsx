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
        })
    }

    return (
        <button className='btn button primary' onClick={postData}>Submit</button>
    )
}



