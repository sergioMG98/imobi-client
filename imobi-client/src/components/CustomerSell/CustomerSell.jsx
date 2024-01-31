import { useEffect, useState } from "react";
import Navbar from "../Layouts/Navbar/Navbar";
import Carte from "../Carte/carte";
import "./customerSell.css";

function CustomerSell(){

    const [sellerData, setSellerData] = useState([]);

    const getCoordonnes = async() => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/getUsers`, options);
            const data = await response.json();
            console.log("data page" ,data);
            setSellerData(data.data);
        } catch(error){

        }
    }

    useEffect(()=> {
        getCoordonnes();
    }, []);

    console.log('vendre',sellerData);
    return (
        <div className="customersSell">
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>

            <div className="customerSellContent">
                <div className="contactSeller"></div>
                <div className="carteContainer">
                    
                    {sellerData.length != 0 ?
                        <Carte
                            values = {sellerData.length != 0 ? sellerData : null}
                        />
                        :
                        null
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default CustomerSell;