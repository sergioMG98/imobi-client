import { useState } from "react";
import './resetPassword.css';
import { useNavigate } from "react-router-dom";

// (?=.*[az]) - Au moins une lettre minuscule (a - z).

// (?=.*[AZ]) - Au moins une lettre majuscule (A - Z).

// (?=.*[0-9]) - Au moins une valeur numérique (0-9).

// (?=.*[!@#$%^&*_=+-]) - Au moins un symbole spécial (!@#$%^&*=+-_)

// {8,16} -> La longueur totale doit être supérieure ou égale à 8 et inférieure ou égale à 16.


function ResetPassword(params) {
    // récupére l'url puis le decortique
    let email = document.URL?.split('?email=')[1];

    const [password, setPassword] = useState();
    const [passwordAgain, setPasswordAgain] = useState();

    const navigate = useNavigate();

    const resetPassword = async() => {

        if(password == passwordAgain){
            // condition mot de passe 
            let passwordPattern = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$`;
            // verifie si le mot de passe est correspont aux condition
            if (password.match(passwordPattern)) {
                
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({email , password}),
                };

                try {
                    console.log('options',options);
                    const response = await fetch(`${import.meta.env.VITE_API_URL20_3}`,options);
                    const data = await response.json();
                    console.log('data',data);
                    if(data){
                        alert(data.message);
                        if (data.status == 'true') {
                            // va vers login
                            navigate(`${import.meta.env.VITE_API_URL21}`);
                        }
                    }
        
                } catch (error){
                    console.error("Fetch error:", error);
                }

            } else {
                alert(' les condition du mot de passe ne sont pas respecter')
            }
            console.log('patter foiré');
        } else {
            alert("Les mots de passe ne sont pas pareils. ")
        }
    }



    return(
        <div id="resetPassword">
            <div className="passwordContainer">
                <h1>Réinitialisation mot de passe</h1>
                <div className="password">
                    <input type="password" id="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" onChange={(e) => setPassword(e.target.value)} required/>
                    <label htmlFor="password">new password</label>
                </div>

                <div className="password">
                    <input type="password" id="passwordAgain" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" onChange={(e) => setPasswordAgain(e.target.value)} required/>
                    <label htmlFor="passwordAgain">new password again</label>
                </div>

                <button onClick={resetPassword}>valider</button>
            </div>
        </div>
    )
}

export default ResetPassword;