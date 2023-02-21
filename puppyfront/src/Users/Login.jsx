import { useRef, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import jwtDecode from "jwt-decode";
import toast, {Toaster} from 'react-hot-toast';


const Login = () => {
  let navigate = useNavigate();
  const [,dispatch] = useGlobalState();
  const [show, setShow] = useState(false);
  const passRef = useRef(null);
  const userRef = useRef(null);
  const user2Ref = useRef(null);
  const pass2Ref = useRef(null);
  const pass2ConfRef = useRef(null);
  const nameRef = useRef(null);
  let user = {};

  const handleLogin = (e) => {
    AuthService.login(userRef.current.value, passRef.current.value).then(async (resp) => {
      let data = jwtDecode(resp.access);
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data,
      });
      toast.success("Welcome " + userRef.current.value);
      navigate("/home/dog/");
      window.location.reload();
    })
    .catch(error => toast.error("Username or password incorrect!"))
  };

  async function handleRegister(e){
    if(pass2Ref.current.value === pass2ConfRef.current.value){
      user = {
        username: user2Ref.current.value,
        password: pass2Ref.current.value,
        firstName: nameRef.current.value,
      }
        await AuthService.register(user).then(async (resp) => {
          userRef.current.value = user2Ref.current.value;
          passRef.current.value = pass2ConfRef.current.value;
          toast.success("User registered, please proceed to login")
        })
        .catch(error => toast.error("There is an account with that username already"));
    } else {
      toast.error("Passwords do not match")
    }
  };

  return (
  <div className="body-style text-white">
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3">
                <label htmlFor="reg-log"><span>Log In</span></label>
                <label htmlFor="reg-log"><span>Sign Up</span></label>
              </h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
              <label htmlFor="reg-log"/>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3 text-white">Log In</h4>
                        <div className="form-group">
                          <input type="text" className="form-style" placeholder="Your username" ref={userRef} id="username" autoComplete="off"/>
                          <i className="input-icon uil uil-at"></i>
                        </div>	
                        <div className="form-group mt-2">
                          <input type="password" name="logpass" className="form-style" ref={passRef} placeholder="Your Password" id="logpass1" autoComplete="off"/>
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button onClick={handleLogin} className="btn mt-4">submit</button>
                          </div>
                        </div>
                      </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3 text-white">Sign Up</h4>
                        <div className="form-group">
                          <input ref={nameRef} type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off"/>
                          <i className="input-icon uil uil-user"></i>
                        </div>	
                        <div className="form-group mt-2">
                          <input ref={user2Ref} type="text" name="logemail" className="form-style" placeholder="Your Username" id="logemail" autoComplete="off"/>
                          <i className="input-icon uil uil-at"></i>
                        </div>	
                        <div className="form-group mt-2">
                          <input ref={pass2Ref} type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off"/>
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input ref={pass2ConfRef} type="password" name="logpass2" className="form-style" placeholder="Confirm your password" id="logpass2" autoComplete="off"/>
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button onClick={handleRegister} className="btn mt-4">submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <Toaster />
  </div>
  );
};

export default Login;

//  HTML and CSS copied from Ivan Grozdic https://codepen.io/ig_design/pen/KKVQpVP
