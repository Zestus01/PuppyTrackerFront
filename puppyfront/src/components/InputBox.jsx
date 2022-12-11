import {useState, useRef, useEffect} from 'react';
import { useGlobalState } from '../context/GlobalState';
import request from '../services/api.requests';
import { useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import toast, {Toaster} from 'react-hot-toast';


export default function InputBox(props){
    const [state] = useGlobalState();
    const [rerender, setRerender] = useState(true);
    const [breedList, setBreedList] = useState([]);
    
    const nameRef = useRef(null);
    const weightRef = useRef(null);
    const heightRef = useRef(null);
    const genderRef = useRef(null);
    const ageRef = useRef(null);
    const breedRef = useRef(null);

    let boxNames = ['Dog Name', 'Weight: Pounds', 'Height: Inches', "Age"] 
    let boxRefs = [nameRef, weightRef, heightRef, ageRef]
    let radioNames = ['Male', 'Female']

    function handleError(){
        let index = 0;
        for(let ref of boxRefs){
            if(ref.current.value === ''){
                toast.error('Please put in a value for ' + boxNames[index]);
                return false;
            }
            index ++;
        }
        if(isNaN(weightRef.current.value) || isNaN(heightRef.current.value)){
            toast.error("Please put in numerical value for weight or height");
            return false;
        } else if(parseFloat(weightRef.current.value) > 300 || parseFloat(heightRef.current.value) > 100){
            toast.error("Please put in a valid data for weight or height. Weight 1-300, Height 1-100");
            return false;
        }else if(parseFloat(weightRef.current.value) <= 0 || parseFloat(heightRef.current.value) <= 0){
            toast.error("Please put in a positive number")
            return false;
        }else if(isNaN(ageRef.current.value) || parseInt(ageRef.current.value) > 30 || parseInt(ageRef.current.value) < 0){
            toast.error("Please put in a valid number for age 0-30");
            return false;
        }
        return true;
    }

    useEffect(() => {
        async function getData() {
          let options = {
            url: "breedlist/",
            method: "GET",
          };
          let resp = await request(options);
          setBreedList(resp.data[0]['name']);
        }
        getData();
      }, []);

    let navigate = useNavigate();

    async function sendData(props) {
        if(handleError()){
            let dogObject = {
                name: nameRef.current.value,
                gender: genderRef.current.value,
                weight: parseFloat(weightRef.current.value),
                height: parseFloat(heightRef.current.value),
                age: parseInt(ageRef.current.value),
                breed: [breedRef.current.value],
                owner: [state.currentUser.user_id],
            };
            let options = {
            url: "dog/",
            method: "POST",
            data: {
                ...dogObject
            }
            };
            await request(options);
        }
    }
    
    
    function handleSubmit(props){
        sendData();
        setRerender(!rerender);
        navigate('');
    }

    function handleClose(props){
        props.setShow(false);
    }

    return (
            <Modal
                show={props.show}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                key="modal-dog-input"
            >
                <Modal.Header 
                    className="modal-style" 
                    closeButton onClick={() => {handleClose({...props})}}
                    key="modal-x-btn"
                >
                    <Modal.Title 
                        className="text-white" 
                        id="contained-modal-title-vcenter"
                        key="modal-title-dog-input"
                    >
                        Input the information of your new dog!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-style" key="modal-body-dog-input">
                    <div className="row justify-content-end" key="row-div-input-dog">
                            <button 
                                className='btn col-6 col-sm-4 py-2 justify-content-center align-center' 
                                key="button-submit-dog" 
                                onClick={() => handleSubmit({...props})}
                            >
                                Submit
                            </button>
                            <label 
                                className="col-6 col-sm-4 text-white d-flex justify-content-center"
                                key="label-gender"
                                htmlFor="gender"
                            >
                                Select the gender
                            </label>
                            <select 
                                className="col-6 col-sm-4 text-white modal-style" 
                                key="gender-select" 
                                name="gender" 
                                id="gender" 
                                ref={genderRef}
                            >
                            {radioNames.map((but, index) =>
                                <>
                                    <option 
                                        key={"gender-" + but} 
                                        value={but}
                                    >
                                            {but}
                                    </option>
                                </>
                            )}
                            </select>
                            <label 
                                className="col-6 col-sm-4 text-white d-flex justify-content-center"
                                key="label-breed"
                                htmlFor="breed"
                            >
                                Select the breed
                            </label>
                            <select 
                                className="col-6 col-sm-4 text-white modal-style" 
                                key="breed-select" 
                                name="breed" 
                                id="breed" 
                                ref={breedRef}
                            >
                            {breedList.map((name, index) =>
                                <>
                                    <option 
                                        key={"breed-" + name} 
                                        value={name}
                                    >
                                            {name}
                                    </option>
                                </>
                            )}
                            </select>
                        </div>
                    <div className='row form-group my-4' key="form-div">
                        {boxNames.map( (box, index) => 
                            <input 
                                className='form-style col-3' 
                                id={box} 
                                ref={boxRefs[index]} 
                                key={index + box}
                                type="text" 
                                placeholder={box}
                            />
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-style" key="modal-footer-dog-input">
                    <button 
                        className="btn" 
                        onClick={() => handleClose({...props})}
                        key="close-dog-btn-modal"
                    >
                        Close
                    </button>
                    <Toaster />
                </Modal.Footer>
            </Modal>
    )
}
