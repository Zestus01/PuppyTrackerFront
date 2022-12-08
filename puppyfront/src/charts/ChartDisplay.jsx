import ActivityCharts from "./ActivityCharts";
import StatCharts from "./StatCharts";
import DurationCharts from './DurationCharts';

export default function ChartDisplay(props){


    
    switch(props.chart){
        case 'Activity Counts':
            return <ActivityCharts id={props.id} />
        case 'Walk Duration':
            return <DurationCharts chart={props.chart} id={props.id} />
        case 'Playtime Duration':
            return <DurationCharts chart={props.chart} id={props.id} />
        case 'Height Changes':
            return <StatCharts chart={props.chart} id={props.id} />
        case 'Weight Changes':
            return <StatCharts chart={props.chart} id={props.id} />
        default:
            return
    }
}