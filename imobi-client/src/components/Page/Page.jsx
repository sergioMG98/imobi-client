import Navbar from "../Layouts/Navbar/Navbar";
import CardProduct from "../CardProduct/CardProduct";
import { useState, useEffect } from "react";

function Page(){
    const [product, setProduct] = useState([]);
    const [choice, setChoice] = useState('vendre');

    console.log("coucou" , product);
    const getProduct = async() => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status" : choice,
            }),
        };
        try {
            console.log("coucou 3" , choice);
            const response = await fetch(`http://127.0.0.1:8000/api/getProductSpecific`, options);
            const data = await response.json();
            console.log("data page" ,data.product);
            setProduct(data.product);
        } catch(error){

        }
    }

    useEffect(()=> {
        getProduct();
    }, [choice]);


   
    return(
        <div>
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>

            <div className="contentContainer">
                
                {product?.map((elements, index) => 
                        <CardProduct product={elements} key={index}></CardProduct>
                    )
                }
                
            </div>
        </div>
    )
}
export default Page;