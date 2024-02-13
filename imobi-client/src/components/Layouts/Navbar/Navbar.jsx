import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar(){
    return(
        <div className="navbar">
            <div className="navLogo">
                <Link to={"/"}>imobi</Link>
            </div>

            <div className="navChoices">
                <Link className="navBuy" to={`${import.meta.env.VITE_API_URL24}`} state={'sell'}>acheter</Link>
                <Link className="navRent" to={`${import.meta.env.VITE_API_URL24}`} state={'rent'}>louer</Link>
                <Link className="navSell" to={`${import.meta.env.VITE_API_URL25}`}>vendre</Link>
            </div>

            <div className="navLogin">
                <Link to={`${import.meta.env.VITE_API_URL21}`}>connexion</Link>
            </div>
        </div>
    )
}
export default Navbar;