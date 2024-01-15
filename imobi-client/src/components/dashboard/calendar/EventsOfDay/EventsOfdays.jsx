import { useEffect, useState } from "react";
import './eventsOFDays.css';
import DisplayEvents from "./DisplayEvents/DisplayEvents";

function EventsOfDays({clicked, onClose}){

    const [events , setEvents] = useState(localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []);
    const [statesBtn, setStatesBtn] = useState(true);

    const [titre , setTitre] = useState('');
    const [lastnameVisitor, setLastnameVisitor] = useState('');
    const [firstnameVisitor, setFirstnameVisitor] = useState('');
    const [phoneVisitor, setPhoneVisitor] = useState('');
    const [adresse, setAdresse] = useState('');
    const [phoneOwner, setPhoneOwner] = useState('');
    const [startVisit, setStartVisit] = useState('');
    const [endVisit, setEndVisit] = useState('');

    const btnCreateEvents = () => {
        
        let eventsDayBody = document.querySelector('.eventsDaysContent');
        let formEvents = document.querySelector('.formEvents');
        let btn = document.querySelector('.createEvent');
        
        if (statesBtn == true) {
            eventsDayBody.classList.remove('active');
            formEvents.classList.add('active');

            btn.innerHTML = "annuler";
            
            setStatesBtn(false);

        } else {
            eventsDayBody.classList.add('active');
            formEvents.classList.remove('active');

            btn.innerHTML = "crée event";

            setStatesBtn(true);
        }
    }

    const createEvent = async(e) => {

        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "date" : clicked,
                "startVisit": startVisit, 
                "endVisit": endVisit,
                "adresse": adresse,
                "title" : titre, 
                "lastnameVisitor" : lastnameVisitor, 
                "firstnameVisitor" : firstnameVisitor, 
                "phoneVisitor" : phoneVisitor, 
                "phoneOwner" : phoneOwner
            }),
        };

        try{
            console.log("option", options);
            const response = await fetch('http://127.0.0.1:8000/api/newEvent',options);
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
        <div className="EventsOFDays">
            <div className="eventsOfDaysHeader">
                <h1>Évenement du jour</h1>

                <div className="btnAddEvents">
                    <button onClick={() => btnCreateEvents()} className="createEvent">crée event</button>
                </div>
            </div>
            
            <div className="eventsDayBody">
                <div className="eventsDaysContent active">
                    {
                        events.map((element, index) => (
                        element.date == clicked ? 

                            <DisplayEvents element={element} key={index} clicked={clicked}/>

                        : null
                        ))
                    }

                </div>
                
                <div className="formEvents">
                    <div className="formHeader">
                        <h2>creation d'évenement</h2>
                    </div>

                    <div className="eventsInput">
                        <div className="boxInput">
                            <input type="text" name="titre" id="titre" required onChange={(e) => setTitre(e.target.value)}/>
                            <label htmlFor="titre">titre</label>
                        </div>

                        <div className="boxInput">
                            <input type="text" name="lastname" id="lastname" required onChange={(e) => setLastnameVisitor(e.target.value)}/>
                            <label htmlFor="lastname">nom visiteur</label>
                        </div>

                        <div className="boxInput">
                            <input type="text" name="firstname" id="firstname" required onChange={(e) => setFirstnameVisitor(e.target.value)}/>
                            <label htmlFor="firstname">prenom visiteur</label>
                        </div>

                        <div className="boxInput">
                            <input type="tel" name="phone" id="phone" required onChange={(e) => setPhoneVisitor(e.target.value)}/>
                            <label htmlFor="phone">telephone</label>
                        </div>

                        <div className="boxInput">
                            <input type="text" name="adresse" id="adresse" required onChange={(e) => setAdresse(e.target.value)}/>
                            <label htmlFor="adresse">adresse lieu</label>
                        </div>

                        <div className="boxInput">
                            <input type="tel" name="phoneProprietaire" id="phoneProprietaire" onChange={(e) => setPhoneOwner(e.target.value)}/>
                            <label htmlFor="phoneProprietaire">telephone proprietaire</label>
                        </div>

                        <div className="boxInput">
                            <input type="time" name="startVisit" id="startVisit" required onChange={(e) => setStartVisit(e.target.value)}/>
                            <label htmlFor="startVisit">debut visite</label>
                        </div>

                        <div className="boxInput">
                            <input type="time" name="endVisit" id="endVisit" required onChange={(e) => setEndVisit(e.target.value)}/>
                            <label htmlFor="endVisit">fin de la visite</label>
                        </div>

                        <button type="submit" onClick={() => createEvent()}>valider</button>
                    </div>

                    <div className="AllContact">
                        <h3>tous les contacts</h3>
                    </div>
                </div>
            </div>
            
            <div className="closePopUp">
                <button onClick={onClose}> X </button>
            </div>

        </div>
    )
}
export default EventsOfDays;