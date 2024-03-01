// doc : https://ui.dev/react-router-pass-props-to-link

import { useLocation } from 'react-router-dom'
import Navbar from '../Layouts/Navbar/Navbar';
import { useState, useEffect } from "react";
import "./DetailsPage.css";
import LeafletMap from './leafletMap';

function DetailsPage(props){

    const location = useLocation();
    const [product, setProduct] = useState();
    const [img, setImg] = useState();
    const [imageNumber, setImageNumber] = useState(0);
    const [formState, setFormState] = useState(false);

    const [messageToSeller ,setMessageToSeller] = useState();
    const [lastnameOfCustomer, setLastnameOfCustomer] = useState();
    const [firstnameOfCustomer, setFirstnameOfCustomer] = useState();
    const [mailOfCustomer , setMailOfCustomer] = useState();
    const [phoneOfCustomer, setPhoneOfCustomer] = useState();


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
/*             console.log("detail 2" , location.state); */
            const response = await fetch(`${import.meta.env.VITE_API_URL2}`, options);
            const data = await response.json();
            console.log("data page" ,data);
            setProduct(data.product);
            setImg(data.imageProduct);
        } catch(error){

        }
    }
    // faire defiler l'image
    const numberImg = (choice) => {
        if(choice == 1){
            if ((imageNumber + 1) == img.length) {
                setImageNumber(0);
            } else {
                setImageNumber(imageNumber + 1);
            }
            
        } else {

            if ((imageNumber - 1) < 0) {
                setImageNumber(img.length - 1);
            } else {
                setImageNumber(imageNumber - 1);
            }
        }
    }

    /* console.log('product', product); */
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
    // formulaire de contact
    const contactSeller = () => {

        let formContact = document.querySelector('.formContact');

        if(formState == false) {
            formContact.classList.add('active')
            setFormState(true);

        } else {
            formContact.classList.remove('active')
            setFormState(false);

        }


    }
    // envoye message
    const sendMessage = async(id_seller) => {
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
                    "seller_id" : product.user_id,
                    "referenceAnnonce" :product.id
                }),
            };
            try {
                
                const response = await fetch(`${import.meta.env.VITE_API_URL6}`, options);
                const data = await response.json();
                console.log("data page" ,data);
                /* setProduct(data.product); */
            } catch(error){
                
            }
        } else {
            alert("veuillez selectionner un agent immobilier pour le contacter")
        }


    }


    return(
        <div className='details'>
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>
            <div className="contactBtn">
                <button onClick={() => contactSeller()}>contacter</button>
                <div className="formContact">
                    <button className='btnFerme' onClick={() => contactSeller()}>X</button>
                    
                    <div className="formContactToSeller">
                        <div>
                            <input type="text" onChange={(e) => setMessageToSeller(e.target.value)} id="messageToSeller"/>
                            <label htmlFor="messageToSeller">message</label>
                        </div>

                        <div>
                            <input type="text" onChange={(e) => setLastnameOfCustomer(e.target.value)} id="lastnameOfCustomer"/>
                            <label htmlFor="lastnameOfCustomer">lastname</label>
                        </div>

                        <div>
                            <input type="text" onChange={(e) => setFirstnameOfCustomer(e.target.value)} id="firstnameOfCustomer"/>
                            <label htmlFor="firstnameOfCustomer">firstname</label>
                        </div>

                        <div>
                            <input type="mail" onChange={(e) => setMailOfCustomer(e.target.value)} id="mailOfCustomer"/>
                            <label htmlFor="mailOfCustomer">mail</label>
                        </div>

                        <div>
                            <input type="phone" onChange={(e) => setPhoneOfCustomer(e.target.value)} id="phoneOfCustomer"/>
                            <label htmlFor="phoneOfCustomer">phone</label>
                        </div>
                        
                        <button onClick={() => sendMessage(product?.user_id)}>envoyer</button>
                    </div>
                </div>
            </div>

            <div className="detailsContent">
                <div className="detailsPresentation">
                    <div className="detailsImage">
                        <img src={img != undefined ? img[imageNumber] : null} alt="" />
                        <button className="rightBtn" onClick={() => numberImg(1)}> + </button>
                        <button className="leftBtn" onClick={() => numberImg(0)}> - </button>
                    </div>

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