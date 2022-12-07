import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, useLocation } from "react-router-dom";
import { useGlobalState } from "./context/GlobalState";
import request from './services/api.requests';
import './App.css';
import Login from "./Users/Login";
import Register from "./Users/Register"; 
import DogDisplay from './components/DogDisplay'; 
import Settings from './components/Settings';
import Profile from './Users/Profile'
import Header from './components/Header';
import Credits from './components/Credits';
import InputBox from './components/InputBox';

function App() {
  const [ state, dispatch ] = useGlobalState();

  // Loads in the activity list 
  React.useEffect(() => {
    async function getData() {
      let options = {
        url: "list/",
        method: "GET",
      };
      let resp = await request(options);
      await dispatch({
        activityList: resp.data,
      });
    }
    getData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home/" element={<Header />} >
        <Route path="dog/" element={<DogDisplay />} />
        <Route path="settings" element={<Settings />} >
          <Route path="credits" element={<Credits />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
