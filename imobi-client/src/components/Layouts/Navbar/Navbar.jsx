import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";

function Navbar(){
    const [state, setState] = useState(false)

    const burgerMenu = () => {
        console.log('burger');
        let navbar = document.querySelector('.navbar');
        let line1 = document.querySelector('.burgerLine1');
        let line2 = document.querySelector('.burgerLine2');
        let line3 = document.querySelector('.burgerLine3');

        if(state == false) {
            navbar.classList.add('burgerMode');
            line1.style.transform = "translate(0px, 15px) rotate(45deg)";
            line2.style.display = "none";
            line3.style.transform = "translate(0px, -20px) rotate(135deg)";
            setState(true);
        } else {
            navbar.classList.remove('burgerMode');
            line1.style.transform = "translate(0px, 0px) rotate(0)";
            line2.style.display = "flex";
            line3.style.transform = "translate(0px, 2px) rotate(0)";
            setState(false);
        }

    }

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

            <div className="burger" onClick={() => burgerMenu()}>
                <span className="burgerLine1"></span>
                <span className="burgerLine2"></span>
                <span className="burgerLine3"></span>
            </div>
        </div>
    )
}
export default Navbar;