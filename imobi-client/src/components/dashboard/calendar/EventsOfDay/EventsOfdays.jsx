import { useState } from "react";
import './eventsOFDays.css';

function EventsOfDays({clicked, onClose}){

    const [events , setEvents] = useState(localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []);
    const [statesBtn, setStatesBtn] = useState(true);

    const [titre , setTitre] = useState();
    const [lastname, setLastname] = useState();
    const [firstname, setFirstname] = useState();
    const [phone, setPhone] = useState();
    const [adresse, setAdresse] = useState();
    const [phoneProprietaire, setPhoneProprietaire] = useState();
    const [startVisit, setStartVisit] = useState();
    const [endVisit, setEndVisit] = useState();

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
   
    const createEvent = () => {

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
                            <div className="eventsDay" key={index}>
                                
                                {element.title}
                            </div>
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
                            <input type="text" name="titre" id="titre" required onClick={(e) => setTitre(e.target.value)}/>
                            <label htmlFor="titre">titre</label>
                        </div>

                        <div className="boxInput">
                            <input type="text" name="lastname" id="lastname" required onClick={(e) => setLastname(e.target.value)}/>
                            <label htmlFor="lastname">nom visiteur</label>
                        </div>

                        <div className="boxInput">
                            <input type="text" name="firstname" id="firstname" required onClick={(e) => setFirstname(e.target.value)}/>
                            <label htmlFor="firstname">prenom visiteur</label>
                        </div>

                        <div className="boxInput">
                            <input type="tel" name="phone" id="phone" required onClick={(e) => setPhone(e.target.value)}/>
                            <label htmlFor="phone">telephone</label>
                        </div>

                        <div className="boxInput">
                            <input type="text" name="adresse" id="adresse" required onClick={(e) => setAdresse(e.target.value)}/>
                            <label htmlFor="adresse">adresse lieu</label>
                        </div>

                        <div className="boxInput">
                            <input type="tel" name="phoneProprietaire" id="phoneProprietaire" onClick={(e) => setPhoneProprietaire(e.target.value)}/>
                            <label htmlFor="phoneProprietaire">telephone proprietaire</label>
                        </div>

                        <div className="boxInput">
                            <input type="time" name="startVisit" id="startVisit" required onClick={(e) => setStartVisit(e.target.value)}/>
                            <label htmlFor="startVisit">debut visite</label>
                        </div>

                        <div className="boxInput">
                            <input type="time" name="endVisit" id="endVisit" required onClick={(e) => setEndVisit(e.target.value)}/>
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