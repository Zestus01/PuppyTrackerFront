import axios from 'axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import DogDisplay from './DogDisplay';
import InputBox from './InputBox';
import { GlobalProvider } from './authentication /GlobalState';
import './App.css';

const URL = 'https://8000-zestus01-puppytrackerba-c2ujgp24ze0.ws-us77.gitpod.io/dog/';

function GetUser(){
  const [state, dispatch] = useGlobalState();
  return <h1>{state.currentUser}</h1>
}

function App() {
  const [dogData, setDogData] = useState(null);
  React.useEffect(() =>{
    axios.get(URL).then((response) => setDogData(response.data));
  }, []);

  return (
    <div className="App">
      <GetUser />
      <DogDisplay data={dogData}/>
      <InputBox />
    </div>
  );
}

export default App;
