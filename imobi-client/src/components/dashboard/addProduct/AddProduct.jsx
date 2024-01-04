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
                            <textarea name="description" id="" cols="30" rows="10" placeholder="description" required onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="addForm entriesDataProduct ">
                            <input type="number" name="piece"  placeholder="piece" required onChange={(e) => setpiece(e.target.value)}/>
                            <input type="number" name="surfaceTerrain"  placeholder="surface Terrain" required onChange={(e) => setSurfaceTerrain(e.target.value)}/>
                            <input type="number" name="surface"  placeholder="surface" required onChange={(e) => setSurface(e.target.value)}/>
                            <input type="number" name="salleDeBain"  placeholder="salle De Bain" required onChange={(e) => setSalleDeBain(e.target.value)}/>
                            <input type="number" name="chambre"  placeholder="chambre" required onChange={(e) => setChambre(e.target.value)}/>
                            <input type="number" name="terrasse" placeholder="terrasse" required onChange={(e) => setTerrasse(e.target.value)}/>
                            <input type="number" name="cave" placeholder="cave" required onChange={(e) => setCave(e.target.value)}/>
                            <input type="text" name="bilanEnergetique"  placeholder="bilan Energetique" required onChange={(e) => setBilanEnergetique(e.target.value)}/>
                            <input type="number" name="prix" placeholder="prix" required onChange={(e) => setPrix(e.target.value)}/>
                            <select name="status" id="" required onChange={(e) => setStatus(e.target.value)}>
                                <option value="">-- votre choix --</option>
                                <option value="sell">vendre</option>
                                <option value="rent">louer</option>
                            </select>
                        </div>
                    </div>

                    <div className="clientData ">
                        <h2>client information</h2>
                        <div className="clientInput addForm entriesDataProduct">
                            <input type="text" name="lastnameClient" placeholder="nom client" required onChange={(e) => setLastname(e.target.value)}/>
                            <input type="text" name="firstnameClient" placeholder="prenom client" required onChange={(e) => setFirstname(e.target.value)}/>
                            <input type="email" name="emailClient" placeholder="email client" required onChange={(e) => setEmail(e.target.value)}/>
                            <input type="number" name="numberClient" placeholder="numero client" required onChange={(e) => setPhone(e.target.value)}/>
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