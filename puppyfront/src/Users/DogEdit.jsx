import request from "../services/api.requests";
import Modal from 'react-bootstrap/Modal';
import {useRef} from 'react';


export default function DogEdit(props){
    
    const changeRef = useRef(null);
    const valueRef = useRef(null);


    function handleClose(props){
        props.setShow(false);
    }
    let fields = ['name', 'weight','height', 'age'];

    async function sizeChange(attribute, dataObj){
        let options = {
            url: attribute + '/',
            method: "Post",
            data: {
                ...dataObj
            }

        };
        await request(options);

    }

    async function editDog(props, dataObj){
        let options = {
            url: "edit/dog/" + props.dog.id + '/',
            method: "PUT",
            data: {
                ...dataObj
            },
            
        };
        await request(options);
        handleClose({...props});
    }

    function handleSubmit(props){
        let dataObj = {
            dog: props.dog.id,
        }
        for(let category of fields){
            if(changeRef.current.value === category){
                dataObj[category] = props.dog[category];
                if(category === 'weight' || category === 'height'){
                    sizeChange(category, dataObj);
                }
                dataObj = {...props.dog};
                dataObj[category] = valueRef.current.value;
                editDog({...props}, dataObj);
            }
        }
    }

    return(
        <Modal
                show={props.show}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered
                key="modal-dog-edit"
            >
                <Modal.Header 
                    className="modal-style" 
                    closeButton onClick={() => {handleClose({...props})}}
                    key="modal-x-btn-edit"
                >
                    <Modal.Title 
                        className="text-white" 
                        id="contained-modal-title-vcenter"
                        key="modal-title-dog-edit"
                    >
                        What would you like to change?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-style" key="modal-body-dog-input">
                    <div className="row" key="row-div-input-dog">
                        <button 
                            className='btn col-3 py-2 justify-content-center align-center' 
                            key="button-submit-dog" 
                            onClick={() => handleSubmit({...props})}
                        >
                            Submit
                        </button>
                    </div>
                    <label 
                        key="activityLabel" 
                        htmlFor="activity" 
                        className="text-white col-6"
                    >
                    Select the change
                    </label>
                    <select 
                        className="form-style text-white"
                        key="change" 
                        name="change" 
                        id="change" 
                        ref={changeRef}
                    >
                        {fields.map((but, index) => (
                            <option key={but} value={but}>
                                {but}
                            </option>
                        ))}
                    </select>
                    <div className='row form-group my-4' key="form-div">
                            <input 
                                className='form-style col-3' 
                                id="value"
                                ref={valueRef} 
                                key="value-input"
                                type="text" 
                                placeholder="New Value?"
                            />
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