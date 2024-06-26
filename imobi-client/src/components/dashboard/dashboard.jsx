import "./dashboard.css";
import AddProduct from "./addProduct/AddProduct";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    let token = localStorage.getItem('TokenUserImobi');

    const [state, setState] = useState(false);

    const navigate = useNavigate();

    const burgerMenu = () => {
        let dashboard = document.querySelector('.dashboard');
        let line1 = document.querySelector('.line1');
        let line2 = document.querySelector('.line2');
        let line3 = document.querySelector('.line3');

        if(state == false) {
            dashboard.classList.add('burgerMode');
            line1.style.transform = "translate(0px, 15px) rotate(45deg)";
            line2.style.display = "none";
            line3.style.transform = "translate(0px, -15px) rotate(135deg)";
            setState(true);
        } else {
            dashboard.classList.remove('burgerMode');
            line1.style.transform = "translate(0px, 0px) rotate(0)";
            line2.style.display = "flex";
            line3.style.transform = "translate(0px, 2px) rotate(0)";
            setState(false);
        }
    }

    const logout = async() => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL20_2}`, options);
            const data = await response.json();
            console.log('=> :', data);
            if (data.status == "true") {
                localStorage.clear();
                navigate(`${import.meta.env.VITE_API_URL21}`);
            }

        } catch(error){
            console.log("error");
        }
    }

    const deleteUser = async() => {

        let options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`http://127.0.0.1:8000/api/deleteUser`, options);
        const data = await response.json();
        console.log('delete',data);
        if (data.status == "true") {
            navigate(`${import.meta.env.VITE_API_URL21}`);
            localStorage.clear();
        }
    }

    // va chercher tous les events de la personne 
    const getEvents = async() => {
        console.log('get events');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL20_1}`, options);
            const data = await response.json();
            // console.log('=> :', data.data);
            // setEvents(data.data);


            localStorage.setItem('events', JSON.stringify(data.data));
            
        } catch(error){
            console.log("error");
        }
    }

    useEffect(() => {
        getEvents();
    }, [])
    return(
        <div className="dashboard">
            <div className="dashboardNav">
                <div className="logo dashLink">imobi</div>
                <div className="profil">
                    <Link className="dashLink profil" to={`${import.meta.env.VITE_API_URL30}`}>profil</Link>
                </div>
                
                <div className="autre">
                    <Link className="product dashLink" to={`${import.meta.env.VITE_API_URL22}`}>produits</Link>
                    <Link className="dashLink" to={`${import.meta.env.VITE_API_URL23}`}>Créé annonce</Link>
                    <Link className="agenda dashLink" to={`${import.meta.env.VITE_API_URL28}`}>agenda</Link>
                    <Link className=" dashLink" to={`${import.meta.env.VITE_API_URL29}`}>contact</Link>
                </div>

                <div>
                    <div className="logout dashLink" onClick={() => logout()}>se deconnecter</div>
                    <div className="parametre dashLink" onClick={deleteUser}>supprimer</div>
                </div>

            </div>

            <div className="dashBurger" onClick={ () => burgerMenu()}>
                <span className="line1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
            </div>

        </div>
    )
}
export default Dashboard;