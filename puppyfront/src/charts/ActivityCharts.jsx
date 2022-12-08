import {Doughnut} from "react-chartjs-2";
import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import { useState, useEffect } from "react";
import {Chart, Legend, Tooltip, ArcElement } from "chart.js";


export default function ActivityCharts(props){
    
    const [activityData, setActivityData] = useState([]);

    let activityCount = {
        Food: 0,
        Pee: 0,
        Poop: 0,
        Walk: 0,
        Playtime: 0,
    }
    useEffect(() => {
        async function getData(props) {
            let options = {
                url: "nested/",
                method: "GET",
                params: {
                dog__id: props.id,
                },
            };
        let resp = await request(options);
        setActivityData(resp.data);
        }
        getData({...props});
    }, [activityData]);

    for(let item of activityData){
        switch(item['activities']['name']){
            case 'Playtime':
                activityCount.Playtime += 1;
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
            <Doughnut data={pieData} />
        </>
    )
}

