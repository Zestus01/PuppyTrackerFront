import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.requests";
import React, { useState, useRef } from "react";
import { format } from "date-fns";

export default function ActivityDisplay(props){
    const [activityData, setActivData] = useState([]);
    const [state, dispatch] = useGlobalState();

    let activityNames = state.activityList;
    let foodActiv = [];
    let peeActiv = [];
    let poopActiv = [];
    let activArray = [foodActiv, peeActiv, poopActiv];

    for(let i = 0; i < activArray.length; i++){
        activArray[i] = activityData.filter( (item) => {
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
        setActivData(resp.data);
        }
        getData();
    }, []);

    return (
        <div className="row">
            {activArray.map( (item, index) => (
                <div className="col-4">
                    <h5>{activityNames[index]}</h5>
                    <SingleActivity activity={item} />
                    <MultipleActivities activities={item}/>
                </div>
            ))}
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
        <div>
            <p>
            {activityInstant["verb"]} {activity.amount} {activityInstant["dimension"]} at {activity.time}
            </p>
        </div>
    );
}

function MultipleActivities(props){
    console.log(props.activities);
    if (props.activities.length >= 2) {
        let items = props.activities.slice(1);
        console.log(items);
        return (
            <div>
                <button
                className="btn btn-outline-warning"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#" + items[0]["activities"]["name"]}
                aria-expanded="false"
                aria-controls={items[0]["activities"]["name"]}
                >
                More
                </button>
                <div className="collapse" id={items[0]["activities"]["name"]}>
                    <div className="card card-body">
                        {items.map((item, index) => (
                        <p>{item['activities']["verb"]} {item.amount} {item['activities']["dimension"]} at {item.time}. It was {item.description}</p>
                        ))}
                    </div>
                </div>
            </div>
            )
        }
        
}