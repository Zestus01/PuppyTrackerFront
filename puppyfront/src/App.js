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
import ActivityCharts from './charts/ActivityCharts';

// Think about using links to navigate backwards instead of navigates


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
        <Route path="chart/" element={<ActivityCharts />} />
        <Route path="settings" element={<Settings />} >
          <Route path="credits" element={<Credits />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
