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
    const [breedData, setBreedData] = useState({});
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    useEffect(() => {
        async function getData(props) {
            let options = {
                url: "breed/",
                method: "GET",
                params: {
                    name: props.breed,
                  },
            };
        let resp = await request(options);
        setBreedData(resp.data[0]);
        }
        getData({...props});
    }, [props]);


    let minWeight, minHeight, maxHeight, maxWeight;
    console.log(breedData);
    console.log(props.gender.toLowerCase())
    for(let item of Object.keys(breedData)){
        console.log(breedData[item])
        if(item.includes(props.gender.toLowerCase())){
            if(item.includes('min_weight')){
                minWeight = breedData[item];
            }
            if(item.includes('min_height')){
                minHeight = breedData[item];
            }
            if(item.includes('max_weight')){
                maxWeight = breedData[item];
            }
            if(item.includes('max_height')){
                maxHeight = breedData[item];
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
                text: "Breed Comparisons for" + props.name
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
                label: props.name,
                data: [props.weight, props.height],
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