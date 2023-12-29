import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar(){
    return(
        <div className="navbar">
            <div className="navLogo">
                <Link to={"/"}>imobi</Link>
            </div>

            <div className="navChoices">
                <div className="navBuy">acheter</div>
                <div className="navRent">louer</div>
                <div className="navSell">vendre</div>

            </div>

            <div className="navLogin">
                <Link to="/login">connexion</Link>
            </div>
        </div>
    )
}
export default Navbar;