import { useGlobalState } from "../context/GlobalState";
import { Modal } from "react-bootstrap";
import { useRef } from "react";

export default function ChartSelectionModal(props){
    const [state] = useGlobalState();
    const selectionRef = useRef(null);
    const chartRef = useRef(null);
    let chartChoices = [
        'Activity Counts',
        'Walk/Playtime Duration',
        'Height Changes',
        'Weight Changes',
        'Breed Comparison'
    ];
    let dogData = (state.dogData ? state.dogData : []);
    function handleClose(props){
        props.setShow(false);
    }

    function handleSelection(props){
        props.setDog((selectionRef.current.value).split(','));
        props.setChart(chartRef.current.value);
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
                    <div className="container-fluid" key="row-div-selection-dog">
                        <div className="row">
                            <label 
                                className="col-4 col-sm-6 text-white d-flex justify-content-center"
                                key="label-selection"
                                htmlFor="selection"
                            >
                                Select which dog
                            </label>
                            <select 
                                className="col-8 col-sm-6 text-white modal-style" 
                                key="dog-select" 
                                name="selection" 
                                id="selection" 
                                ref={selectionRef}
                            >
                            {dogData.map( (dog) => (
                                <>
                                    <option 
                                        key={"selection-" + dog} 
                                        value={[dog.id, dog.name, dog.weight, dog.height]}
                                    >
                                            {dog.name}
                                    </option>
                                </>
                            ))}
                            </select>
                            <label 
                                className="col-4 col-sm-6 text-white d-flex justify-content-center"
                                key="chart-selection"
                                htmlFor="selection"
                            >
                                Select which chart
                            </label>
                            <select 
                                className="col-8 col-sm-6 text-white modal-style" 
                                key="chart-select" 
                                name="selection" 
                                id="selection" 
                                ref={chartRef}
                            >
                            {chartChoices.map( (chart) => (
                                <>
                                    <option 
                                        key={"selection-" + chart} 
                                        value={chart}
                                    >
                                            {chart}
                                    </option>
                                </>
                            ))}
                            </select>
                        </div>
                        <div className="d-flex my-2 justify-content-end">
                            <button 
                                className='btn col-6 col-sm-4 py-2 align-center' 
                                key="button-submit-dog" 
                                onClick={() => handleSelection({...props})}
                            >
                                Submit
                            </button>
                        </div>
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