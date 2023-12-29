import "./login.css";
import Navbar from "../Layouts/Navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [login, setLogin] = useState(true);
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    let userLogin = {email, password};
    let userRegister = {lastname, firstname, email, password};

    // connexion
    const handleLogin = async (e) => {
        e.preventDefault();

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(userLogin),
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/login`,options);
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("login data", data);

            if(data){
                alert(data.message);
                if (data.status == 'true') {
                    navigate("/product");
                }
                
            } else {
                alert("try again");
            }

        } catch (error){
            console.error("Fetch error:", error);
        }
    }

    // incription
    const handleRegister = async (e) => {
        e.preventDefault();

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(userRegister),
        };

        try {
            console.log("option", options);
            const response = await fetch(`http://127.0.0.1:8000/api/register`,options);
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("login data", data);

            if(data){
                alert(data.message);
                if (data.status == 'true') {
                    navigate("/product");
                }
            } else {
                alert("try again");
            }

        } catch (error){
            console.error("Fetch error:", error);
        }
    }

    // choice enter login / register
    const changeForm = (e) => {
        let loginArea = document.querySelector('.loginArea');
        let registerArea = document.querySelector('.registerArea');

        if(login == true){
            loginArea.style.display = "none";
            registerArea.style.display = "flex";
            setLogin(false);
        } else {
            loginArea.style.display = "flex";
            registerArea.style.display = "none";
            setLogin(true);
        }

        console.log("login",e.target.className);
    }

    return(
        <div className="login">
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>

            <div className="loginArea active">
                <div className="loginImage"></div>
                <div className="loginFormContainer">
                    <div className="loginTitle">
                        connexion
                    </div>
                    <form action="" method="post" className="loginForm">
                        <input type="email" name="loginEmail" id="" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" name="loginPassword" id="" placeholder="mot de passe" onChange={(e) => setPassword(e.target.value)}/>

                        <button type="submit" onClick={handleLogin}>connexion</button>
                    </form>
                    <div className="changeFormArea" onClick={(e) => changeForm(e)}>
                        Pas encore de compte ? <strong>Créer un compte</strong>
                    </div>
                </div>
            </div>

            <div className="registerArea">
                <div className="registerImage"></div>
                <div className="registerFormContainer">
                    <div className="registerTitle">
                        inscription
                    </div>
                    <form action="" method="post" className="registerForm">
                        <input type="text" name="registerLastName" id="" placeholder="votre nom" onChange={(e) => setLastname(e.target.value)}/>
                        <input type="text" name="registerFirstName" id="" placeholder="votre prénom" onChange={(e) => setFirstname(e.target.value)}/>
                        <input type="email" name="registerEmail" id="" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" name="registerPassword" id="" placeholder="mot de passe" onChange={(e) => setPassword(e.target.value)}/>

                        <button type="submit" onClick={handleRegister}>connexion</button>
                    </form>
                    <div className="changeFormArea" onClick={(e) => changeForm(e)}>
                        Déjà un compte ? <strong> se connecter </strong> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;