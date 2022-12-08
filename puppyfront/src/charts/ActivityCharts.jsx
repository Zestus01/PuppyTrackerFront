import {Pie} from "react-chartjs-2";
import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import { useState, useEffect } from "react";
import {Chart, Legend, Tooltip, ArcElement } from "chart.js";
import DogSelectionModal from "./DogSelectionModal";

export default function ActivityCharts(props){
    const [state] = useGlobalState();
    const [activityData, setActivityData] = useState([]);
    const [id, setID] = useState(0);
    const [show, setShow] = useState(false);
    let activityCount = {
        Food: 0,
        Pee: 0,
        Poop: 0,
        Walk: 0,
        Playtime: 0,
    }
    useEffect(() => {
        async function getData() {
        let options = {
            url: "nested/",
            method: "GET",
            params: {
            dog__id: id,
            },
        };
        let resp = await request(options);
        setActivityData(resp.data);
        }
        getData();
    }, [activityData]);

    for(let item of activityData){
        switch(item['activities']['name']){
            case 'Playtime':
                activityCount.Play += 1;
                break;
            case "Food":
                activityCount.Food += 1;
                break;
            case "Pee":
                activityCount.Pee += 1;
                break;
            case "Poop": 
            activityCount.Poop += 1;
                break;
            case "Walk":
                activityCount.Walk += 1;
                break;
            default:
                break;
        }
    }
    Chart.register(Legend, Tooltip, ArcElement);
    const pieData = {
        labels: Object.keys(activityCount),
        datasets: [
            {
                label: '# of Occurrences',
                data: Object.values(activityCount),
                backgroundColor:[
                        'rgb(250, 128, 114)',
                        'rgb(4, 185, 4)',
                        'rgb(165, 42, 42)',
                        'rgb(150, 225, 255)',
                        'rgb(255, 192, 203)',
                ],
                borderColor:[
                    'rgb(139, 0, 0)',
                    'rgb(34, 139, 34)',
                    'rgb(222, 184, 135)',
                    'rgb(70, 130, 180)',
                    'rgb(218, 112, 214)',

                ],
                borderWidth: 1,
            }
        ]
    }
    return (
        <>
            <button className="btn" onClick={() => setShow(!show)}>Select Dog</button>
            <DogSelectionModal setID={setID} show={show} setShow={setShow} />
            <Pie data={pieData} />
        </>
    )
}

