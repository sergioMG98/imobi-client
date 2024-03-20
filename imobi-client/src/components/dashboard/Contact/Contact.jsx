import { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import "./contact.css";

function Contact(){
    let token = localStorage.getItem('TokenUserImobi');

    const [contacts, setContacts] = useState([]);
    const [stateAllContact, setStateAllContact] = useState();
    const [customerProduct, setCustomerProduct] = useState();

    const [messageArray, setMessageArray] = useState([]);
    const [idMessage, setIdMessage] = useState();

    const getContact = async() => {
        console.log('get events');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL15}`, options);
            const data = await response.json();
            /* console.log('=> :', data.customers); */
            setContacts(data.customers);

        } catch(error){
            console.log("error");
        }
    }
    // affichage du message au complet
    const productCustomers = (customer_id) => {

        let allContact = document.querySelector('.allContact');
/*         let allCustomers = document.querySelector('.allCustomers');
        let friendsContact = document.querySelector('.friendsContact'); */
        let s = document.querySelector('.detailCustomerProducts');

        if (stateAllContact != customer_id) {
            allContact.classList.add('active');
            setStateAllContact(customer_id);
        } else {
            allContact.classList.remove('active');
            setStateAllContact(undefined);
        }
        
        messageArray.forEach(element => {
            if(element.id == customer_id){
                
                s.innerHTML = 
                `
                <div classname="nameExpediteur" style='height: 20%; width: 100%; display: flex;'>
                    <div classname="lastnameOfSender" style='height: 100%; width: 50%;display:flex; align-items: center; box-sizing: border-box; padding-left: 20px;' ><strong>nom :</strong> <pre> ${element.lastnameSender} </div>
                    <div classname="firstnameOfSender" style='height: 100%; width: 50%;display:flex; align-items: center; box-sizing: border-box; padding-left: 20px;'><strong>prénom :</strong> <pre> ${element.firstnameSender} </div>
                </div>

                <div classname="contactExpediteur" style='height: 20%; width: 100%; display:flex;'>
                    <div classname="mailOfSender" style='height: 100%; width: 50%;display:flex; align-items: center; box-sizing: border-box; padding-left: 20px;'><strong>e-mail :</strong> <pre> ${element.mailSender} </div>
                    <div classname="phoneOfSender" style='height: 100%; width: 50%; display:flex; align-items: center; box-sizing: border-box; padding-left: 20px;'><strong>téléphone :</strong> <pre> ${element.phoneSender} </div>
                </div>
                
                <div classname="messageOfSender" style='height: 50%; width: 100%; box-sizing: border-box; padding: 20px; overflow-y: auto;'> ${element.message} </div>

                <div classname="messageOfSender" style='height: 10%; width: 100%; display: flex; box-sizing: border-box; padding: 20px;'> ${element.referenceAnnonce != null ? `<strong>reference de l'annonce :</strong> <pre> ` + element.referenceAnnonce : ''}  </div>
                `
            }
        });
        console.log("produc", messageArray);
        setIdMessage(customer_id);
/* 
        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "customer_id" : customer_id 
            }),
        };
 */
/*         try{
            
            const response = await fetch('http://127.0.0.1:8000/api/getProductOfCustomer',options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            setCustomerProduct(data.customerProduct);

        } catch (error){
            console.error("Fetch error:" , error);
        } */
        
    }
    // recupere les message de l'agent immobilier
    const getMessages = async() => {

        let options = {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try{
            
            const response = await fetch(`${import.meta.env.VITE_API_URL16}`,options);

            const data = await response.json();

           /*  console.log("message", data.data); */
            setMessageArray(data.data);

        } catch (error){
            console.error("Fetch error:" , error);
        }
    }
    useEffect(() => {
        
        getMessages();
    }, [])

    return (
        <div className="contact">
            <div className="dashboardContainer">
                <Dashboard></Dashboard>
            </div>

            <div className="contactContent">
                <div className="contactHeader">
                    <h1>contact</h1>
                </div>

                <div className="allContact">
      
                    <div className="allCustomers">
                        <div className="customersContent">
                        {
                            messageArray.length != 0 ?
                                messageArray?.map((element, index) => (
                                    <div className="customers" key={index} onClick={() => productCustomers(element.id)}>
                                        {console.log("eke",element.id)}
                                        {element.lastnameSender} {element.firstnameSender}
                                        
                                    </div>
                                ))
                            : 
                                "vous avez aucun message"
                        }
                        </div>

                        <div className="detailCustomerProducts"></div>
                    </div> 
                    
{/* 
                    <div className="friendsContact">

                    </div>
       */}
                </div>
            </div>
        </div>
    )
}
export default Contact;