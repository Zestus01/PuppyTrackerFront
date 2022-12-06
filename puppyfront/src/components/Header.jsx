import { useNavigate, Outlet} from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import dogDog from '../img/dogDog.png';
import cogWheel from '../img/cogWheel.png';
import user from "../img/user.png";

export default function Header(props){
    const [state, dispatch] = useGlobalState();

    let navigate = useNavigate();

    let username = (state.currentUser ? state.currentUser.username : '');

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4 p0">
                        <img 
                            src={dogDog}
                            alt="Logo"
                            id="logo"
                            onClick={ () => {
                                navigate('/home/dog')
                            }}
                        />
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-end">
                                <p id="username-header">{username}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col justify-content-end">
                        <img
                            src={user}
                            alt="User Icon"
                            onClick={ () => navigate('/home/profile')}
                        />
                    </div>
                </div>
            </div>
            <Outlet />
            <img
                src={cogWheel}
                alt="Settings"
                id="settings-icon"
                onClick={ () => navigate('/settings')}
            />
        </>
    )
}