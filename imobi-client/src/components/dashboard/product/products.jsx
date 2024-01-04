import { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import "./products.css";
import { Link } from "react-router-dom";

function Product(){
    const [products, setProducts] = useState([]);

    const sellerProduct = () => {
       /*  console.log("test" ,element); */
       function filterItem(item, element){
        /* console.log("switch",item); */
        switch (item) {
            case 'prix':
                return (<div className="cardSellerPrice cardSellerElement"> <strong>{item} : </strong> {element[item]} €</div>)
                break;
        
            case 'status':
                    if ( element[item] == "sell") {
                        return (<div className="cardSellerStatus cardSellerElement"> <strong>{item} : </strong> A vendre</div>)
                    } else if (element[item] == "rent"){
                        return (<div className="cardSellerStatus cardSellerElement"> <strong>{item} : </strong> A louer</div>)
                    }
                break;
        
            default:
                break;
        }
       } 

        return (
            products.map((element, index) => {
                console.log("ele",element.id);
                return(
                    <Link to={"/detailDashboard"} state={element.id} className="productSellerCard" id={"product_seller_"+index}>
                        <div className="cardProductSellerImage">

                        </div>
                        <div className="cardProductSellerInfo">
                            {Object.keys(element).map(item => {
                                /* console.log(item, element[item]); */
                                return (filterItem(item, element))

                            })}
                        </div>

                    </Link>
                );
            })
            
        );

    }

    const getProduct = async() => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/getProductSeller`, options);
            const data = await response.json();
            setProducts(data.product);
        } catch(error){

        }
    }

    useEffect(()=> {
        getProduct();
    }, []);


    console.log("produc" , products);
    return(
        <div className="products">
            <div className="dashboardContainer">
                <Dashboard></Dashboard>
            </div>

            <div className="dashContent">
                <h1>product</h1>

                <div className="sellerProduct">
                    {sellerProduct()}
                </div>

            </div>

        </div>
    )
}
export default Product;