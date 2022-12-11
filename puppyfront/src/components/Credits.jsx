// Dog breed info - https://api-ninjas.com/api/dogs
// Dog breed list - https://github.com/ElliottLandsborough/dog-ceo-api
import { useNavigate } from "react-router-dom";

export default function Credits(){
    let navigate = useNavigate();
    return (
      <div className="row container text-white">
        <div className="text-center justify-content-center col-12">
          <ul>
              <a
                href="https://www.flaticon.com/free-icons/playing"
                title="playing icons"
                className="col-12"
              >
                "Playing icons" created by Freepik - Flaticon
              </a>
              <br></br>
            <a 
              href="https://www.flaticon.com/free-icons/poop" 
              title="poop icons"
              className="col-12"
            >
              Dog pooping: "Poop icons" created by Voysla - Flaticon
            </a>
            <br></br>
            <a
              href="https://www.flaticon.com/free-icons/dog-food"
              title="dog food icons"
              className="col-12"
            >
              Dog bowl: "Dog food" icons created by Freepik - Flaticon
            </a>
            <br></br>
            <a 
              href="https://www.flaticon.com/free-icons/walk" 
              title="walk icons"
              className="col-12"
            >
              Man walking: "Walk icons" created by Freepik - Flaticon
            </a>
            <br></br>
            <a
              href="https://www.flaticon.com/free-icons/dog-walking"
              title="dog walking icons"
              className="col-12"
            >
              Woman walking: "Dog walking" icons created by surang - Flaticon
            </a>
            <br></br>
            <a 
              href="https://www.flaticon.com/free-icons/dog" 
              title="dog icons"
              className="col-12"
            >
              Dog face: "Dog icons" created by Vitaly Gorbachev - Flaticon
            </a>
            <br></br>
            <a
              href="https://www.flaticon.com/free-icons/cog-wheel"
              title="cog wheel icons"
              className="col-12"
            >
              Cog wheel icons created by Kharisma - Flaticon
            </a>
            <br></br>
            <a
              href="https://www.flaticon.com/free-icons/profile"
              title="profile icons"
              className="col-12"
            >
              Profile icons created by Freepik - Flaticon
            </a>
            <br></br>
            <a 
              href="https://www.flaticon.com/free-icons/chart" 
              title="chart icons"
              className="col-12"
            >
              Chart icons created by DinosoftLabs - Flaticon
            </a>
            <br></br>
            <a 
              href="https://www.flaticon.com/free-icons/construction-and-tools" 
              title="construction and tools icons"
              className="col-12"
            >
              Construction and tools icons created by VectorPortal - Flaticon
            </a>
            <br></br>
            <a 
              href="https://www.flaticon.com/free-icons/user" 
              title="user icons"
              className="col-12"
            >
              User icons created by kmg design - Flaticon
            </a>
            <br></br>
            <a
              href="https://codepen.io/ig_design/pen/KKVQpVP"
              title="CSS-LoginScreen"
              className="col-12"
            >
                HTML,CSS, and Login provided by Ivan Grozdic 
              </a>
            </ul>
        </div>
      </div>
    );
}

