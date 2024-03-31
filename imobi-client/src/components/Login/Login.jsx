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

    // condition pour le mot de passe
    let pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$";
    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    const navigate = useNavigate();

    let userLogin = {email, password};
    let userRegister = {lastname, firstname, email, password};

    // connexion
    const handleLogin = async (e) => {
        e.preventDefault();

        if (email.match(emailPattern)) {
            if (password.match(pattern)) {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify(userLogin),
                };
        
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL3}`,options);
        
                    const data = await response.json();
       
                    if(data){
                        alert(data.message);
                        if (data.status == 'true') {
                            navigate(`${import.meta.env.VITE_API_URL22}`);
                        }
                        if (data.token) {
                            localStorage.setItem("TokenUserImobi", data.token);
                        }
                        
                    } else {
                        alert("try again");
                    }
        
                } catch (error){
                    console.error("Fetch error:", error);
                }
            } else {
                alert('les condition du mot de passe ne sont pas respecter');
            }
        } else {
            alert ("les condition de l'email ne sont pas respecter");
        }
    }

    // incription
    const handleRegister = async (e) => {
        e.preventDefault();

        if (email.match(emailPattern)) {
            if(password.match(pattern)){
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify(userRegister),
                };
        
                try {
                    
                    const response = await fetch(`${import.meta.env.VITE_API_URL4}`,options);
                    const data = await response.json();
                    
        
                    if(data){
                        alert(data.message);
                        if (data.status == 'true') {
                            navigate("/profil");
                        }
                        if (data.token) {
                            localStorage.setItem("TokenUserImobi", data.token);
                        }
                    } else {
                        alert("try again");
                    }
        
                } catch (error){
                    console.error("Fetch error:", error);
                }
            } else {
                alert('les condition du mot de passe ne sont pas respecter');
            }
        } else {
            alert ("les condition de l'email ne sont pas respecter");
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
    }
    // envoie un email pour reset mot de passe
    const emailResetPassword = async() => {
        console.log('resetemail',email);
        if (email != '') {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({email}),
            };
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL3_1}`,options);
                const data = await response.json();
                console.log('resetemail', data);
                if(data){
                    alert(data.message);
                } else {
                    alert("try again");
                }
    
            } catch (error){
                console.error("Fetch error:", error);
            }
        } else {
            alert("email non entrée")
        }

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
                        <input type="email" name="loginEmail" id="loginEmail" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" name="loginPassword" id="loginPassword" placeholder="mot de passe, exemple : azertyuiop1A#" onChange={(e) => setPassword(e.target.value)}/>
                        <ul className="condiPassword">
                            condition mot de passe
                            <li>nombre de caractere entre 8 et 16</li>
                            <li>minimum une lettre majuscule</li>
                            <li>Minimum un numero</li>
                            <li>Minimum un caractere special</li>
                        </ul>
                        <button type="submit" onClick={handleLogin}>valider</button>
                    </form>

                    <div className="changeFormArea" onClick={(e) => changeForm(e)}>
                        Pas encore de compte ? <strong>Créer un compte</strong>
                    </div>
                    <div className="resetPassword" onClick={emailResetPassword}>
                        mot de passe oublié
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
                        <input type="text" name="registerLastName" id="registerLastName" placeholder="votre nom" onChange={(e) => setLastname(e.target.value)}/>
                        <input type="text" name="registerFirstName" id="registerFirstName" placeholder="votre prénom" onChange={(e) => setFirstname(e.target.value)}/>
                        <input type="email" name="registerEmail" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" id="registerEmail" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" name="registerPassword" id="registerPassword" placeholder="mot de passe, exemple : azertyuiop1A#" onChange={(e) => setPassword(e.target.value)}/>
                        <ul className="condiPassword">
                            condition mot de passe
                            <li>nombre de caractere entre 8 et 16</li>
                            <li>minimum une lettre majuscule</li>
                            <li>Minimum un numero</li>
                            <li>Minimum un caractere special</li>
                        </ul>
                        <button type="submit" onClick={handleRegister}>valider</button>
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