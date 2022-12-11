import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';

export default function ChartModal(props){
    const chartRef = useRef(null);
    let chartChoices = [
        'Activity Counts',
        'Walk Duration',
        'Playtime Duration',
        'Height Changes',
        'Weight Changes',
    ];

    function handleClose(props){
        props.setShow(false);
    }

    function handleSelection(props){
        props.setChart(chartRef.current.value);
        handleClose({...props});
    }
    
    return (
        <Modal
                show={props.show}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                key="modal-chart-selection-chart"
            >
                <Modal.Header 
                    className="modal-style" 
                    closeButton onClick={() => {handleClose({...props})}}
                    key="modal-x-btn-charts"
                >
                    <Modal.Title 
                        className="text-white" 
                        id="contained-modal-title-vcenter"
                        key="modal-title-chart-selection"
                    >
                        Chart Selection
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-style" key="modal-body-chart-selection">
                    <div className="row" key="row-div-selection-chart">
                        <label 
                            className="col-3 text-white d-flex justify-content-center"
                            key="chart-selection"
                            htmlFor="selection"
                        >
                            Select which chart
                        </label>
                        <select 
                            className="col-3 text-white modal-style" 
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
                        <button 
                            className='btn col-3 py-2 justify-content-center align-center' 
                            key="button-submit-chart" 
                            onClick={() => handleSelection({...props})}
                        >
                            Submit
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-style" key="modal-footer-chart-input">
                    <button 
                        className="btn" 
                        onClick={() => handleClose({...props})}
                        key="close-chart-btn-modal"
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
    )
}