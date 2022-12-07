import { useNavigate, Outlet} from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import dogHusky from '../img/dogHusky.png';
import cogWheel from '../img/cogWheel.png';
import user from "../img/user.png";

export default function Header(props){
    const [state] = useGlobalState();

    let navigate = useNavigate();

    let username = (state.currentUser ? state.currentUser.username : '');

    return (
    <div className='body-style text-white'>
        <div className="container-fluid">
        <div className="row">
            <div className="col-4">
            <img
                className="header-img"
                src={dogHusky}
                alt="Logo"
                id="logo"
                onClick={() => {
                navigate("/home/dog");
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
            <div className="col d-flex justify-content-end">
            <img
                className="header-img"
                src={user}
                alt="User Icon"
                onClick={() => navigate("/home/profile")}
            />
            </div>
        </div>
        </div>
        <Outlet />
        <img
            className="header-img d-flex justify-content-end"    
            src={cogWheel}
            alt="Settings"
            id="settings-icon"
            onClick={() => navigate("/home/settings")}
        />
    </div>
    );
}