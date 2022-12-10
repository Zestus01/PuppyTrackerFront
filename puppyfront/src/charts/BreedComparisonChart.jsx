import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import request from '../services/api.requests';
import { useEffect, useState } from 'react';


export default function BreedComparisonChart(props){
    const [breedData, setBreedData] = useState([]);

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
    }, [props]);

}