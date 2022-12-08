import { Chart, Legend, Tooltip, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import request from "../services/api.requests";
import {useState, useEffect} from 'react';


export default function DurationCharts(props){

    const [dataArray, setDataArray ] = useState([]);
    
    Chart.register(Legend, Tooltip, ArcElement);
    let walkSum = 0;
    let playSum = 0;

    useEffect( () => {
    async function getData() {
        let options = {
            url: 'activity',
            method: "GET",
            params: {
                dog__id: props.id,
                activities__name: ['Playtime', 'Walk'],
            },
        };
        let resp = await request(options);
        setDataArray(resp.data);
        }
        getData();
    }, [props]);

    for(let item of dataArray){
        if(item.activities === 'Walk'){
            walkSum += parseInt(item.amount);
        } else if(item.activities === 'Playtime'){
            playSum += parseInt(item.amount);
        }
    }

    const chartData = {
        labels: ['Playtime', 'Walk'],
        datasets: [
            {
                label: 'Total time: ',
                data: [playSum, walkSum],
                backgroundColor: [
                    'rgb(255, 192, 203)',
                    'rgb(150, 225, 255)',
                ],
                borderColor: [
                    'rgb(218, 112, 214)',
                    'rgb(70, 130, 180)',
                ],
                borderWidth: 3,
            },
        ],
    };

    return <Doughnut data={chartData} />
}