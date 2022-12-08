import {Line} from 'react-chartjs-2';
import request from "../services/api.requests";
import { useEffect, useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";


export default function StatCharts(props){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
    );
    const [dataArray, setDataArray] = useState([]);
    let chartCategory = props.chart.split(' ')[0].toLowerCase();
    let color = (chartCategory === 'weight' ? 'rgb(255, 99, 132)' : 'rgb(53, 162, 235)');
    useEffect( () => {
        async function getData() {
            let options = {
              url: chartCategory,
              method: "GET",
              params: {
                dog__id: props.id,
              },
            };
            let resp = await request(options);
            setDataArray(resp.data);
          }
          getData();
        }, [chartCategory, props.id]);

    const statValues = [];
    const timeValues = [];
    const statData = [];
    for(let item of dataArray){
        statValues.push(item.weight);
        timeValues.push(formatInTimeZone(item.time, 'America/New_York', 'yyyy-MM-dd HH:mm:ss'));
        statData.push([timeValues[timeValues.length - 1], item.weight]);
    }

    const optionsChart = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: props.category,
            },
        },
    };

    const data = {
        timeValues,
        datasets: [
            {
                label: chartCategory,
                data: statData,
                borderColor: color,
                backgroundColor: color,
            },
        ]
    }
    return <Line options={optionsChart} data={data} />
}