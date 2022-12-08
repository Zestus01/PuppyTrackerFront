import { useState } from "react";

import DogSelectionModal from "./DogSelectionModal";
import ChartDisplay from "./ChartDisplay";

export default function ChartSelection(){
    const [dogModalShow, setDogModalShow] = useState(false);
    const [chartModalShow, setChartModalShow] = useState(false);
    const [chartDisplay, setChartDisplay] = useState('');
    const [dogID, setDogID] = useState(0);




    return(
        <>
            <button key="dog-selection" className="btn" onClick={() => setDogModalShow(!dogModalShow)}>Select options</button>
            <DogSelectionModal setID={setDogID} show={dogModalShow} setShow={setDogModalShow} setChart={setChartDisplay}/>
            <ChartDisplay chart={chartDisplay} id={dogID}/>
        </>
    )
}