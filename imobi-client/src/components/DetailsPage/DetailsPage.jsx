// doc : https://ui.dev/react-router-pass-props-to-link

import { useLocation } from 'react-router-dom'
import Navbar from '../Layouts/Navbar/Navbar';
import { useState, useEffect } from "react";
import "./DetailsPage.css";

function DetailsPage(props){

    const location = useLocation();
    const [product, setProduct] = useState();
    const [caracteristique, setCaracteristique] = useState();

    useEffect(()=> {
        getProductById();
    }, [location.state]);

    const getProductById = async() => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status" : location.state,
            }),
        };
        try {
            console.log("detail 2" , location.state);
            const response = await fetch(`http://127.0.0.1:8000/api/getProductById`, options);
            const data = await response.json();
/*             console.log("data page" ,data.product); */
            setProduct(data.product);
            setCaracteristique(data.caracteristique_product);
        } catch(error){

        }
    }

    const getCaracteristique = () => {
       /*  console.log("element", caracteristique); */

       function filterCaracteristique(item){
/*             if(item == 'id' || item != 'description' ||item != 'product_id'){
                console.log("=>", item ,caracteristique[0][item]);
            } */
            switch (item) {
                case "piece":
                    console.log("item", item ,caracteristique[0][item]);
                    return (<div>{item} : {caracteristique[0][item]}</div>)
                    break;
            
                case "surface":
                    console.log("item", item ,caracteristique[0][item]);
                    return (<div>{item} : {caracteristique[0][item]}</div>)
                    break;

                case "salleDeBain":
                    console.log("item", item ,caracteristique[0][item]);
                    return (<div>{item} : {caracteristique[0][item]}</div>)
                    break;

                case "chambre":
                    console.log("item", item ,caracteristique[0][item]);
                    return (<div>{item} : {caracteristique[0][item]}</div>)
                    break;
                   
                case "bilanEnergetique":
                    console.log("item", item ,caracteristique[0][item]);
                    return (<div>{item} : {caracteristique[0][item]}</div>)
                    break;
            

                default:
                    break;
            }
       }

        return (Object.keys(caracteristique[0]).map((element, index) => {
            
            return(
                caracteristique[0][element] ? 
                    <div>
                        {filterCaracteristique(element)}
                        
                        {/* {element} = {caracteristique[0][element]}  */}
                    </div>
                : "" 

            );

        }));
            
       
/*         Object.values(caracteristique).forEach(element => {
            Object.keys(element).forEach(item=> {
                
                if (element[item] != null) {
                        console.log("element", item, element[item]);
                        return (
                            <div>
                                <ul>
                                    <li>{item}</li>
                                </ul>
                            </div>
                        );
                }
            });
        });   */
    }

/*     console.log("details" , product[0]); */

    return(
        <div className='details'>
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>
       {/*      {product != null ? console.log("!= null", product[0]) : console.log("null", product )} */}

            <div className="detailsContent">
                <div className="detailsPresentation">
                    <div className="detailsImage"></div>
                    <div className="detailsTitle">tritre</div>
                </div>
                <div className="detailsDescription">
                    <h2>description</h2>
                    <div className="detailsChild">
                        <p>{caracteristique != null ? caracteristique[0].description :  "une erreur"}</p>
                    </div>
                </div>
                <div className="detailsCaracteristique">
                    <h2>caracteristique</h2>
                    <div className="detailsChild">
                        {product != null ? getCaracteristique() :  "une erreur"}
                        {console.log("")}
                    </div>
                </div>
                <div className="detailsEmplacement">
                    <h2>emplacement</h2>
                </div>
                <div className="detailsBilanEnergetique">
                    <h2>bilan energetique</h2>
                </div>
            </div>
        </div>
    )
}
export default DetailsPage;