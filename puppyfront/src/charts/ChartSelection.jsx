import { useState } from "react";

import ChartSelectionModal from "./ChartSelectionModal";
import ChartDisplay from "./ChartDisplay";

export default function ChartSelection(){
    const [chartModalShow, setChartModalShow] = useState(false);
    const [chartDisplay, setChartDisplay] = useState('');
    const [dogID, setDogID] = useState(0);


    return(
        <>
            <button key="dog-selection" className="btn" onClick={() => setChartModalShow(!chartModalShow)}>Select options</button>
            <ChartSelectionModal setID={setDogID} show={chartModalShow} setShow={setChartModalShow} setChart={setChartDisplay}/>
            <ChartDisplay chart={chartDisplay} id={dogID}/>
        </>
    )
}