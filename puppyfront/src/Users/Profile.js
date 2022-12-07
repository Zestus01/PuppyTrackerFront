import {useState} from "react";
import { useGlobalState } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import DogDelete from "./DogDelete";
import DogEdit from "./DogEdit";


const Profile = () => {
  const [state] = useGlobalState();
  let navigate = useNavigate();

  let dogData = (state.dogData ? state.dogData : []);
  const [showDelete, setDeleteShow] = useState(false);
  const [showEdit, setEditShow] = useState(false);

  function logout(){
    localStorage.clear()
    navigate("/");
  }

  function handleEdit(){
    setEditShow(true);
  }
  
  function handleDelete(){
    setDeleteShow(true);
  }

  return (
    <div className="text-center">
      <h2 >Welcome {state.currentUser.username}</h2>
      <h2 >{state.currentUser.username}</h2>
      <h2 >{state.currentUser.first_name} {state.currentUser.last_name}</h2>
      {dogData.map( (dog, index) => {
          return(
            <div>
              <h3 
                key={new Date() + dog.id + index} 
                className="App"
              >
                {dog.name}
              </h3>
              <h5>W: {dog.weight}</h5>
              <h5>H: {dog.height}</h5>
              <button className="btn" key={"edit-btn" + index} onClick={handleEdit}>Edit</button>
              <button className="btn" key={"delete btn" + index} onClick={handleDelete}>DELETE</button>
              <DogDelete show={showDelete} setShow={setDeleteShow} id={dog.id} />
              <DogEdit show={showEdit} setShow={setEditShow} id={dog.id} />
            </div>    
          )
        })}
        <button className="btn mt-4" onClick={logout}>Logout</button>
      </div>

  );
};

export default Profile;
