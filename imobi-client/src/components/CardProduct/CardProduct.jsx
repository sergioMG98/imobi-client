import './CardProduct.css';

function CardProduct(props){
    
    return (
        <div className="cardProduct">
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
            </div>


        </div>
    );
}
export default CardProduct;