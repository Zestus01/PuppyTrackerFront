import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import React, { useState, useRef } from "react";
import { format } from "date-fns";

export default function ActivityDisplay(props){
    const [activityData, setActivityData] = useState([]);
    const [state, dispatch] = useGlobalState();

    let activityNames = state.activityList;
    let foodActivity = [];
    let peeActivity = [];
    let poopActivity = [];
    let walkActivity = []
    let playActivity = [];
    let activArray = [foodActivity, peeActivity, poopActivity, walkActivity, playActivity];

    for(let i = 0; i < activArray.length; i++){
        activArray[i] = activityData.filter( (item) => {
            // console.log(item['activities']['name']);
            // console.log(activityNames[i]);
            return item['activities']['name'] === activityNames[i];
        });
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
    // console.log(activityData);
    return (
        <div key="main-activity-div" className="row">
            {activArray.map( (item, index) => {
                // {console.log("map item", item)}
                return (
                    <div key={index + 'div'} className="col-4">
                        <h5 key={"activity-h5" + activityNames[index]['name']}>{activityNames[index]['name']}</h5>
                        <SingleActivity activity={item} dogID={props.id}/>
                        <MultipleActivities activities={item} dogID={props.id}/>
                    </div>
                )} 
            )}
        </div>
    )

}

function SingleActivity(props){
    // console.log('hello');
    let item = props.activity;
    if (item.length === 0){
        return;
    } 
    // console.log('Hi there')
    let activity = item[0];
    let activityInstant = activity['activities'];
    return (
            <p key={props.dogID + activity.name}>
                {activityInstant["verb"]} {activity.amount} {activityInstant["dimension"]} at {activity.time}
            </p>
    );
}

function MultipleActivities(props){
    console.log("Multiple activ", props);
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