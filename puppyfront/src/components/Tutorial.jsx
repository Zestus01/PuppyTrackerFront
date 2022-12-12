import { Modal } from "react-bootstrap/";
import Carousel from 'react-bootstrap/Carousel';
import iconImages from "../img/iconImages.png";
import inputPictures from '../img/inputPictures.png';
import userUpClose from '../img/userUpClose.png';

export default function Tutorial(props){

    function handleClose(props){
        props.setShow(false);
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
                        key="modal-title-dog-tut"
                    >
                        Tutorial
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-style" key="modal-body-dog-selection">
                    <Carousel>
                        <Carousel.Item>
                            <ul className="py-3">
                                <img
                                    className="d-block ratio"
                                    src={inputPictures}
                                    alt="Inputs"
                                    />
                                    <Carousel.Caption>
                                        <h3>Activity inputs</h3>
                                        <p className="pt-4 tut-text">Clicking/Tapping on these icons will bring up the activity input. Left to right: Food, Pee/Poop, Walk, and Playtime</p>
                                    </Carousel.Caption>
                            </ul>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={iconImages}
                                alt="icons"
                            />
                            <Carousel.Caption>
                                <h3>Icons!</h3>
                                <p className="tut-text">Clicking on the husky brings you to the homepage. The chart will change pages and allow you to select what chart you want to display. </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={userUpClose}
                                alt="User"
                            />

                            <Carousel.Caption>
                            <h3>User Profile</h3>
                            <p className="tut-text">
                                Clicking here will bring up the height and weight for your dogs, allowing you to edit their characteristics. You can also delete dogs from here as well. Click close if you are done
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Modal.Body>
                <Modal.Footer className="modal-style" key="modal-footer-dog-input">
                    <button 
                        className="btn" 
                        onClick={() => handleClose({...props})}
                        key="close-tut-btn-modal"
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
    )
}