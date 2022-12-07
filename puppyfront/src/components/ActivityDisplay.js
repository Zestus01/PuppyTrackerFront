import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import React, { useState, useRef } from "react";
import { format } from "date-fns";

export default function ActivityDisplay(props){
    const [activityData, setActivityData] = useState([]);
    const [state, dispatch] = useGlobalState();

    let activityArray = {
        food: [],
        pee: [],
        poop: [],
        walk: [],
        play: [],
    }

    for(let item of activityData){
        switch(item['activities']['name']){
            case 'Playtime':
                activityArray.play.push(item);
                break;
            case "Food":
                activityArray.food.push(item);
                break;
            case "Pee":
                activityArray.pee.push(item);
                break;
            case "Poop": 
                activityArray.poop.push(item);
                break;
            case "Walk":
                activityArray.walk.push(item);
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
    // console.log('hello');
    let item = props.activity;
    if (item.length === 0){
        return;
    } 
    console.log('Hi there')
    let activity = item[0];
    let activityInstant = activity['activities'];
    return (
            <p key={props.dogID + activity.name}>
                {activityInstant["verb"]} {activity.amount} {activityInstant["dimension"]} at {activity.time}
            </p>
    );
}

function MultipleActivities(props){
    if (props.activities.length >= 2) {
        let items = props.activities.slice(1);
        console.log(items);
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
                        className="card card-body d-flex justify-content-center"
                    >
                        {items.map((item, index) => (
                            <p key={props.id + item.time}>{item['activities']["verb"]} {item.amount} {item['activities']["dimension"]} at {item.time}. It was {item.description}</p>
                        ))}
                    </div>
                </div>
            </div>
            )
        }
        
}