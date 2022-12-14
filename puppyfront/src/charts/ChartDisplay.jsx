import ActivityCharts from "./ActivityCharts";
import StatCharts from "./StatCharts";
import DurationCharts from './DurationCharts';
import BreedComparisonChart from "./BreedComparisonChart";

export default function ChartDisplay(props){
    // props.dog = [ID, name, weight, height, gender]
    switch(props.chart){
        case 'Activity Counts':
            return <ActivityCharts id={props.dog[0]} />
        case 'Walk/Playtime Duration':
            return <DurationCharts chart={props.chart} id={props.dog[0]} />
        case 'Height Changes':
            return <StatCharts chart={props.chart} id={props.dog[0]} height={props.dog[3]} name={props.dog[1]} weight={props.dog[2]}  />
        case 'Weight Changes':
            return <StatCharts chart={props.chart} id={props.dog[0]} height={props.dog[3]} name={props.dog[1]} weight={props.dog[2]} />
        case 'Breed Comparison':
            return <BreedComparisonChart id={props.dog[0]} height={props.dog[3]} name={props.dog[1]} weight={props.dog[2]} breed={props.dog[4]} gender={props.dog[5]}/>
        default:
            return
    }
}