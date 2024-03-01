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

    const [img, setImg] = useState();
    const [newImage, setNewImg] = useState();
    const [deleteImage, setDeleteImage] = useState([]);
    const [imageNumber, setImageNumber] = useState(0);


/*     const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [ville, setVille] = useState(); */
    
    // va recuperer les informations du produits qui correspond a l'id
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
            setIdProduct(data.product.id);

            setPrix(data.product.prix);
            setStatus(data.product.status);

            setGes(data.product.ges);
            setDpe(data.product.dpe);
            setCave(data.product.cave);
            setChambre(data.product.chambre);
            setDescription(data.product.description);
            setPiece(data.product.piece);
            setSalleDeBain(data.product.salleDeBain);
            setSurface(data.product.surface);
            setSurfaceTerrain(data.product.surfaceTerrain);
            setTerrasse(data.product.terrasse);
            setType(data.product.type);
            setBalcon(data.product.balcon);
            setGarage(data.product.garage);
            setPiscine(data.product.piscine);
            setAscenseur(data.product.ascenseur);
            
            setImg(data.imageProduct);

        } catch(error){

        }
    }

    // envoie les informations au back-end
    const changeValueProduct = async() => {
        console.log("cououc", deleteImage);
        

        let formData = new FormData();
        formData.append('id_product', id_product);
        formData.append('status', status);
        formData.append('prix', prix);
        formData.append('description', description);
        formData.append('surface', surface);
        formData.append('ges', ges);
        formData.append('dpe', dpe);
        formData.append('type', type);
        formData.append('piece', piece);
        formData.append('surfaceTerrain', surfaceTerrain);
        formData.append('salleDeBain', salleDeBain);

        formData.append('chambre', chambre);
        formData.append('terrasse', terrasse);
        formData.append('balcon', balcon);
        formData.append('garage', garage);
        formData.append('piscine', piscine);
        formData.append('ascenseur', ascenseur);
        formData.append('cave', cave);
/*         formData.append('longitude', longitude)
        formData.append('latitude', latitude)
        formData.append('ville', ville) */

/*         formData.append('lastname', lastname)
        formData.append('firstname', firstname)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('idCustomer', idCustomer);
        formData.append('label', label); */
        formData.append('image', img);
        formData.append('newImage', newImage);
        formData.append('deleteImage', deleteImage);
        
        let options = {
            method: 'POST',
            headers: {
                /* 'Content-Type': 'application/json', */
                Authorization: `Bearer ${token}`,
            },
/*             body: JSON.stringify({
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
            }), */
            body: formData,
        };
        try {
            console.log("op", ges);
            const response = await fetch(`${import.meta.env.VITE_API_URL17}`, options);
            const data = await response.json();
            
            console.log("ded", data);


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
    // delete image 
    const deleteImg = (value) => {
        console.log('delet', imageNumber);
        setImg(img.filter(element => element != value));
        setDeleteImage([...deleteImage, value]);

        // replace a une image existante
        if (imageNumber == 0) {
            console.log('test');
            setImageNumber(imageNumber);
        } else {
            console.log(("test else"));
            setImageNumber(imageNumber - 1);
        }
        
    }


    useEffect(()=> {
        getProductById();
    }, [location.state]);

    console.log("tt", description ? description : 'erreu');
    return (
        <div className="detailDashboard">
            <div className="dashboardContainer dashDetailCo">
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
                        <label htmlFor="type" id="addProductTypeLabel">type</label>
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
                        <input type="number" name="balcon" id="balcon" value={balcon} onChange={(e) => setBalcon(e.target.value)}/>
                        <label htmlFor="balcon">nombre de balcon</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="garage" id="garage" value={garage} onChange={(e) => setGarage(e.target.value)}/>
                        <label htmlFor="garage">nombre de garage</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="piscine" id="piscine" value={piscine} onChange={(e) => setPiscine(e.target.value)}/>
                        <label htmlFor="piscine">nombre de piscine</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="ascenseur" id="ascenseur" value={ascenseur} onChange={(e) => setAscenseur(e.target.value)}/>
                        <label htmlFor="ascenseur">ascenseur</label>
                    </div>

                    <div className="updateDiv">
                        <input type="number" name="cave" id="cave" value={cave} onChange={(e) => setCave(e.target.value)}/>
                        <label htmlFor="cave">n° cave</label>
                    </div>

                    <div className="imagePlace">
                        <div className="image">
                            <img src={img != undefined ? img[imageNumber] : null} alt="" />
                            <button className="rightBtn" onClick={() => numberImg(1)}> + </button>
                            <button className="leftBtn" onClick={() => numberImg(0)}> - </button>
                        </div>
                        
                        
                        <div>
                            <button onClick={() => deleteImg(img != undefined ? img[imageNumber] : null)}>supprimer</button>
                            <input type="file" name=""  onChange={(e) => setNewImg(e.target.files[0])}/>
                        </div>
                    </div>                    
                
                    <button onClick={() => changeValueProduct()}>modifier</button>
                    
                </div>

            </div>
        </div>
    )
}
export default DetailDashboard;