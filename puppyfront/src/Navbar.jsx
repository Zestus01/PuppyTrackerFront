import { useGlobalState } from './context/GlobalState';
import {useState} from 'react';

import HandleUser from './HandleUser';
import DogDisplay from "./DogDisplay";
import InputBox from "./InputBox";

export default function Navbar(props){
    const [page, setPage] = useState("Home");
    const [state, dispatch] = useGlobalState();
    let userTabs = ['Home', 'Profile'];
    let loginTabs = ['Home', 'Login', 'Register']
    if(!state.currentUser){
        return (
            <>
                <button>Hello???</button>
                <nav>
                    <ul>
                        {loginTabs.map( (tab) => (
                            <li onClick={ () => setPage(tab)} key={tab}>{tab}</li>
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
                {userTabs.map((tab) => {
                    <li onClick={() => setPage(tab)} key={tab}>
                    {tab}
                    </li>;
                })}
                </ul>
            </nav>
            <DogDisplay />
            <InputBox />
            </>
        )
    }
}
