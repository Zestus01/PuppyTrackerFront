import {useState, useEffect} from "react";
import { useGlobalState } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import DogDelete from "./DogDelete";
import DogEdit from "./DogEdit";
import request from "../services/api.requests";
import toast, {Toaster} from 'react-hot-toast';

const Profile = () => {
  const [state, dispatch] = useGlobalState();
  let navigate = useNavigate();

  let dogData = (state.dogData ? state.dogData : []);
  const [showDelete, setDeleteShow] = useState(false);
  const [showEdit, setEditShow] = useState(false);
  const [stateDog, setStateDog] = useState(dogData[0]);
  const [dogID, setDogID] = useState(0);

  useEffect(() => {
    async function getData() {
      let options = {
        url: "dog/",
        method: "GET",
        params: {
          owner__id: state.currentUser.user_id,
        },
      };
      let resp = await request(options);
      await dispatch({
        dogData: resp.data,
      });
    }
    getData();
  }, [state.currentUser.user_id, dispatch, ]);

  function logout(){
    localStorage.clear() 
    navigate("/");
  }

  function handleEdit(){
    if(state.currentUser.username != "admin"){
      setEditShow(true)
    } else{
      toast.error("Can't edit on demo account");
    }
  }

  function handleDelete(){
    if(state.currentUser.username != "admin"){
      setDeleteShow(true);
    } else {
      toast.error("Can't delete on demo account");
    }
  }

  return (
    <div className="justify-content-center text-center col-12">
      <Toaster />
      <h2 key="welcome" >Welcome {state.currentUser.username}</h2>
      <h2 key="username">{state.currentUser.username}</h2>
      <h2 key='names'>{state.currentUser.first_name} {state.currentUser.last_name}</h2>
      {dogData.map( (dog, index) => {
          return(
            <div key={"dog-div" + dog.id}>
              <h2 
                key={new Date() + dog.id + index} 
                className="App"
              >
                {dog.name}
              </h2>
              <h5 key={"dog" + dog.id + dog.weight}> W: {dog.weight} </h5>
              <h5 key={dog.id + dog.weight}> H: {dog.height} </h5>
              <button 
                className="btn mx-2" 
                key={"edit-btn" + dog.id + index} 
                onClick={ () => {
                  setStateDog(dog);
                  handleEdit()
                }}
              >
                  Edit
                </button>
              <button 
                className="btn mx-2" 
                key={"delete-btn" + dog.id + index} 
                onClick={ () =>{
                  setDogID(dog.id);
                  handleDelete();
                }}
              >
                  DELETE
                </button>
              <DogDelete show={showDelete} setShow={setDeleteShow} id={dogID} />
              <DogEdit show={showEdit} setShow={setEditShow} dog={stateDog} />
            </div>    
          )
        })}
        <button key="logout" className="btn mt-4" onClick={logout}>Logout</button>
      </div>

  );
};

export default Profile;
