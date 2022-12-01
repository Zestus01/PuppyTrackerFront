import axios from 'axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider, useGlobalState } from './context/GlobalState';
import Navbar from './Navbar';
import './App.css';

const URL = 'https://8000-zestus01-puppytrackerba-c2ujgp24ze0.ws-us77.gitpod.io/dog/';

function GetUser(){
  const [state, dispatch] = useGlobalState();
  return <h1>{state.currentUser}</h1>
}

function App() {

  return (
    <GlobalProvider>
      <div className="App">
        <Navbar />
      </div>
    </GlobalProvider>
  );
}

export default App;
