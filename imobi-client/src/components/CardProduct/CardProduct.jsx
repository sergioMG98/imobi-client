import { Link } from 'react-router-dom';
import DetailsPage from '../DetailsPage/DetailsPage';
import './CardProduct.css';
import { useEffect, useState } from 'react';

function CardProduct({product, imageProduct, key}){
    /* console.log("card product", product); */

    const [img, setImg] = useState();
    const [imageNumber, setImageNumber] = useState(0);
    
    useEffect(() => {
        setImg(imageProduct.filter(el => el.product_id == product.id))
    },[product])

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

    console.log('image', img != undefined ? img : null , imageNumber);
    return (
        <div className="cardProduct" id={product.id}>
            <div className="imageCard">

                <img src={img != undefined ? img[imageNumber].picture : null} alt="" />
                <button className="rightBtn" onClick={() => numberImg(1)}> + </button>
                <button className="leftBtn" onClick={() => numberImg(0)}> - </button>

            </div>
            <div className="descriptionCard">

                <div className="cardType">
                    {product.type}
                </div>

                <div className="cardPrice">
                    {product.prix} €
                </div>


                <div className="cardLieux">
                    {product.label}
                </div>
                
                <div className="detailsBtn">
                    <Link to={`${import.meta.env.VITE_API_URL26 }`} state={product.id}>details</Link>
                </div>
            </div>


        </div>
    );
}
export default CardProduct;