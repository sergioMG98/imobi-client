import { useState } from "react";
import Dashboard from "../dashboard";
import "./products.css";

function Product(){
    const [products, setProducts] = useState([
        {
            emplacement: "valeur emplacement",
            immeuble: "nom immeuble",
            prix: "prix immeuble",
        }
    ]);

    const sellerProduct = () => {
/*         
        products?.map(element => {
            console.log("ele",element);

            Object.entries(element).map(([items,values]) => {
                console.log('tit' , items);
                return (
                    <div>{items}</div>
                )
            })
        })
 */
    }



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

{/*                 {products?.map((elements, index) => {
                    <div className="product" key={index}>
                        {Object.entries(elements).forEach(([element,values]) => {
                            
                            {element}
                        })}
                        {elements}

                    </div>
                })} */}
            </div>

        </div>
    )
}
export default Product;