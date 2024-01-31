// doc : https://ui.dev/react-router-pass-props-to-link

import { useLocation } from 'react-router-dom'
import Navbar from '../Layouts/Navbar/Navbar';
import { useState, useEffect } from "react";
import "./DetailsPage.css";
import LeafletMap from './leafletMap';

function DetailsPage(props){

    const location = useLocation();
    const [product, setProduct] = useState();

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
            setProduct(data.product[0]);
        } catch(error){

        }
    }

    console.log('product', product);
    const getCaracteristique = () => {

        function filterCaracteristique(item , index){

            switch (item) {

                case "ascenseur":
                    
                    return (<div className='detailItemCara'>{item} : {product[item]}</div>)
                    break;

                case "balcon":
                
                return (<div className='detailItemCara' key={index}>{item} : {product[item]}</div>)
                break;

                case "cave":
                    
                    return (<div className='detailItemCara' key={index}>{item} : {product[item]}</div>)
                    break;

                case "chambre":
                
                return (<div className='detailItemCara' key={index}>{item} : {product[item]}</div>)
                break;

                case "garage":
                    
                    return (<div className='detailItemCara' key={index}>{item} : {product[item]}</div>)
                    break;

                case "piece":
                    
                    return (<div className='detailItemCara' key={index}>{item} : {product[item]}</div>)
                    break;
                
                case "piscine":
                
                return (<div className='detailItemCara' key={index}>{item} : {product[item]}</div>)
                break;

                case "salleDeBain":
                    
                    return (<div className='detailItemCara' key={index}>salle de bain : {product[item]}</div>)
                    break;

            
                case "surface":
                    
                    return (<div className='detailItemCara' key={index}>{item} : {product[item]} m2</div>)
                    break;

                case "surfaceTerrain":
                    
                    return (<div className='detailItemCara' key={index}>surface terrain : {product[item]} m2</div>)
                    break;
                
                case "terrasse":
                    
                    return (<div className='detailItemCara' key={index}>{item} : {product[item]}</div>)
                    break;
                
                default:
                    break;
            }
        }

        return (Object.keys(product).map((element, index) => {
            
            if (element == "ascenseur" || element == "balcon" || element == "cave" || element == "chambre" || element == "garage" || element == "piece" || element == "piscine" || element == "salleDeBain" || element == "surface" || element == "surfaceTerrain" || element == "terrasse" ) {
                return(
                    product[element] != null ? 
                        
                        filterCaracteristique(element, index)
                    :  
                        
                        ""
                    
                        
                        
    
                ); 
            }
            
            
            

        }));
            
    }

    const gesFunction = () => {
        let fleche = document.querySelector('.indicatorEnergetiqueGes');
        let triangle = document.querySelector('.triangeIndicatorGes');

        switch (product?.ges) {
            case "a":
                fleche.style.setProperty('top', "O%");
                triangle.style.setProperty('top', "O%");
                break;
        
            case "b":
                fleche.style.setProperty('top', "14.28%");
                triangle.style.setProperty('top', "14.28%");
                break;

            case "c":
                fleche.style.setProperty('top', "28.56%");
                triangle.style.setProperty('top', "28.56%");
                break;

            case "d":
                fleche.style.setProperty('top', "42.84%");
                triangle.style.setProperty('top', "42.84%");
                break;

            case "e":
                fleche.style.setProperty('top', "57.12%");
                triangle.style.setProperty('top', "57.12%");
                break;

            case "f":
                fleche.style.setProperty('top', "71.40%");
                triangle.style.setProperty('top', "71.40%");
                break;

            case "g":
                fleche.style.setProperty('top', "85.68%");
                triangle.style.setProperty('top', "85.68%");
                break;
            default:
                break;
        }
    }

    const dpeFunction = () => {
        let fleche = document.querySelector('.indicatorEnergetiqueDpe');
        let triangle = document.querySelector('.triangeIndicatorDpe');

        switch (product?.dpe) {
            case "a":
                fleche.style.setProperty('top', "O%");
                triangle.style.setProperty('top', "O%");
                break;
        
            case "b":
                fleche.style.setProperty('top', "14.28%");
                triangle.style.setProperty('top', "14.28%");
                break;

            case "c":
                fleche.style.setProperty('top', "28.56%");
                triangle.style.setProperty('top', "28.56%");
                break;

            case "d":
                fleche.style.setProperty('top', "42.84%");
                triangle.style.setProperty('top', "42.84%");
                break;

            case "e":
                fleche.style.setProperty('top', "57.12%");
                triangle.style.setProperty('top', "57.12%");
                break;

            case "f":
                fleche.style.setProperty('top', "71.40%");
                triangle.style.setProperty('top', "71.40%");
                break;

            case "g":
                fleche.style.setProperty('top', "85.68%");
                triangle.style.setProperty('top', "85.68%");
                break;

            default:
                break;
        }
    }
    return(
        <div className='details'>
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>

            <div className="detailsContent">
                <div className="detailsPresentation">
                    <div className="detailsImage"></div>
                    <div className="detailsTitle">
                        {product?.type} t-{product?.piece}
                    </div>
                </div>
                <div className="detailsDescription">
                    <h2>description</h2>
                    <div className="detailsChild">
                        <p>{product != null ? product.description :  "une erreur"}</p>
                    </div>
                </div>
                <div className="detailsCaracteristique">
                    <h2>caracteristique</h2>
                    <div className="detailsChild">
                        {product != null ? getCaracteristique() :  "une erreur"}
                    </div>
                </div>
                <div className="detailsEmplacement">
                    <h2>emplacement</h2>

                    <div className="detailMapContainer">
                        {
                            product?.latitude ?
                                <LeafletMap 
                                    latitude = {product?.latitude}
                                    longitude = {product?.longitude}
                                ></LeafletMap>
                            :
                                ""
                        }
                        
                    </div>
                </div>
                <div className="detailsBilanEnergetique">
                    <h2>bilan energetique</h2>

                    <div className="gesContainer">
                        <h3>ges</h3>
                        <div className="gesEtiquette">
                            <div className='gesA etiquettesEnergetique'>{"< 50 A"}</div>
                            <div className='gesB etiquettesEnergetique'>{"51 à 90 B"}</div>
                            <div className='gesC etiquettesEnergetique'>{"91 à 150 C"}</div>
                            <div className='gesD etiquettesEnergetique'>{"151 à 230 D"}</div>
                            <div className='gesE etiquettesEnergetique'>{"231 à 330 E"}</div>
                            <div className='gesF etiquettesEnergetique'>{"331 à 450 F"}</div>
                            <div className='gesG etiquettesEnergetique'>{"> 450 G "}</div>
                        </div>
                        <div className="indicatorContainer">
                            <div className='triangeIndicatorGes'></div>
                            <div className="indicatorEnergetiqueGes">{product?.ges}</div>
                        </div>
                        {gesFunction()}
                    </div>
                    <div className="dpeContainer">
                        <h3>dpe</h3>
                        <div className="dpeEtiquette">
                            <div className='dpeA etiquettesEnergetique'>{"< 5 A"}</div>
                            <div className='dpeB etiquettesEnergetique'>{"6 à 10 B"}</div>
                            <div className='dpeC etiquettesEnergetique'>{"11 à 20 C"}</div>
                            <div className='dpeD etiquettesEnergetique'>{"21 à 35 D"}</div>
                            <div className='dpeE etiquettesEnergetique'>{"36 à 55 E"}</div>
                            <div className='dpeF etiquettesEnergetique'>{"56 à 80 F"}</div>
                            <div className='dpeG etiquettesEnergetique'>{"> 80 G "}</div>
                        </div>
                        <div className="indicatorContainer">
                            <div className='triangeIndicatorDpe'></div>
                            <div className="indicatorEnergetiqueDpe">{product?.dpe}</div>
                        </div>
                        {dpeFunction()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailsPage;