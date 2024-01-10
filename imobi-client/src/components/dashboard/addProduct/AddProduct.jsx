import { useState } from "react";
import Dashboard from "../dashboard";
import "../page.css";
import "./addProduct.css";

function AddProduct() {

    const [description, setDescription] = useState('');
    const [piece, setpiece] = useState();
    const [surfaceTerrain, setSurfaceTerrain] = useState();
    const [surface, setSurface] = useState();
    const [salleDeBain, setSalleDeBain] = useState();
    const [chambre, setChambre] = useState();
    const [terrasse, setTerrasse] = useState();
    const [cave, setCave] = useState();
    const [bilanEnergetique, setBilanEnergetique] = useState('');
    const [prix, setPrix] = useState();
    const [status, setStatus] = useState();

    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    let addProduct = {description, piece, surfaceTerrain, surface, salleDeBain, chambre, terrasse, cave, bilanEnergetique, prix, status, lastname, firstname, email, phone};

    const handleAddProduct = async(e) => {
        e.preventDefault();

        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(addProduct),
        };

        try{
            console.log("option", options);
            const response = await fetch('http://127.0.0.1:8000/api/addProduct',options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("creation product", data);

            if(data){
                alert(data.message);
                
            } else {
                alert("try again");
            }

        } catch (error){
            console.error("Fetch error:" , error);
        }
    }

    return (
        <div className="container">
            <div className="dashboardContainer">
                <Dashboard></Dashboard>
            </div>

            <div className="addProductContainer dashContent">

                <h1>création de lieu</h1>


                <form action="" method="post">
                    <div className="productData">
                        <h2>produit informaition</h2>

                        <div className="addForm textAreaAddProduct">
                            <textarea name="description" id="" cols="30" rows="10" required onChange={(e) => setDescription(e.target.value)}></textarea>
                            <label htmlFor="">description</label>
                        </div>

                        <div className="addForm entriesDataProduct ">
                            <div className="inputContainer">
                                <input type="number" name="piece" id="piece" required onChange={(e) => setpiece(e.target.value)}/>
                                <label htmlFor="piece">nombre de piece</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="surfaceTerrain" id="surfaceTerrain" required onChange={(e) => setSurfaceTerrain(e.target.value)}/>
                                <label htmlFor="surfaceTerrain">surface Terrain</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="surface"  id="surface" required onChange={(e) => setSurface(e.target.value)}/>
                                <label htmlFor="surface">surface</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="salleDeBain"  id="salleDeBain" required onChange={(e) => setSalleDeBain(e.target.value)}/>
                                <label htmlFor="salleDeBain">salle De Bain</label>

                            </div>

                            <div className="inputContainer">
                                <input type="number" name="chambre"  id="chambre" required onChange={(e) => setChambre(e.target.value)}/>
                                <label htmlFor="chambre">nombre de chambre</label>

                            </div>

                            <div className="inputContainer">
                                <input type="number" name="terrasse" id="terrasse" required onChange={(e) => setTerrasse(e.target.value)}/>
                                <label htmlFor="terrasse">terrasse</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="cave" id="cave" required onChange={(e) => setCave(e.target.value)}/>
                                <label htmlFor="cave">nombre de cave</label>
                            </div>

                            <div className="inputContainer">
                                <input type="text" name="bilanEnergetique"  id="bilanEnergetique" required onChange={(e) => setBilanEnergetique(e.target.value)}/>
                                <label htmlFor="bilanEnergetique">bilan Energetique</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="prix" id="prix" required onChange={(e) => setPrix(e.target.value)}/>
                                <label htmlFor="prix">prix</label>
                            </div>

                            <select name="status" id="addProductSelect" required onChange={(e) => setStatus(e.target.value)}>
                                <option value="">-- votre choix --</option>
                                <option value="sell">vendre</option>
                                <option value="rent">louer</option>
                            </select>
                        </div>
                    </div>

                    <div className="clientData ">
                        <h2>client information</h2>
                        <div className="clientInput addForm entriesDataProduct">
                            <div className="inputContainer">
                                <input type="text" name="lastnameClient" id="lastnameClient" required onChange={(e) => setLastname(e.target.value)}/>
                                <label htmlFor="lastnameClient">lastname</label>
                            </div>

                            <div className="inputContainer">
                                <input type="text" name="firstnameClient" id="firstnameClient" required onChange={(e) => setFirstname(e.target.value)}/>
                                <label htmlFor="firstnameClient">firstname</label>
                            </div>

                            <div className="inputContainer">
                                <input type="email" name="emailClient" id="emailClient" required onChange={(e) => setEmail(e.target.value)}/>
                                <label htmlFor="emailClient">email</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="numberClient" id="numberClient" required onChange={(e) => setPhone(e.target.value)}/>
                                <label htmlFor="numberClient">number</label>
                            </div>

                        </div>

                    </div>
                
                    <div className="addProductButton">
                        <button type="submit" className="addForm" onClick={handleAddProduct}>valider</button>
                    </div>

                </form>

            </div>
        </div>
    )
}
export default AddProduct;