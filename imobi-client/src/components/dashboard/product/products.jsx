import { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import "./products.css";
import { Link } from "react-router-dom";

function Product(){
    let token = localStorage.getItem('TokenUserImobi');

    const [product, setProducts] = useState([]);
    const [filterChoice, setFilterChoice] = useState();

    const [search, setSearch] = useState('');
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [budgetMin, setBudgetMin] = useState(0);
    const [budgetMax, setBudgetMax] = useState(0);
    const [typeBien, setTypeBien] = useState([]);
    const [pieces, setPieces] = useState();
    const [surface, setSurface] = useState();
    const [ges, setGes] = useState();
    const [dpe, setDpe] = useState();
    const [criteres, setCriteres] = useState([]);


    const sellerProduct = () => {
       
       function filterItem(item, element){
       
        switch (item) {

            case 'type':
                return (<div className="cardSellerPrice cardSellerElement elementType">{element[item]} </div>)
                break;

            case 'ville':
                return (<div className="cardSellerPrice cardSellerElement elementVille">{element[item]} </div>)
                break;

            case 'prix':
                return (<div className="cardSellerPrice cardSellerElement elementPrix">{element[item]} €</div>)
                break;
        
            case 'status':
                    if ( element[item] == "sell") {
                        return (<div className="cardSellerStatus cardSellerElement elementStatus">A vendre</div>)
                    } else if (element[item] == "rent"){
                        return (<div className="cardSellerStatus cardSellerElement elementStatus">A louer</div>)
                    } else if (element[item] == "sold") {
                        return (<div className="cardSellerStatus cardSellerElement elementStatus" style={{backgroundColor: "#31c631", color: "white"}} >vendu</div>)
                    }else if (element[item] == "rented") {
                        return (<div className="cardSellerStatus cardSellerElement elementStatus" style={{backgroundColor: "#31c631 ", color: "white"}} >loué</div>)
                    }
                break;
        
            default:
                break;
        }
       } 

       
       if (productsFiltered.length == 0) {
            return (
                product.map((element, index) => {
                
                    return(
                        <Link to={"/detailDashboard"} state={element.id} className="productSellerCard" id={"product_seller_"+index}>
                        
                            <div className="cardProductSellerInfo" key={index} >
                                {Object.keys(element).map(item => {
                                    /* console.log(item, element[item]); */
                                    return (filterItem(item, element))

                                })}
                            </div>

                        </Link>
                    );
                })
            );
        } else {
        
            return (
                productsFiltered?.map((element, index) => {
                
                    return(
                        <Link to={"/detailDashboard"} state={element.id} className="productSellerCard" id={"product_seller_"+index}>
                        
                            <div className="cardProductSellerInfo">
                                {Object.keys(element).map(item => {
                                    
                                    return (filterItem(item, element))

                                })}
                            </div>

                        </Link>
                    );
                })
                
            );
        }

    }

    const getProduct = async() => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            console.log('option',options);
            const response = await fetch(`${import.meta.env.VITE_API_URL18}`, options);
            const data = await response.json();
            /* console.log('get', data); */
            setProducts(data.product);
        } catch(error){

        }
    }


    /* grand filtre */
    
    // place ou retire un type du tableau
    const moreType = (value) => {

        let type = typeBien.find((element) => element == value);

        if (type == undefined) {
            setTypeBien([...typeBien,value])

        } else {
            setTypeBien(oldValues => {
                return oldValues.filter(type => type !== value)
            })
        }
        
    }
    //bouton du filtre 
    const moreFilter = (x) => {

        let form = document.querySelector(`.${x}`);
        

        if (filterChoice != x) {

            form.classList.add('active');

            setFilterChoice(x);

        } else {
            
            form.classList.remove('active');

            setFilterChoice('');
        }
    
        

    }
    const numberPieces = (number) => {
        setPieces(number);

        let pieceDiv = document.querySelectorAll('.numberPiece div');
        let classnamePiece = document.querySelector(`.piece-${number}`);

        pieceDiv.forEach(element => {
            element.style.border= '2px solid darkgrey';
        });
        
        classnamePiece.style.setProperty('border', '2px solid blue');

    }
    const numberSurface = (number) => {
        setSurface(number);

        let surfaceDiv = document.querySelectorAll('.surfaceMinimum div');
        let classnameSurface = document.querySelector(`.surface-${number}`);

        surfaceDiv.forEach(element => {
            element.style.border= '2px solid darkgrey';
        });
        
        classnameSurface.style.setProperty('border', '2px solid blue');

    }
    const moreCritere = (value) => {

        let crit = criteres.find((element) => element == value);
        
        if (crit == undefined) {
            setCriteres([...criteres,value]);

        } else {
            setCriteres(oldValues => {
                return oldValues.filter(c => c !== value)
            })
        }
        
    }
    const BigFilter = () => {

        /* -------------- */
        let temporary = [];

        
        // filtre budget  
        if (budgetMax != 0 || budgetMin != 0) {

            let tempo = [];

            if (budgetMin != 0 && budgetMax == 0) {
                tempo.push( product.filter((element) => element.prix >= budgetMin ));
            } else if(budgetMin == 0 && budgetMax != 0) {
                tempo.push( product.filter((element) => element.prix <= budgetMax ))
            } else {
                tempo.push( product.filter((element) => element.prix >= budgetMin && element.prix <= budgetMax ))
            }
             
            if (tempo.length != 0) {
                            // remet des valeurs
                for (let index = 0; index < tempo.length; index++) {
    
                    tempo[index].forEach(element => {
                
                        temporary.push(element);
                    });
            }

            }


            
        }
        // filtre type de bien
        if (typeBien.length != 0) {

            let tempo = [];
            
            // si le tableau n'est pas vide
            if (temporary.length != 0) {

                typeBien.forEach(element => {

                    let t = temporary.filter(items => items.type == element)
                    console.log('test',t);
                    if (t.length != 0) {
                        // je push une valeur
                        tempo.push(t);
                    }
                    
                });
                
            } else {
                
                typeBien.forEach(element => {

                    let t = product.filter(items => items.type == element)

                    if (t.length != 0) {
                        // je push une valeur
                        tempo.push(t);
                    }
                    
                });
            }

            // reset temporary
            while (temporary.length != 0) {
                temporary.pop();
            }
            // je push une valeur
            for (let index = 0; index < tempo.length; index++) {
                
                tempo[index].forEach(element => {
                
                    temporary.push(element);
                });
            }
        } 
        // filtre piece 
        if (pieces != undefined) {
            
            let tempo = [];

            if (temporary != 0) {

                tempo.push(
                    temporary.filter(element => element.piece >= pieces)
                )
                
            } else {
                tempo.push(
                    product.filter(element => element.piece >= pieces)
                )
            }
            // reset temporary
            while (temporary.length != 0) {
                temporary.pop();
            }
            // remet des valeurs
            for (let index = 0; index < tempo.length; index++) {
                
                tempo[index].forEach(element => {
                
                    temporary.push(element);
                });
            }
        }

        // filtre la surface
        if (surface != undefined) {
            
            let tempo = [];

            if (temporary != 0) {

                tempo.push(
                    temporary.filter(element => element.surface >= surface)
                )
                
            } else {
                tempo.push(
                    product.filter(element => element.surface >= surface)
                )
            }
            // reset temporary
            while (temporary.length != 0) {
                temporary.pop();
            }
            // remet des valeurs
            for (let index = 0; index < tempo.length; index++) {
                
                tempo[index].forEach(element => {
                
                    temporary.push(element);
                });
            }
        }

        // ges
        if (ges != undefined) {
            
            let tempo = [];

            if (temporary != 0) {

                tempo.push(
                    temporary.filter((element) => element.ges == ges)
                );
                
            } else {
                tempo.push(
                    product.filter((element) => element.ges == ges)
                );
            }

            // reset temporary
            while (temporary.length != 0) {
                temporary.pop();
            }
            // remet des valeurs
            for (let index = 0; index < tempo.length; index++) {
                
                tempo[index].forEach(element => {
                
                    temporary.push(element);
                });
            }
        }

        // dpe
        if (dpe != undefined) {
            
            let tempo = [];

            if (temporary != 0) {

                tempo.push(
                    temporary.filter((element) => element.dpe == dpe)
                );
                
            } else {
                tempo.push(
                    product.filter((element) => element.dpe == dpe)
                );
            }
            // reset temporary
            while (temporary.length != 0) {
                temporary.pop();
            }
            // remet des valeurs
            for (let index = 0; index < tempo.length; index++) {
                
                tempo[index].forEach(element => {
                
                    temporary.push(element);
                });
            }
        }

        // filtre critere
        if (criteres.length != 0) {
            
            let tempo = [];

            // si le tableau n'est pas vide
            if (temporary.length != 0) {

                criteres.forEach(element => {
                    
                    let t = temporary.filter(items => items.element != null)

                    if (t.length != 0) {
                        // je push une valeur
                        tempo.push(t);
                    }
                    
                });
                
            } else {
                
                criteres.forEach(element => {

                    let t = product.filter(items => items[`${element}`] != undefined)
                    
                    if (t.length != 0) {
                        // je push une valeur
                        tempo.push(t);
                    }
                    
                });
            }

            // je mets le temporary a 0
            temporary.pop();

            // reset temporary
            while (temporary.length != 0) {
                temporary.pop();
            }

            // je push une valeur
            for (let index = 0; index < tempo.length; index++) {
                
                tempo[index].forEach(element => {
                
                    temporary.push(element);
                });
            }
        } 
        
        
        if (temporary.length == 0) {
            setProductsFiltered(["erreurRecherche"]);
        } else {
            setProductsFiltered(temporary);
        }
        

        // ferme le popup du bigFiltre
        moreFilter('filterProduct');
    }
    

    useEffect(()=> {
        getProduct();
    }, []);

    return(
        <div className="products">
            <div className="dashboardContainer">
                <Dashboard></Dashboard>
            </div>

            <div className="dashContent">
                <h1>product</h1>
                
                <button className='filtreButton' onClick={() => moreFilter('filterProduct')}>filtrer</button>

                <div className="filterProduct">
                            <div className="allFilterInput">
                                <h2>filtres</h2>

                                <div className="bigFilterSearch bigFilterInput">
                                    
                                    <label htmlFor="bigPlace">votre lieu</label>
                                    <input type="text" name="bigPlace" id="bigPlace" />
                                    
                                </div>

                                <div className="bigFilterBudget bigFilterInput">
                                    <h2>budget</h2>
                                    <div>
                                        <label htmlFor="bigBudgetMin">budget min</label>
                                        <input type="number" name="bigBudgetMin" placeholder={budgetMin} id="bigBudgetMin" onChange={(e) => setBudgetMin(e.target.value)}/>
                                    </div>

                                    <div>
                                        <label htmlFor="bigBudgetMax">budget max</label>
                                        <input type="number" name="bigBudgetMax" placeholder={budgetMax} id="bigBudgetMax" onChange={(e) => setBudgetMax(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="bigFilterType bigFilterInput">
                                    <h2>type de bien</h2>

                                    <div className="bigFilterCheckboxContainer">
                                        <div className="checkboxFilter">
                                            
                                            <input 
                                                type="checkbox" 
                                                id="bigMaison" 
                                                name="someType" 
                                                value="maison" 
                                                onClick={() => moreType("maison")}
                                                checked={typeBien.find((element) => element == "maison") != undefined ? 'checked' : null}
                                                
                                            />
                                            <label htmlFor="bigMaison">maison</label>
                                        </div>

                                        <div className="checkboxFilter">
                                            <input 
                                                type="checkbox" 
                                                id="BigAppartement" 
                                                name="someType" 
                                                value="appartement" 
                                                onClick={() => moreType("appartement")}
                                                checked={typeBien.find((element) => element == "appartement") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigAppartement">appartement</label>
                                        </div>  

                                        <div className="checkboxFilter">
                                            <input 
                                                type="checkbox" 
                                                id="bigTerrain" 
                                                name="someType" 
                                                value="terrain" 
                                                onClick={() => moreType("terrain")}
                                                checked={typeBien.find((element) => element == "terrain") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigTerrain">terrain</label>
                                        </div>  

                                        <div className="checkboxFilter">
                                            <input 
                                                type="checkbox" 
                                                id="bigLocalCommercial" 
                                                name="someType" 
                                                value="localCommercial" 
                                                onClick={() => moreType("localCommercial")}
                                                checked={typeBien.find((element) => element == "localCommercial") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigLocalCommercial">local Commercial</label>
                                        </div> 

                                        <div className="checkboxFilter">
                                            <input 
                                                type="checkbox" 
                                                id="bigParking" 
                                                name="someType" 
                                                value="parking" 
                                                onClick={() => moreType("parking")}
                                                checked={typeBien.find((element) => element == "parking") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigParking">parking / box</label>
                                        </div>

                                    </div>


                                      

                                </div>

                                <div className="bigFilterPiece bigFilterInput">
                                    <h2>nombre de pieces minimum</h2>
                                    
                                    <div className="numberPiece">
                                        <div className="piece-1" onClick={() => numberPieces(1)}>1</div>
                                        <div className="piece-2" onClick={() => numberPieces(2)}>2</div>
                                        <div className="piece-3" onClick={() => numberPieces(3)}>3</div>
                                        <div className="piece-4" onClick={() => numberPieces(4)}>4</div>
                                        <div className="piece-5" onClick={() => numberPieces(5)}>5 +</div>
                                    </div>

                                </div>

                                <div className="bigFilterSurface bigFilterInput">
                                    <h2>surface minimum</h2>
                                    
                                    <div className="surfaceMinimum">
                                        <div className="surface-0" onClick={() => numberSurface(0)}>0</div>
                                        <div className="surface-20" onClick={() => numberSurface(20)}>20</div>
                                        <div className="surface-40" onClick={() => numberSurface(40)}>40</div>
                                        <div className="surface-60" onClick={() => numberSurface(60)}>60</div>
                                        <div className="surface-80" onClick={() => numberSurface(80)}>80 +</div>
                                    </div>
                                </div>

                                <div className="bigFilterPerformance bigFilterInput">

                                    <h2>performance energetique</h2>
                                    
                                    <div className="performanceEnergetique">
                                        <div className="ges">
                                            <select name="ges" id="ges" onChange={(e) => setGes(e.target.value)}>
                                                <option value=""></option>
                                                <option value="a">A</option>
                                                <option value="b">B</option>
                                                <option value="c">C</option>
                                                <option value="d">D</option>
                                                <option value="e">E</option>
                                                <option value="f">F</option>
                                                <option value="g">G</option>
                                            </select>
                                            <label htmlFor="ges">ges</label>
                                        </div>
                                        <div className="dpe">
                                            <select name="dpe" id="dpe" onChange={(e) => setDpe(e.target.value)}>
                                                <option value=""></option>
                                                <option value="a">A</option>
                                                <option value="b">B</option>
                                                <option value="c">C</option>
                                                <option value="d">D</option>
                                                <option value="e">E</option>
                                                <option value="f">F</option>
                                                <option value="g">G</option>
                                            </select>
                                            <label htmlFor="dpe">dpe</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="bigFilterCriteres bigFilterInput">
                                    <h2>criteres </h2>
                                    
                                    <div className="criteresContainer" >
                                        <div className="critere crit-balcon" onClick={() => moreCritere('balcon')}>
                                            <input 
                                                type="checkbox" 
                                                name="" 
                                                id="bigBalcon"
                                                checked={criteres.find((element) => element == "balcon") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigBalcon">balcon</label>
                                        </div>

                                        <div className="critere crit-terrasse" onClick={() => moreCritere('terrasse')}>
                                            <input 
                                                type="checkbox" 
                                                name="" 
                                                id="bigTerrasse" 
                                                checked={criteres.find((element) => element == "terrasse") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigTerrasse">terrasse</label>
                                        </div>

                                        <div className="critere crit-garage" onClick={() => moreCritere('garage')}>
                                            <input 
                                                type="checkbox" 
                                                name="" 
                                                id="bigGarage" 
                                                checked={criteres.find((element) => element == "garage") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigGarage">garage</label>
                                        </div>

                                        <div className="critere crit-piscine" onClick={() => moreCritere('piscine')}>
                                            <input 
                                                type="checkbox" 
                                                name="" 
                                                id="bigPiscine" 
                                                checked={criteres.find((element) => element == "piscine") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigPiscine">piscine</label>
                                        </div>

                                        <div className="critere crit-ascenseur" onClick={() => moreCritere('ascenseur')}>
                                            <input 
                                                type="checkbox" 
                                                name="" 
                                                id="bigAscenseur"
                                                checked={criteres.find((element) => element == "ascenseur") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigAscenseur">ascenseur</label>
                                        </div>

                                        <div className="critere crit-cave" onClick={() => moreCritere('cave')}>
                                            <input 
                                                type="checkbox" 
                                                name="" 
                                                id="bigCave" 
                                                checked={criteres.find((element) => element == "cave") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigCave">cave</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            

                            <div className="btn-allFilter">
                                <button onClick={() => BigFilter()}>valider</button>
                            </div>
                </div>

                <div className="barProduct">
                    <p>type</p>
                    <p>ville</p>
                    <p>prix</p>
                    <p>status</p>
                </div>

                <div className="sellerProduct">
                    {sellerProduct()}
                </div>

            </div>

        </div>
    )
}
export default Product;