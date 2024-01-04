import Dashboard from "../dashboard";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import "./detailDashboard.css";

function DetailDashboard(){
    const location = useLocation();

    const [id_product, setIdProduct] = useState();
    const [price, setPrice] = useState();
    const [status, setStatus] = useState();
    const [bilanEnergetique, setBilanEnergetique] = useState();
    const [cave, setCave] = useState();
    const [chambre, setChambre] = useState();
    const [description, setDescription] = useState();
    const [piece, setPiece] = useState();
    const [salleDeBain, setSalleDeBain] = useState();
    const [surface, setSurface] = useState();
    const [surfaceTerrain, setSurfaceTerrain] = useState();
    const [terrasse, setTerrasse] = useState();
    
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
            const response = await fetch(`http://127.0.0.1:8000/api/getProductById`, options);
            const data = await response.json();
            
            console.log("ded", data);
            setIdProduct(data.product[0].id);

            setPrice(data.product[0].prix);
            setStatus(data.product[0].status);

            setBilanEnergetique(data.caracteristique_product[0].bilanEnergetique);
            setCave(data.caracteristique_product[0].cave);
            setChambre(data.caracteristique_product[0].chambre);
            setDescription(data.caracteristique_product[0].description);
            setPiece(data.caracteristique_product[0].piece);
            setSalleDeBain(data.caracteristique_product[0].salleDeBain);
            setSurface(data.caracteristique_product[0].surface);
            setSurfaceTerrain(data.caracteristique_product[0].surfaceTerrain);
            setTerrasse(data.caracteristique_product[0].terrasse);

        } catch(error){

        }
    }

    const changeValueProduct = async() => {
        console.log("cououc");
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id_product" : id_product,
                "description" : description, 
                "piece" : piece, 
                "surfaceTerrain" : surfaceTerrain,
                "surface" : surface,
                "salleDeBain" : salleDeBain, 
                "chambre" : chambre, 
                "terrasse" : terrasse, 
                "cave" : cave, 
                "bilanEnergetique" : bilanEnergetique,
                "prix" : price,
                "status" : status,
            }),
        };
        try {
            console.log("op", options);
            const response = await fetch(`http://127.0.0.1:8000/api/updateProduct`, options);
            const data = await response.json();
            
            console.log("ded", data);


        } catch(error){

        }
    }


    useEffect(()=> {
        getProductById();
    }, [location.state]);

    console.log("tt", description ? description : 'erreu');
    return (
        <div className="detailDashboard">
            <div className="dashboardContainer">
                <Dashboard></Dashboard>
            </div>

            <div className="dashContent ">
                <h1>product details</h1>

                <div className="sellerProductDetail">
                    <div>
                        <textarea name="description" cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <input type="number" name="cave" value={cave} onChange={(e) => setCave(e.target.value)}/>
                        <input type="number" name="chambre" value={chambre} onChange={(e) => setChambre(e.target.value)}/>
                        <input type="number" name="salleDeBain" value={salleDeBain} onChange={(e) => setSalleDeBain(e.target.value)}/>
                        <input type="number" name="piece" value={piece} onChange={(e) => setPiece(e.target.value)}/>
                        <input type="number" name="surface" value={surface} onChange={(e) => setSurface(e.target.value)}/>
                        <input type="number" name="surfaceTerrain" value={surfaceTerrain} onChange={(e) => setSurfaceTerrain(e.target.value)}/>
                        <input type="number" name="terrasse" value={terrasse} onChange={(e) => setTerrasse(e.target.value)}/>
                        <input type="text" name="bilanEnergetique" value={bilanEnergetique} onChange={(e) => setBilanEnergetique(e.target.value)}/>
                        <input type="text" name="status" value={status} onChange={(e) => setStatus(e.target.value)}/>
                    
                        <button onClick={() => changeValueProduct()}>modifier</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default DetailDashboard;