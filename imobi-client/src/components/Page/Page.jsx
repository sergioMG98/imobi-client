import Navbar from "../Layouts/Navbar/Navbar";
import CardProduct from "../CardProduct/CardProduct";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import "./page.css";

function Page(){
    const [product, setProduct] = useState([]);
    const [choice, setChoice] = useState();
    const [filterChoice, setFilterChoice] = useState();

    const [search, setSearch] = useState();

    const [latitude ,setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [budgetMin, setBudgetMin] = useState(0);
    const [budgetMax, setBudgetMax] = useState(0);
    const [typeBien, setTypeBien] = useState([]);
    const [pieces, setPieces] = useState();
    const [surface, setSurface] = useState();
    const [ges, setGes] = useState();
    const [dpe, setDpe] = useState();
    const [criteres, setCriteres] = useState([]);

    const [img, setImg] = useState();

    const location = useLocation();
    if(choice == undefined || choice != location.state){
        setChoice(location.state);
    }

    const getProduct = async() => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "status" : choice,
            }),
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL1}`, options);
            const data = await response.json();
            
            setProduct(data.product);
            setImg(data.imageProduct);

        } catch(error){

        }
    }

    //bouton du filtre 
    const moreFilter = (x) => {
        let form = document.querySelector(`.${x}`);
        let filterDiv = document.querySelectorAll(`.filterDiv`);
        let bigFilter = document.querySelector('.allFilter');

        if (x == 'bigFilter') {

            if (filterChoice == x) {

                bigFilter.classList.remove('active');
                setFilterChoice('');

            } else {
                // je supprime le "active" sur les boutons du filtre
                filterDiv.forEach(element => {
                    element.classList.remove('active');
                });
                bigFilter.classList.add('active');
                setFilterChoice(x);
            }

        } else {

            if (filterChoice != x) {

                filterDiv.forEach(element => {
                    element.classList.remove('active');
                });
                
                bigFilter.classList.remove('active');
    
                form.classList.add('active');
    
                setFilterChoice(x);

            } else {
                
                form.classList.remove('active');
    
                setFilterChoice('');
            }
    
        }

    }

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

    /* grand filtre */

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
        console.log("couocu", value, criteres);
        let crit = criteres.find((element) => element == value);
        
        if (crit == undefined) {
            setCriteres([...criteres,value]);

        } else {
            setCriteres(oldValues => {
                return oldValues.filter(c => c !== value)
            })
        }
        
    }

    const BigFilter = (btn) => {
       
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

        // filtre search 
        if (search != undefined) {

            let tempo = [];
            
            if (temporary.length != 0) {
                
                temporary.forEach((element,index) => {
                    
                    if (element.ville.toLowerCase() == search.toLowerCase()) {
                        tempo.push(element);
                    }
                })

            } else {
                product.forEach((element,index) => {
                    console.log("search", element.ville);
                    if (element.ville.toLowerCase() == search.toLowerCase()) {
                        tempo.push(element);
                    }
                })
            }
            
            // reset temporary
            while (temporary.length != 0) {
                temporary.pop();
            }
            // remet des valeurs
            for (let index = 0; index < tempo.length; index++) {
                
                temporary.push(tempo[index]);
            }
            console.log("apres",temporary);

        }

        // filtre type de bien
        if (typeBien.length != 0) {

            let tempo = [];

            // si le tableau n'est pas vide
            if (temporary.length != 0) {

                typeBien.forEach(element => {

                    let t = temporary.filter(items => items.type == element)

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

            // je mets le temporary a 0
            temporary.pop();

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
        console.log("d", temporary);
        
        if (temporary.length == 0) {
            setProductsFiltered(["erreurRecherche"]);
        } else {
            setProductsFiltered(temporary);
        }
        

        // ferme le popup du bigFiltre
        moreFilter(btn);
    }
    
    useEffect(()=> {
        getProduct();
    }, [choice]);
    
    return(
        <div>
            <div className="navbarContainer">
                <Navbar></Navbar>
            </div>

            <div className="contentPage">
                
                <div className="filterContainer">
                    <div className="someFilter">
                        <div className="projectFilter filterDiv" onClick={() => moreFilter('projectFilter')}>
                            <button onClick={() => window.location.reload(true)}>clear</button>   
                        </div>

                        <div className="searchFilter filterDiv" >
                            
                            <button onClick={() => moreFilter('searchFilter')}>search</button>

                            <div className="formFilter">
                                <h2>chercher une ville</h2>
                                <div className="searchPlace">
                                    <input type="text" id="searchFilterForm" onChange={(e) => setSearch(e.target.value)}/>
                                    <label htmlFor="searchFilterForm">votre lieu de recherche</label>
                                </div>
                                

                                <div className="btn-filterValidate">
                                    <button onClick={() => BigFilter('searchFilter') /* getGeo() */}>valider</button>
                                </div>
                            </div>    
                        </div>

                        <div className="typeFilter filterDiv" >
                            
                            <button onClick={() => moreFilter('typeFilter')}>type</button>

                            <div className="formFilter">

                                <h2>Type de bien</h2>

                                <div className="checkboxFilterContainer">


                                    <div className="checkboxFilter">
                                        <input type="checkbox" id="maison" name="someType" value="maison" onClick={() => moreType("maison")}/>
                                        <label htmlFor="maison">maison</label>
                                    </div>

                                    <div className="checkboxFilter">
                                        <input type="checkbox" id="appartement" name="someType" value="appartement" onClick={() => moreType("appartement")}/>
                                        <label htmlFor="appartement">appartement</label>
                                    </div>  

                                    <div className="checkboxFilter">
                                        <input type="checkbox" id="terrain" name="someType" value="terrain" onClick={() => moreType("terrain")}/>
                                        <label htmlFor="terrain">terrain</label>
                                    </div>  

                                    <div className="checkboxFilter">
                                        <input type="checkbox" id="localCommercial" name="someType" value="localCommercial" onClick={() => moreType("localCommercial")}/>
                                        <label htmlFor="localCommercial">local Commercial</label>
                                    </div>  

                                    <div className="checkboxFilter">
                                        <input type="checkbox" id="parking" name="someType" value="parking" onClick={() => moreType("parking")}/>
                                        <label htmlFor="parking">parking / box</label>
                                    </div>  

                                </div>

                                <div className="btn-filterValidate">
                                    <button onClick={() => BigFilter('typeFilter')}>valider</button>
                                </div>
                            </div>  
                        </div>

                        <div className="budgetFilter filterDiv" >   
                            
                            <button onClick={() => moreFilter('budgetFilter')}>budget</button>
                            
                            <div className="formFilter ">
                                <h2>votre budget</h2>   

                                <div className="budgetMin">
                                    <input type="number" id="budgetMin" onChange={(e) => setBudgetMin(e.target.value)}/>
                                    <label htmlFor="budgetMin">Budget min</label>
                                </div> 

                                <div className="budgetMax">
                                    <input type="number" id="budgetMax" onChange={(e) => setBudgetMax(e.target.value)}/>
                                    <label htmlFor="budgetMax">Budget max</label>
                                </div> 

                                <div className="btn-filterValidate">
                                    <button onClick={() => BigFilter('budgetFilter')}>valider</button>
                                </div>
                            </div>  
                        </div>

                    </div>
                    <div className="allFilter">
                        <button onClick={() => moreFilter('bigFilter')}> big filter</button>

                        <div className="allFormFilter">
                            <div className="allFilterInput">
                                <h2>filtres</h2>

                                <div className="bigFilterSearch bigFilterInput">
                                    
                                    <label htmlFor="bigPlace">votre lieu</label>
                                    <input type="text" name="" id="bigPlace" onChange={(e) => setSearch(e.target.value)}/>
                                    
                                </div>

                                <div className="bigFilterBudget bigFilterInput">
                                    <h2>budget</h2>
                                    <div>
                                        <label htmlFor="bigBudgetMMin">budget min</label>
                                        <input type="number" name="" placeholder={budgetMin} id="bigBudgetMin" onChange={(e) => setBudgetMin(e.target.value)}/>
                                    </div>

                                    <div>
                                        <label htmlFor="bigBudgetMin">budget max</label>
                                        <input type="number" name="" placeholder={budgetMax} id="bigBudgetMin" onChange={(e) => setBudgetMax(e.target.value)}/>
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
                                                name="piscine" 
                                                value="piscine"
                                                id="bigPiscine" 
                                                checked={criteres.find((element) => element == "piscine") != undefined ? 'checked' : null}
                                                />
                                            <label htmlFor="bigPiscine">piscine</label>
                                        </div>

                                        <div className="critere crit-ascenseur" onClick={() => moreCritere('ascenseur')}>
                                            <input 
                                                type="checkbox" 
                                                name="" 
                                                value="ascenseur"
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
                                <button onClick={() => BigFilter('bigFilter')}>valider</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cardContainer">
                    {
                        
                        productsFiltered.length == 0 ? 
                            // si productFiltered est vide
                            product?.map((elements, index) => 
                                <CardProduct product={elements} imageProduct={img} key={index}></CardProduct>
                            )
                        : 

                            productsFiltered[0] == "erreurRecherche" ?
                                <div>
                                    aucune annonce ne correspond a votre recherche
                                </div>
                            :

                                productsFiltered?.map((elements, index) => 
                                    
                                    <CardProduct product={elements} imageProduct={img} key={index}></CardProduct>
                                    
                                )
                    }

                    
                </div>

                
            </div>
        </div>
    )
}
export default Page;