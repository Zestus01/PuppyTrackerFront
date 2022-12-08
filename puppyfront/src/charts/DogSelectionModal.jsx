import { useGlobalState } from "../context/GlobalState";
import { Modal } from "react-bootstrap";
import { useRef } from "react";

export default function DogSelectionModal(props){
    const selectionRef = useRef(null);
    const [state] = useGlobalState();
    let dogData = (state.dogData ? state.dogData : []);

    function handleClose(props){
        props.setShow(false);
    }

    function handleSelection(props){
        props.setID(selectionRef.current.value);
        handleClose({...props});
    }
    
    return (
        <Modal
                show={props.show}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                key="modal-dog-selection-chart"
            >
                <Modal.Header 
                    className="modal-style" 
                    closeButton onClick={() => {handleClose({...props})}}
                    key="modal-x-btn-selection"
                >
                    <Modal.Title 
                        className="text-white" 
                        id="contained-modal-title-vcenter"
                        key="modal-title-dog-selection"
                    >
                        Select the dog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-style" key="modal-body-dog-selection">
                    <div className="row" key="row-div-selection-dog">
                        <button 
                            className='btn col-3 py-2 justify-content-center align-center' 
                            key="button-submit-dog" 
                            onClick={() => handleSelection({...props})}
                        >
                            Submit
                        </button>
                        <label 
                            className="col-3 text-white d-flex justify-content-center"
                            key="label-selection"
                            htmlFor="selection"
                        >
                            Select which dog
                        </label>
                        <select 
                            className="col-3 text-white modal-style" 
                            key="dog-select" 
                            name="selection" 
                            id="selection" 
                            ref={selectionRef}
                        >
                        {dogData.map( (dog) => (
                            <>
                                <option 
                                    key={"selection-" + dog} 
                                    value={dog.id}
                                >
                                        {dog.name}
                                </option>
                            </>
                        ))}
                            
                        </select>
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
                </Modal.Footer>
            </Modal>
    )
}