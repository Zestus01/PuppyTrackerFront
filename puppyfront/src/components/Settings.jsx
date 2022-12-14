import { useGlobalState } from "../context/GlobalState";
import { useRef,useState } from "react";
import {useNavigate } from "react-router-dom";
import Tutorial from "./Tutorial";

export default function Settings(){
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    return(
        <div className="container vh-100 d-flex align-items-center" >
            <div className="row justify-content-center align-items-center text-center">
                <h5 className="col-12">Settings in development</h5>
                <h5 className="col-12">Things to be developed: </h5>
                <ul>
                    <h6 className="col-12">
                        Pictures depending on gender of user
                    </h6> 
                    <h6 className="col-12">
                        Text size increasing
                    </h6> 
                    <h6 className="col-12">
                        Light dark mode
                    </h6> 
                </ul>
                <button className="btn col-5 mx-2" onClick={() => navigate('/home/credits')}>Credits</button>
                <button className="btn col-5 mx-2" onClick={() => setShow(!show)}>Tutorial</button>
                <button className="btn col-5 mx-2" onClick={() => navigate('/home/dog')}>Back</button>
                <Tutorial show={show} setShow={setShow} />
            </div>
        </div>
    )
}