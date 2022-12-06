import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, useLocation } from "react-router-dom";
import { useGlobalState } from "./context/GlobalState";
import Navbar from './Navbar';
import './App.css';
import Login from "./Users/Login";
import Register from "./Users/Register"; 
import DogDisplay from './components/DogDisplay'; 
import Settings from './components/Settings';
import Profile from './components/Profile';

function App() {
  const [ state, dispatch ] = useGlobalState();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home/" element={<Header />} >
        <Route path="dog/" element={<DogDisplay />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
