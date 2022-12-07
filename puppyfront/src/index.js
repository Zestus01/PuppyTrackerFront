import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-bootstrap";

<a href="https://www.flaticon.com/free-icons/playing" title="playing icons">
  Playing icons created by Freepik - Flaticon
</a>;
<a href="https://www.flaticon.com/free-icons/poop" title="poop icons">
  Poop icons created by Voysla - Flaticon
</a>;
<a href="https://www.flaticon.com/free-icons/dog-food" title="dog food icons">
  Dog food icons created by Freepik - Flaticon
</a>;
<a href="https://www.flaticon.com/free-icons/walk" title="walk icons">
  Walk icons created by Freepik - Flaticon
</a>;
<a
  href="https://www.flaticon.com/free-icons/dog-walking"
  title="dog walking icons"
>
  Dog walking icons created by surang - Flaticon
</a>;
<a href="https://www.flaticon.com/free-icons/dog" title="dog icons">
  Dog icons created by Vitaly Gorbachev - Flaticon
</a>;
<a href="https://www.flaticon.com/free-icons/chart" title="chart icons">Chart icons created by DinosoftLabs - Flaticon</a>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
