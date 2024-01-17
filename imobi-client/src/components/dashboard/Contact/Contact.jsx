import { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import "./contact.css";

function Contact(){

    const [contacts, setContacts] = useState([]);
    const [stateAllContact, setStateAllContact] = useState();
    const [customerProduct, setCustomerProduct] = useState();

    const getContact = async() => {
        console.log('get events');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            
            const response = await fetch(`http://127.0.0.1:8000/api/getAllCustomer`, options);
            const data = await response.json();
            /* console.log('=> :', data.customers); */
            setContacts(data.customers);

        } catch(error){
            console.log("error");
        }
    }

    const productCustomers = async(customer_id) => {

        let allContact = document.querySelector('.allContact');
        let allCustomers = document.querySelector('.allCustomers');
        let friendsContact = document.querySelector('.friendsContact');

        if (stateAllContact != customer_id) {
            allContact.classList.add('active');
            setStateAllContact(customer_id);
        } else {
            allContact.classList.remove('active');
            setStateAllContact(undefined);
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "customer_id" : customer_id 
            }),
        };

        try{
            
            const response = await fetch('http://127.0.0.1:8000/api/getProductOfCustomer',options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            /* console.log("ee", data.customerProduct); */
            setCustomerProduct(data.customerProduct);

        } catch (error){
            console.error("Fetch error:" , error);
        }
        
    }


    useEffect(() => {
        getContact();
    }, [])

    return (
        <div className="contact">
            <div className="dashboardContainer">
                <Dashboard></Dashboard>
            </div>

            <div className="contactContent">
                <div className="contactHeader">
                    <h1>contact</h1>

                    <div>not</div>
                </div>

                <div className="allContact">
      
                    <div className="allCustomers">
                        <div className="customersContent">
                        {
                            contacts?.map((element, index) => (
                                <div className="customers" key={index} onClick={() => productCustomers(element.id)}>
                                    
                                    {element.lastname} {element.firstname}
                                    
                                </div>
                            ))
                        }
                        </div>

                        <div className="detailCustomerProducts">
                            {
                                customerProduct?.map((element, index) => (
                                    <div className="detailsCardProduct">
                                        {element.description}
                                        {console.log("d", element)}
                                    </div>
                                ))
                            }
                        </div>
                    </div> 
                    

                    <div className="friendsContact"></div>
      
                </div>
            </div>
        </div>
    )
}
export default Contact;