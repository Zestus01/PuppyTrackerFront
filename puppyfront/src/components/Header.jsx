import { useNavigate, Outlet} from "react-router-dom";
import dogHusky from '../img/dogHusky.png';
import cogColor from '../img/cogColor.png';
import userColor from "../img/userColor.png";
import bar_chartColor from "../img/bar_chartColor.png";
import CheckAPI from "../dogAPI/check";

export default function Header(props){
    let navigate = useNavigate();

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
                    src={bar_chartColor}
                    alt="Chart"
                    id="chart"
                    onClick={() => navigate("/home/chart")}
                />
                </div>
                <div className="col d-flex justify-content-end">
                    <img
                        className="header-img"
                        src={userColor}
                        alt="User Icon"
                        onClick={() => navigate("/home/profile")}
                    />
                </div>
            </div>
            <button className="btn" onClick={CheckAPI}>API CHECK</button>
        </div>
        <Outlet />
        <img
            className="header-img d-flex justify-content-end"    
            src={cogColor}
            alt="Settings"
            id="settings-icon"
            onClick={() => navigate("/home/settings")}
        />
    </div>
    );
}