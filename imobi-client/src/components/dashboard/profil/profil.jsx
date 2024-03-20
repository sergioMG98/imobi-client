import Dashboard from "../dashboard";
import { useState, useEffect } from "react";

import './profil.css';

function Profil(){
    let token = localStorage.getItem('TokenUserImobi');

    const [ProfilArray, setProfilArray] = useState([]);

    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [city, setCity] = useState();
    const [label, setLabel] = useState();

    const [searchMenu, setSearchMenu] = useState([]);

    // condition pour le mot de passe
    let pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$";


    // pour obliger a l'ulitisateur de remplir son profil
    const [responseModif , setResponseModif] = useState();

    // recuperation du profil
    const getProfil = async() => {

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            console.log('option',options);
            const response = await fetch(`${import.meta.env.VITE_API_URL19}`, options);
            const data = await response.json();
            console.log('=> :', data);
            setProfilArray(data.data);

            setLastname(data.data.lastname);
            setFirstname(data.data.firstname);
            setEmail(data.data.email);
            setPhone(data.data.phone);
            setLabel(data.data.label);

            if (data.data[0].label != null) {
                setResponseModif('true')
            }

        } catch(error){
            console.log("error");
        }
    }

    // modification du profil
    const updateProfil = async() => {
        console.log("pa",password);
        if (password != undefined ? password.match(pattern) : null || password == undefined) {
            let options = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "lastname" : lastname != null ? lastname : ProfilArray.lastname,
                    "firstname" : firstname != null ? firstname : ProfilArray.firstname,
                    "email" : email != null ? email : ProfilArray.email,
                    "phone" : phone != null ? phone : ProfilArray.phone,
                    "password" : password != null ? password : ProfilArray.password,
                    "latitude" : latitude != null ? latitude : ProfilArray.latitude,
                    "longitude": longitude != null ? longitude : ProfilArray.longitude,
                    "city" : city != null ? city : ProfilArray.city,
                    "label" : label
                }),
            };

            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL20}`,options);

                const data = await response.json();
                console.log("modif", data);

                setResponseModif(data.status);

            } catch (error){
                console.error("Fetch error:" , error);
            }
        } else {
            alert('les condition du mot de passe ne sont pas respecter');
        }


    }

    // obtention des coordonnes du lieu
    const getGeo = async(valeurInput) => {
        // permet de changer la valeur dans input
        setLabel(valeurInput);
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL5}${valeurInput}`, options);
            const data = await response.json();
            
            if (data.features.length != 0) {
                setSearchMenu(data.features);
                document.querySelector('.allSearch').classList.add('active');

            } 
    
        } catch(error){
            document.querySelector('.allSearch').classList.remove('active');
        }
    }

    // insertion des valeur dans les constantes
    const putCoordonne = (element) => {
        
        setLatitude(element.geometry.coordinates[1]);
        setLongitude(element.geometry.coordinates[0]);
        setCity(element.properties.city);
        setLabel(element.properties.label);

        document.querySelector('.allSearch').classList.remove('active');
    }

    useEffect(() => {
        getProfil();
    }, [])

    return (
        <div className="profilPage">
            <div className="dashboardContainer">
                {
                    responseModif == 'true' || ProfilArray.label != null ? <Dashboard></Dashboard> : ""
                }
                
            </div>

            <div className="profilContent">
                <h1>votre profil</h1>

                <div className="formProfil">
                    <div className="lastnameProfil profilDiv">
                        <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                        <label htmlFor="lastname">nom</label>
                    </div>
                    
                    <div className="firstnameProfil profilDiv">
                        <input type="text" id="firstname" value={firstname}  onChange={(e) => setFirstname(e.target.value)} required />
                        <label htmlFor="firstname">prenom</label>
                    </div>

                    <div className="emailProfil profilDiv">
                        <input type="email"  id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="email">email</label>
                    </div>

                    <div className="passwordProfil profilDiv">
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="password">new mot de passe</label>
                    </div>

                    <div className="phoneProfil profilDiv">
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <label htmlFor="phone">téléphone</label>
                    </div>

                    <div className="cityProfil profilDiv">
                        <input type="text" id="city" value={label} onChange={(e) => getGeo(e.target.value)} required/>
                        <label htmlFor="city">bureau de travail</label>
                        
                        <div className="allSearch">
                            {
                                searchMenu?.map((element, index) => {
                                    return (
                                        <div className="adresseChoix" onClick={() => putCoordonne(element)} >
                                            {element.properties.label}
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>

                    <button onClick={() => updateProfil()}>valider modification</button>
                </div>
            </div>
        </div>

    )
}
export default Profil;