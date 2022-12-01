import axios from 'axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalProvider, useGlobalState } from './context/GlobalState';
import Navbar from './Navbar';
import request from './services/api.requests';
import './App.css';

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
