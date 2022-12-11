import request from "../services/api.requests";
import Modal from 'react-bootstrap/Modal';
import toast, {Toaster} from 'react-hot-toast';

export default function DogDelete(props){


    function handleClose(props){
        props.setShow(false);
    }

    async function sendDelete(props){
        let options = {
            url: "edit/dog/" + props.id + '/',
            method: "DELETE",
        };
        try{
            await request(options);
            toast.success("Deletion successful")
            handleClose({...props});
        } catch(error){
            toast.error("Deletion failed")
        }
    }


    return(
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
                        key="modal-title-delete-input"
                    >
                        Confirm Deletion?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-style" key="modal-body-dog-delete">
                    <div className="row" key="row-div-delete-dog">
                        <button 
                            className='btn col-3 py-2 mx-2 justify-content-center align-center' 
                            key="button-delete-dog" 
                            onClick={() => sendDelete({...props})}
                        >
                            Delete
                        </button>
                        <button 
                            className='btn col-3 py-2 mx-2 justify-content-center align-center' 
                            key="button-cancel-dog" 
                            onClick={() => handleClose({...props})}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-style" key="modal-footer-dog-input">
                    <button 
                        className="btn" 
                        onClick={() => handleClose({...props})}
                        key="close-dog-btn"
                    >
                        Close
                    </button>
                    <Toaster />
                </Modal.Footer>
            </Modal>

    )



}