import { useGlobalState } from "../context/GlobalState";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Tutorial from "./Tutorial";
import { Col, Container, Row } from "react-bootstrap";

export default function Settings(){
    let navigate = useNavigate();
    const [isShow, setisShow] = useState(false);
    const [settings, setSettings] = useState();
    
    /*
        Settings
            pull in from cached global settings
            set settings to chache settings 
            light and dark mode
            quick input
            possible profile picture
            font size small or large
             - options base64 database storage, firestore, gravitar
            
        text of setting         off TOGGLE on
        Overall layout of using h4 and h2 tags etc.
    */
    
    
    
    
    
    return(
        <Container className="my-5">
            <Row className="my-3">
                <Col>
                    {/* TODO: why h5? */}
                    <h3>Settings in development:</h3>
                    {/* TODO: Pull these from GitHub */}
                    {/* https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects#finding-information-about-projects */}
                </Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <ul>
                        <li>
                            <h6>
                                Gendered profile placeholder images
                            </h6>
                        </li>
                        <li className="h6">
                                {/* TODO: this is ambiguous */}
                                Text size increasing
                        </li>
                        <li>
                            <h6>
                                Light and dark modes
                            </h6> 
                        </li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col xs='4'>
                    <button className="btn mx-2" onClick={() => navigate('/home/credits')}>Credits</button>
                </Col>
                <Col xs='4'>
                    <button className="btn mx-2" onClick={() => setShow(!show)}>Tutorial</button>
                </Col>
                <Col xs='4'>
                    {/* TODO: this isn't actually a back button so consider removing or investigate how to use React Router or History API */}
                    <button className="btn mx-2" onClick={() => navigate('/home/dog')}>Back</button>
                </Col>
            </Row>
            <Tutorial show={show} setShow={setShow} />
        </Container>
    )
}