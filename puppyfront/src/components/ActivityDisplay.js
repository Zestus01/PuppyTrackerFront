import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import React, { useState, useRef } from "react";
import { formatInTimeZone } from 'date-fns-tz'
import { parse } from "date-fns";



function formatDate(time){
    return formatInTimeZone(time, 'America/New_York', 'yyyy-MM-dd HH:mm:ss zzz');
}

function dateDifference(time){

}

function timeDifference(time, dateFormat, splitChar){
    let nowDate = new Date();
    let timeDiff = [];
    let holder;
    time = formatInTimeZone(time, 'America/New_York', dateFormat).split(splitChar);
    nowDate = formatInTimeZone(nowDate, 'America/New_York', dateFormat).split(splitChar);
    for(let i = 0; i < time.length; i++){
            holder = (parseInt(nowDate[i]) - parseInt(time[i]));
            if(holder < 0){
                timeDiff[i - 1] -= 1;
                holder += 60;
            }
            timeDiff.push(holder);
    }
    return timeDiff.join(':');
}
// 2:2:1  0:27:8  2:1:41

export default function ActivityDisplay(props){
    const [activityData, setActivityData] = useState([]);
    const [state, dispatch] = useGlobalState();

    let activityArray = {
        Food: [],
        Pee: [],
        Poop: [],
        Walk: [],
        Play: [],
    }

    for(let item of activityData){
        switch(item['activities']['name']){
            case 'Playtime':
                activityArray.Play.push(item);
                break;
            case "Food":
                activityArray.Food.push(item);
                break;
            case "Pee":
                activityArray.Pee.push(item);
                break;
            case "Poop": 
                activityArray.Poop.push(item);
                break;
            case "Walk":
                activityArray.Walk.push(item);
                break;
        }
    }

    React.useEffect(() => {
        async function getData() {
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
        getData();
    }, []);

    return (
        <div key="main-activity-div" className="row">
            {Object.entries(activityArray).map( ([key, value]) =>{
                return(
                    <div key={key + 'div'} className="col-4">
                        <h5 key={"activity-h5" + key}>{key}</h5>
                        <SingleActivity activity={value} dogID={props.id}/>
                        <MultipleActivities activities={value} dogID={props.id}/>
                    </div>
                )
            })}
        </div>
    )
}

function SingleActivity(props){
    let item = props.activity;
    if (item.length === 0){
        return;
    } 
    let activity = item[0];
    let activityInstant = activity['activities'];
    return (
        <>
            <p 
                key={"Time diff" + activity.name + props.dogID}
            >
                Last record is:
            </p>
            <p key={activity.name + "year diff"}>     
                {timeDifference(activity.time, 'yyyy-MM-dd', '-')} YY-MM-DD
            </p>
            <p key={activity.name + "hour diff"}>
                {timeDifference(activity.time, 'HH:mm:ss', ':')} HH:MM:SS ago
            </p>    
            
            <p 
                key={props.dogID + activity.name}
            >
                {activityInstant["verb"]}&nbsp;
                {activity.amount}&nbsp; 
                {activityInstant["dimension"]} at&nbsp; 
                {formatDate(activity.time)}
            </p>
        </>   
    );
}

function MultipleActivities(props){


    if (props.activities.length >= 2) {
        let items = props.activities.slice(1);
        return (
            <div>
                <button
                    className="btn col-4"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#" + items[0]["activities"]["name"]}
                    aria-expanded="false"
                    aria-controls={items[0]["activities"]["name"]}
                    key={props.dogID + items[0].time}
                >
                    More
                </button>
                <div 
                    className="collapse" 
                    id={items[0]["activities"]["name"]}
                >
                    <div 
                        className="card card-body d-flex justify-content-center text-black"
                    >
                        {items.map((item, index) => (
                            
                            <p key={props.id + item.time}>
                                {item['activities']["verb"]} {item.amount} {item['activities']["dimension"]} at {formatDate(item.time)}. It was {item.description}
                                </p>
                        ))}
                    </div>
                </div>
            </div>
            )
        }
        
}