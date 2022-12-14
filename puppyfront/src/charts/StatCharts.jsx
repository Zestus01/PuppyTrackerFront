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
                url: chartCategory + '/',
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

    const timeValues = [];
    const statData = [];
    for(let item of dataArray){
        timeValues.push(formatInTimeZone(item.time, 'America/New_York', 'yyyy-MM-dd HH:mm:ss'));
        statData.push([formatInTimeZone(item.time, 'America/New_York', 'yyyy-MM-dd HH:mm:ss'), item[chartCategory]]);
    }
    // Appends the current weight and height to stats
    let nowDate = formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MM-dd HH:mm:ss')

    chartCategory === 'weight' ? statData.push([nowDate, props.weight]) : statData.push([nowDate, props.height]);
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
    return (
        <div className="d-flex justify-content-center chart-display">
            <Line options={optionsChart} data={data} />
        </div>
    )
}