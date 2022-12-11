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
import { useGlobalState } from '../context/GlobalState';


export default function BreedComparisonChart(props){
    const [breedData, setBreedData] = useState({});
    const [state] = useGlobalState();
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )
    let dogData = (state.dogData ? state.dogData : []);
    console.log(dogData);
    console.log(props.id);
    useEffect(() => {
        async function getData(props) {
            let options = {
                url: "breed/" + props.dog.breed,
                method: "GET",
            };
        let resp = await request(options);
        setBreedData(resp.data);
        }
        getData({...props});
    }, [props]);
    
    let minWeight, minHeight, maxHeight, maxWeight;
    for(const [key, value] of Object.entries(breedData)){
        if(key.includes(props.dog.gender.toLowerCase())){
            if(key.includes('min_weight')){
                minWeight = value
            }
            if(key.includes('min_height')){
                minHeight = value
            }
            if(key.includes('max_weight')){
                maxWeight = value
            }
            if(key.includes('max_height')){
                maxHeight = value
            }
        }
    }
    let mins = [minWeight, minHeight];
    let maxes = [maxWeight, maxHeight];

    const options = {
        responsive: true,
        plugins: {
            legend:{
                position:'top',
            },
            title:{
                display: true,
                text: "Breed Comparisons"
            }
        }
    }

    const labels = ['Weight', "Height"]

    const data = {
        labels,
        datasets: [
            {
                label:"Minimums",
                data: mins,
                backgroundColor: 'rgb(34,139,34)',
            },
            {
                label: props.dog.name,
                data: [props.dog.weight, props.dog.height],
                backgroundColor: 'rgb(0,0,128)',
            },
            {
                label: "Maxes",
                data: maxes,
                backgroundColor: 'rgb(80, 32, 40)',
            },
        ],
    }
    return <Bar options={options} data={data} />
}