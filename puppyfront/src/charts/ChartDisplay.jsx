import ActivityCharts from "./ActivityCharts";
import StatCharts from "./StatCharts";
import DurationCharts from './DurationCharts';
import BreedComparisonChart from "./BreedComparisonChart";

export default function ChartDisplay(props){
    
    switch(props.chart){
        case 'Activity Counts':
            return <ActivityCharts id={props.dog.id} />
        case 'Walk/Playtime Duration':
            return <DurationCharts chart={props.chart} id={props.dog.id} />
        case 'Height Changes':
            return <StatCharts chart={props.chart} id={props.dog.id} />
        case 'Weight Changes':
            return <StatCharts chart={props.chart} id={props.dog.id} />
        case 'Breed Comparison':
            return <BreedComparisonChart dog={dog} />
        default:
            return
    }
}