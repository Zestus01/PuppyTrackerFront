import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { GlobalProvider} from './context/GlobalState';
import Navbar from './Navbar';
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
