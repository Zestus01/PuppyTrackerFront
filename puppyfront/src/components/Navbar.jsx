import { useGlobalState } from '../context/GlobalState';
import {useState} from 'react';

import HandleUser from './HandleUser';
import DogDisplay from "./DogDisplay";

export default function Navbar(props){
    const [page, setPage] = useState("Home");
    const [state, dispatch] = useGlobalState();
    let userTabs = ['Home', 'Profile'];
    let loginTabs = ['Home', 'Login', 'Register']
    if(!state.currentUser){
        return (
            <>
                <nav>
                    <ul>
                        {loginTabs.map( (tab) => (
                            <button onClick={ () => setPage(tab)} key={tab}>{tab}</button>
                        ))}
                    </ul>
                </nav>
                <HandleUser page={page} />
            </>
        )
    } else {
        return (
            <>
                <nav>
                    <ul>
                    {userTabs.map((tab) => 
                        <button onClick={() => setPage(tab)} key={tab}>
                        {tab}
                        </button>
                    )}
                    </ul>
                </nav>
                <DogDisplay />
            </>
        )
    }
}
