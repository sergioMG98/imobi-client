import Dashboard from "../dashboard";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import "./detailDashboard.css";

function DetailDashboard(){
    const location = useLocation();
    let token = localStorage.getItem('TokenUserImobi');

    const [id_product, setIdProduct] = useState();

    const [status, setStatus] = useState();
    const [prix, setPrix] = useState();
    const [description, setDescription] = useState('');
    const [surface, setSurface] = useState();
    const [ges, setGes] = useState();
    const [dpe, setDpe] = useState();
    const [type, setType] = useState();
    const [piece, setPiece] = useState();
    const [surfaceTerrain, setSurfaceTerrain] = useState();
    const [salleDeBain, setSalleDeBain] = useState();
    const [chambre, setChambre] = useState();
    const [terrasse, setTerrasse] = useState();
    const [balcon, setBalcon] = useState();
    const [garage, setGarage] = useState();
    const [piscine, setPiscine] = useState();
    const [ascenseur, setAscenseur] = useState();
    const [cave, setCave] = useState();
/*     const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [ville, setVille] = useState(); */
    
    const getProductById = async() => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                "status" : location.state,
            }),
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL2}`, options);
            const data = await response.json();
            
            console.log("ded", data);
            setIdProduct(data.product[0].id);

            setPrix(data.product[0].prix);
            setStatus(data.product[0].status);

            setGes(data.product[0].ges);
            setDpe(data.product[0].dpe);
            setCave(data.product[0].cave);
            setChambre(data.product[0].chambre);
            setDescription(data.product[0].description);
            setPiece(data.product[0].piece);
            setSalleDeBain(data.product[0].salleDeBain);
            setSurface(data.product[0].surface);
            setSurfaceTerrain(data.product[0].surfaceTerrain);
            setTerrasse(data.product[0].terrasse);
            setType(data.product[0].type);
     

        } catch(error){

        }
    }

    const changeValueProduct = async() => {
        console.log("cououc");
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
                "ges" : ges,
                "dpe" : dpe,
                "prix" : prix,
                "status" : status,
                "type" : type,
                "balcon" : balcon,
                "garage" : garage,
                "piscine" : piscine,
                "ascenseur" : ascenseur,
            }),
        };
        try {
            console.log("op", ges);
            const response = await fetch(`${import.meta.env.VITE_API_URL17}`, options);
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
                    
                    <div className="updateTextareaDiv">
                        <textarea name="description" id="textarea" cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        <label htmlFor="textarea">description</label>
                    </div>

                    <div className="updateDiv">
                        
                        <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="sell">a vendre</option>
                            <option value="rent">a louer</option>
                            <option value="sold">vendu</option>
                            <option value="rented">loué</option>
                        </select>

                        <label htmlFor="status">status</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="price" id="price" value={prix} onChange={(e) => setPrix(e.target.value)} required/>
                        <label htmlFor="price">prix</label>
                    </div>
                    
                    <div className="updateDiv">
                        <input type="number" name="surface" id="surface" value={surface} onChange={(e) => setSurface(e.target.value)} required/>
                        <label htmlFor="surface">m2 surface</label>
                    </div>
                     
                    <div className="updateDiv">
                        {/* <input type="text" name="ges" id="ges" value={ges} onChange={(e) => setGes(e.target.value)}/> */}
                        <select name="ges" id="ges" value={ges} onChange={(e) => setGes(e.target.value)} required>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                            <option value="e">e</option>
                            <option value="f">f</option>
                        </select>
                        <label htmlFor="ges">ges</label>
                    </div>

                    <div className="updateDiv">
                        <select name="dpe" id="dpe" value={dpe} onChange={(e) => setDpe(e.target.value)} required>
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                            <option value="e">e</option>
                            <option value="f">f</option>
                        </select>
                        <label htmlFor="dpe">dpe</label>
                    </div>        

                    <div className="updateDiv">
                        <select name="type" id="addProductType" value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="appartement">APPARTEMENT</option>
                            <option value="maison">MAISON</option>
                            <option value="terrain">TERRAIN</option>
                            <option value="localCommercial">LOCAL COMMERCIAL</option>
                        </select>
                        <label htmlFor="type">type</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="piece" id="piece" value={piece} onChange={(e) => setPiece(e.target.value)}/>
                        <label htmlFor="piece">n° piece</label>
                    </div>     

                    <div className="updateDiv">
                        <input type="number" name="surfaceTerrain" id="surfaceTerrain" value={surfaceTerrain} onChange={(e) => setSurfaceTerrain(e.target.value)}/>
                        <label htmlFor="surfaceTerrain">m2 surface terrain</label>
                    </div>  

                    <div className="updateDiv">
                        <input type="number" name="salleDeBain" id="salleDeBain"  value={salleDeBain} onChange={(e) => setSalleDeBain(e.target.value)}/>
                        <label htmlFor="salleDeBain">n° salle de bain</label>
                    </div> 

                    <div className="updateDiv">
                        <input type="number" name="chambre" id="chambre" value={chambre} onChange={(e) => setChambre(e.target.value)}/>
                        <label htmlFor="chambre">n° chambre</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="terrasse" id="terrasse" value={terrasse} onChange={(e) => setTerrasse(e.target.value)}/>
                        <label htmlFor="terrasse">n° terrasse</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="balcon" id="balcon"  onChange={(e) => setBalcon(e.target.value)}/>
                        <label htmlFor="balcon">nombre de balcon</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="garage" id="garage"  onChange={(e) => setGarage(e.target.value)}/>
                        <label htmlFor="garage">nombre de garage</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="piscine" id="piscine"  onChange={(e) => setPiscine(e.target.value)}/>
                        <label htmlFor="piscine">nombre de piscine</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="ascenseur" id="ascenseur"  onChange={(e) => setAscenseur(e.target.value)}/>
                        <label htmlFor="ascenseur">ascenseur</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="cave" id="cave" value={cave} onChange={(e) => setCave(e.target.value)}/>
                        <label htmlFor="cave">n° cave</label>
                    </div>                       
                    
                                            
                    
                                           
                    
                   
                    
                    
                    
                      
                    
                                            
                      
                    

                
                    <button onClick={() => changeValueProduct()}>modifier</button>
                    
                </div>

            </div>
        </div>
    )
}
export default DetailDashboard;