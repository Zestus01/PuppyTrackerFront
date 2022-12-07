import { useNavigate, Outlet} from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import dogHusky from '../img/dogHusky.png';
import cogWheel from '../img/cogWheel.png';
import user from "../img/user.png";
import bar_chart from "../img/bar_chart.png";

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
                <img
                    className="header-img"
                    src={bar_chart}
                    alt="Chart"
                    id="chart"
                    onClick={() => navigate("/home/chart")}
                />
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