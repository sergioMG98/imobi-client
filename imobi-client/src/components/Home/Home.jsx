import { useEffect, useState } from "react";
import Navbar from "../Layouts/Navbar/Navbar";
import CardProduct from "../CardProduct/CardProduct";
import './Home.css';

function Home(){

    const [product, setProduct] = useState([]);
    const [img, setImg] = useState();

    const getProduct = async() => {
        
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL }`, options);
            const data = await response.json();
            console.log("home", data);
            setProduct(data.product);
            setImg(data.imageProduct);
        } catch(error){

        }
    }

    useEffect(()=> {
        getProduct();
    }, []);

    return (
        <div className="home">
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>

            <div className="contentContainer">
                
                {product?.map((elements, index) => 
                        <CardProduct product={elements} imageProduct={img} key={index}></CardProduct>
                    )
                }
                
            </div>
        </div>
    )
}
export default Home;