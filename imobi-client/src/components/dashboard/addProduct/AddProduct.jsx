import { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import "../page.css";
import "./addProduct.css";

function AddProduct() {
    let token = localStorage.getItem('TokenUserImobi');

    const [customersArray, setCustomersArray] = useState([]);

    const [status, setStatus] = useState();
    const [prix, setPrix] = useState();
    const [description, setDescription] = useState();
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
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [ville, setVille] = useState();
    const [label, setLabel] = useState();

    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [idCustomer, setIdCustomer] = useState();

    const [searchMenu, setSearchMenu] = useState([]);

    let addProduct = {status, prix, description, surface, ges, dpe, type, piece, surfaceTerrain, salleDeBain, chambre, terrasse, balcon, garage, piscine, ascenseur, cave, longitude, latitude, ville, lastname, firstname, email, phone, idCustomer, label};

    const [stateButton, setStateButton] = useState(false);

    // envoie les donnée pour crée les products
    const handleAddProduct = async(e) => {
        /* e.preventDefault(); */
        console.log('test');
        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(addProduct),
        };

        try{
            console.log("option", options);
            const response = await fetch(`${import.meta.env.VITE_API_URL8}`,options);
            const data = await response.json();
            console.log("creation product", data);

            if(data.status == 'true' ){
                alert(data.message);
                window.location.reload(false);
            }

        } catch (error){
            console.error("Fetch error:" , error);
        }
    }

    const newCustomerButton = () => {
        let form = document.querySelector('.clientInput');
        let allCustomerOfSeller = document.querySelector('.allCustomerOfSeller')

        if (stateButton == false) {
            form.classList.add('active');
            allCustomerOfSeller.classList.remove('active');

            setStateButton(true);
        } else {
            form.classList.remove('active');
            allCustomerOfSeller.classList.add('active');

            setStateButton(false);
        }
    }

    const getCustomers = async() => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL9}`, options);
            const data = await response.json();
            console.log('=> :', data);
            setCustomersArray(data.customers)

        } catch(error){
            console.log("error");
        }
    }

    // met les valeur pour les clients deja existant
    const putCustomerData = (lastname, firstname, phone, email, id) => {
        console.log("put",lastname, firstname, phone, email, id);
        setLastname(lastname);
        setFirstname(firstname);
        setEmail(email);
        setPhone(phone);
        setIdCustomer(id)

        let customer = document.querySelectorAll('.customer');
        let custo = document.querySelector(`.custo-${id}`);

        customer.forEach(element => {
            element.style.backgroundColor = "white";
            element.style.color = "#242424";
        })

        custo.style.backgroundColor = "#12c012";
        custo.style.color = "white";
    }

    // obtention des coordonnes du lieu
    const getGeo = async(valeurInput) => {
        console.log("getGeo", valeurInput);
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            console.log('option',options);
            const response = await fetch(`${import.meta.env.VITE_API_URL5}${valeurInput}`, options);
            const data = await response.json();
            
            if (data.features.length != 0) {
                console.log("go", data);
                setSearchMenu(data.features);
                document.querySelector('.allSearch').classList.add('active');

            } 
    
        } catch(error){
            document.querySelector('.allSearch').classList.remove('active');
        }
    }
    
    // insertion des valeur dans les constantes
    const putCoordonne = (element) => {
        console.log("putCoordonne",element);
        setLatitude(element.geometry.coordinates[1]);
        setLongitude(element.geometry.coordinates[0]);
        setVille(element.properties.city);
        setLabel(element.properties.label);

        document.querySelector('.allSearch').classList.remove('active');
    }


    useEffect(() => {
        getCustomers();
    }, [])


    return (
        <div className="container">
            <div className="dashboardContainer">
                <Dashboard></Dashboard>
            </div>

            <div className="addProductContainer dashContent">

                <h1>création de lieu</h1>


                <div className="form" action="" method="post">
                    <div className="productData">
                        <h2>produit informaition</h2>

                        <div className="addForm textAreaAddProduct">
                            <textarea name="description" id="description" cols="30" rows="10" required onChange={(e) => setDescription(e.target.value)}></textarea>
                            <label htmlFor="description">description</label>
                        </div>

                        <div className="addForm entriesDataProduct">

                            <div className=" inputContainer">
                                <input type="text" id="city" onChange={(e) => getGeo(e.target.value)} required/>
                                <label htmlFor="city">adresse du lieu</label>
                                
                                <div className="allSearch">
                                    {
                                        searchMenu?.map((element, index) => {
                                            return (
                                                <div className="adresseChoix" onClick={() => putCoordonne(element)} >
                                                    {element.properties.label}
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            </div>

                            <div className="inputContainer">
                                <select name="status" id="addProductStatus" required onChange={(e) => setStatus(e.target.value)}>
                                    <option value=""></option>
                                    <option value="sell">vendre</option>
                                    <option value="rent">louer</option>
                                </select>
                                <label htmlFor="addProductSelect">status</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="prix" id="prix" required onChange={(e) => setPrix(e.target.value)}/>
                                <label htmlFor="prix">prix</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="surface"  id="surface" required onChange={(e) => setSurface(e.target.value)}/>
                                <label htmlFor="surface">surface</label>
                            </div>

                            <div className="inputContainer">
                                <select name="ges" id="addProductGes" required onChange={(e) => setGes(e.target.value)}>
                                    <option value=""></option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                    <option value="c">C</option>
                                    <option value="d">D</option>
                                    <option value="e">E</option>
                                    <option value="f">F</option>
                                </select>
                                <label htmlFor="addProductGes">ges</label>
                            </div>

                            <div className="inputContainer">
                                <select name="dpe" id="addProductDpe" required onChange={(e) => setDpe(e.target.value)}>
                                    <option value=""></option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                    <option value="c">C</option>
                                    <option value="d">D</option>
                                    <option value="e">E</option>
                                    <option value="f">F</option>
                                </select>
                                <label htmlFor="addProductDpe">dpe</label>
                            </div>

                            <div className="inputContainer">
                                <select name="type" id="addProductType" required onChange={(e) => setType(e.target.value)}>
                                    <option value=""></option>
                                    <option value="appartement">APPARTEMENT</option>
                                    <option value="maison">MAISON</option>
                                    <option value="terrain">TERRAIN</option>
                                    <option value="localCommercial">LOCAL COMMERCIAL</option>
                                </select>
                                <label htmlFor="type">type</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="piece" id="piece" onChange={(e) => setPiece(e.target.value)}/>
                                <label htmlFor="piece">nombre de piece</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="surfaceTerrain" id="surfaceTerrain" onChange={(e) => setSurfaceTerrain(e.target.value)}/>
                                <label htmlFor="surfaceTerrain">surface Terrain</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="salleDeBain"  id="salleDeBain" onChange={(e) => setSalleDeBain(e.target.value)}/>
                                <label htmlFor="salleDeBain">salle De Bain</label>

                            </div>

                            <div className="inputContainer">
                                <input type="number" name="chambre"  id="chambre" onChange={(e) => setChambre(e.target.value)}/>
                                <label htmlFor="chambre">nombre de chambre</label>

                            </div>

                            <div className="inputContainer">
                                <input type="number" name="terrasse" id="terrasse"  onChange={(e) => setTerrasse(e.target.value)}/>
                                <label htmlFor="terrasse">terrasse</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="balcon" id="balcon"  onChange={(e) => setBalcon(e.target.value)}/>
                                <label htmlFor="balcon">nombre de balcon</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="garage" id="garage"  onChange={(e) => setGarage(e.target.value)}/>
                                <label htmlFor="garage">nombre de garage</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="piscine" id="piscine"  onChange={(e) => setPiscine(e.target.value)}/>
                                <label htmlFor="piscine">nombre de piscine</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="ascenseur" id="ascenseur"  onChange={(e) => setAscenseur(e.target.value)}/>
                                <label htmlFor="ascenseur">ascenseur</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="cave" id="cave"  onChange={(e) => setCave(e.target.value)}/>
                                <label htmlFor="cave">nombre de cave</label>
                            </div>
 
                        </div>
                    </div>

                    <div className="clientData ">
                        <h2>client information</h2>

                        <button id="newCustomerButton" onClick={() => newCustomerButton()}> new client</button>
                        
                        <div className="clientInput addForm entriesDataProduct">
                            <div className="inputContainer">
                                <input type="text" name="lastnameClient" id="lastnameClient" onChange={(e) => setLastname(e.target.value)}/>
                                <label htmlFor="lastnameClient">lastname</label>
                            </div>

                            <div className="inputContainer">
                                <input type="text" name="firstnameClient" id="firstnameClient" onChange={(e) => setFirstname(e.target.value)}/>
                                <label htmlFor="firstnameClient">firstname</label>
                            </div>

                            <div className="inputContainer">
                                <input type="email" name="emailClient" id="emailClient" onChange={(e) => setEmail(e.target.value)}/>
                                <label htmlFor="emailClient">email</label>
                            </div>

                            <div className="inputContainer">
                                <input type="number" name="numberClient" id="numberClient" onChange={(e) => setPhone(e.target.value)}/>
                                <label htmlFor="numberClient">number</label>
                            </div>

                        </div>

                        <div className="allCustomerOfSeller active">
                            {
                                customersArray?.map((element, index) => {
                                    {console.log('loop', customersArray)}
                                    return(
                                        <div className={`customer custo-${element.id}`}>
                                            <div>{element.lastname}</div>
                                            <div>{element.firstname}</div>
                                            <div>{element.phone}</div>
                                            <div><button onClick={() => putCustomerData(element.lastname, element.firstname, element.phone, element.email, element.id)}>choisir</button></div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                
                    <div className="addProductButton">
                        <button  className="addForm" onClick={() => handleAddProduct()}>valider</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default AddProduct;