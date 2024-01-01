import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar(){
    return(
        <div className="navbar">
            <div className="navLogo">
                <Link to={"/"}>imobi</Link>
            </div>

            <div className="navChoices">
                <Link className="navBuy" to={"/page"} state={'buy'}>acheter</Link>
                <Link className="navRent" to={"/page"} state={'rent'}>louer</Link>
                <Link className="navSell" to={"/page"} state={'sell'}>vendre</Link>
            </div>

            <div className="navLogin">
                <Link to="/login">connexion</Link>
            </div>
        </div>
    )
}
export default Navbar;