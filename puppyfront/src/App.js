import {useEffect} from 'react';
import { Routes, Route} from "react-router-dom";
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
import ChartSelection from './charts/ChartSelection';


function App() {
  const [,dispatch ] = useGlobalState();
  
  // Loads in the activity list 
  useEffect(() => {
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
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/home/" element={<Header />} >
        <Route path="dog/" element={<DogDisplay />} />
        <Route path="chart/" element={<ChartSelection />} />
        <Route path="settings" element={<Settings />} />
        <Route path="credits" element={<Credits />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;

