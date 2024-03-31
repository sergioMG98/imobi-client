import { useEffect, useState } from "react";
import Navbar from "../Layouts/Navbar/Navbar";
import Carte from "../Carte/carte";
import "./customerSell.css";

function CustomerSell(){

    const [sellerData, setSellerData] = useState([]);

    const [messageToSeller ,setMessageToSeller] = useState();
    const [lastnameOfCustomer, setLastnameOfCustomer] = useState();
    const [firstnameOfCustomer, setFirstnameOfCustomer] = useState();
    const [mailOfCustomer , setMailOfCustomer] = useState();
    const [phoneOfCustomer, setPhoneOfCustomer] = useState();
    const [seller_id , setSeller_id] = useState();

    const [searchSeller , setSearchSeller] = useState();
    const [latitude ,setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    // va chercher tout les vendeurs inscript dans l'application
    const getCoordonnes = async() => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL7}`, options);
            const data = await response.json();
            console.log("data page" ,data);
            setSellerData(data.data);
        } catch(error){

        }
    }

    const sendMessage = async(id_seller, e) => {
        e.preventDefault();
        console.log("seller_id", seller_id);
        if (mailOfCustomer.match(emailPattern)) {
            if (id_seller != undefined) {
                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "message" : messageToSeller,
                        "lastnameOfCustomer" : lastnameOfCustomer,
                        "firstnameOfCustomer" : firstnameOfCustomer,
                        "mailOfCustomer" : mailOfCustomer,
                        "phoneOfCustomer" : phoneOfCustomer,
                        "seller_id" : seller_id,
                    }),
                };
                try {
                    
                    const response = await fetch(`${import.meta.env.VITE_API_URL6}`, options);
                    const data = await response.json();
                    console.log("data page" ,data);
                    if (data.status = 'true') {
                        let contactDiv = document.querySelector('.contactSeller');
                        let carteDiv = document.querySelector('.carteContainer');
                
                        contactDiv.classList.remove('active');
                        carteDiv.classList.remove('active')
                    }
    
                    alert(data.message);
                } catch(error){
                    alert("une erreur a eu lieu lors de l'envoie")
                }
            } else {
                alert("veuillez selectionner un agent immobilier pour le contacter")
            }
        } else {
            alert ("les condition de l'email ne sont pas respecter");
        }
    }

    if (seller_id != undefined) {
        let contactDiv = document.querySelector('.contactSeller');
        let carteDiv = document.querySelector('.carteContainer');

        contactDiv.classList.add('active');
        carteDiv.classList.add('active')
    }

    const getCity = async() =>{
        
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL5}${searchSeller}`, options);
            const data = await response.json();

            setLatitude(data.features[0].geometry.coordinates[1]),
            setLongitude(data.features[0].geometry.coordinates[0])

            setSearchSeller('')
        } catch(error){
            alert("erreur lors de l'obtention des coordonnées")
        }
    }


    useEffect(()=> {
        getCoordonnes();
    }, []);

    /* sellerData.length == 0 ?  */
    return (
        <div className="customersSell">
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>

            <div className="customerSellContent">
                <div className="searchMapPlace">
                    <div className="searchSeller searchPlace">
                        <input type="text" id="searchPlacesMap" value={searchSeller} onChange={(e) => setSearchSeller(e.target.value)}/>
                        <label htmlFor="searchPlacesMap">chercher lieu</label>
                    </div>

                    <button onClick={() => getCity()}>valider</button>
                </div>

                <div className="contactSellerContainer">

                    <div className="contactSeller">
                        <div className="infoSeller">

                        </div>

                        <form className="formContactToSeller">
                            <div id="messageToSellerParent">
                                <input type="text" onChange={(e) => setMessageToSeller(e.target.value)} id="messageToSeller"/>
                                <label htmlFor="messageToSeller">message</label>
                            </div>

                            <div id="lastnameOfCustomerParent">
                                <input type="text" onChange={(e) => setLastnameOfCustomer(e.target.value)} id="lastnameOfCustomer"/>
                                <label htmlFor="lastnameOfCustomer">nom</label>
                            </div>
                            <div id="firstnameOfCustomerParent">
                                <input type="text" onChange={(e) => setFirstnameOfCustomer(e.target.value)} id="firstnameOfCustomer"/>
                                <label htmlFor="firstnameOfCustomer">prénom</label>
                            </div>

                            <div id="mailOfCustomerParent">
                                <input type="email" onChange={(e) => setMailOfCustomer(e.target.value)} id="mailOfCustomer"/>
                                <label htmlFor="mailOfCustomer">email</label>
                            </div>

                            <div id="phoneOfCustomerParent">
                                <input type="tel" onChange={(e) => setPhoneOfCustomer(e.target.value)} id="phoneOfCustomer"/>
                                <label htmlFor="phoneOfCustomer">téléphone</label>
                            </div>
                            
                            <button onClick={(e) => sendMessage(seller_id, e)}>envoyer</button>
                        </form>

                    </div>
                    <div className="carteContainer">
                        
                            <Carte
                                values = {sellerData.length != 0 ? sellerData : null}
                                setSeller_id = {setSeller_id}
                                latitude = {latitude != undefined ? latitude : 43.763537}
                                longitude = {longitude != undefined ? longitude : 7.460686}
                            />
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CustomerSell;