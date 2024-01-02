import { Link } from 'react-router-dom';
import DetailsPage from '../DetailsPage/DetailsPage';
import './CardProduct.css';

function CardProduct(props){

    return (
        <div className="cardProduct" id={props.product.id}>
            <div className="imageCard">

            </div>
            <div className="descriptionCard">
                <div className="cardPrice">
                    {props.product.prix}
                </div>
                <div className="caracteristiqueCard">
                    <div className="cardType">
                        {props.product.piece}
                    </div>
                    <div className="cardLieux">
                        {props.product.surfaceTerrain}
                    </div>
                </div>
                <div className="details">
                    <Link to={"/detailsPage"} state={props.product.id}>details</Link>
                </div>
            </div>


        </div>
    );
}
export default CardProduct;