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

    let addProduct = {description, piece, surfaceTerrain, surface, salleDeBain, chambre, terrasse, cave, bilanEnergetique};

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
                    <div className="addForm textAreaAddProduct">
                        <textarea name="description" id="" cols="30" rows="10" placeholder="description" required onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="addForm entriesDataProduct">
                        <input type="number" name="piece" id="" placeholder="piece" required onChange={(e) => setpiece(e.target.value)}/>
                        <input type="number" name="surfaceTerrain" id="" placeholder="surfaceTerrain" required onChange={(e) => setSurfaceTerrain(e.target.value)}/>
                        <input type="number" name="surface" id="" placeholder="surface" required onChange={(e) => setSurface(e.target.value)}/>
                        <input type="number" name="salleDeBain" id="" placeholder="salleDeBain" required onChange={(e) => setSalleDeBain(e.target.value)}/>
                        <input type="number" name="chambre" id="" placeholder="chambre" required onChange={(e) => setChambre(e.target.value)}/>
                        <input type="number" name="terrasse" id="" placeholder="terrasse" required onChange={(e) => setTerrasse(e.target.value)}/>
                        <input type="number" name="cave" id="" placeholder="cave" required onChange={(e) => setCave(e.target.value)}/>
                        <input type="text" name="bilanEnergetique" id="" placeholder="bilanEnergetique" required onChange={(e) => setBilanEnergetique(e.target.value)}/>
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