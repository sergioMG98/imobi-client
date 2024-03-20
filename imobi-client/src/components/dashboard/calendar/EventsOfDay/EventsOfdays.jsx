import { useEffect, useState } from "react";
import './eventsOFDays.css';
import DisplayEvents from "./DisplayEvents/DisplayEvents";

function EventsOfDays({days, clicked, onClose}){
    console.log('eventsOfDays',clicked);
    
    let token = localStorage.getItem('TokenUserImobi');

    const [events , setEvents] = useState(
        localStorage.getItem('events') != "undefined" ? JSON.parse(localStorage.getItem('events')) : [{}]);

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

    const resetEvents = async() => {
        console.log('get events');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`,
            },
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL10}`, options);
            const data = await response.json();
            /* console.log('=> :', data.data); */
            setEvents(data.data);


            localStorage.setItem('events', JSON.stringify(data.data));
        } catch(error){
            console.log("error");
        }
    }

    const createEvent = async(e) => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`,
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
            const response = await fetch(`${import.meta.env.VITE_API_URL11}`,options);
            const data = await response.json();
            console.log("data",data);
            if(data){
                alert(data.message);
                
            } else {
                alert("try again");
            }
            if (data.status == 'true') {

                let eventsDayBody = document.querySelector('.eventsDaysContent');
                let formEvents = document.querySelector('.formEvents');
                let btn = document.querySelector('.createEvent');

                eventsDayBody.classList.add('active');
                formEvents.classList.remove('active');
    
                btn.innerHTML = "crée event";
    
                setStatesBtn(true);

                // remet les inputs a 0
                setTitre('');
                setLastnameVisitor('');
                setFirstnameVisitor('');
                setPhoneVisitor('');
                setAdresse('');
                setPhoneOwner('');
                setStartVisit('');
                setEndVisit('');
                console.log("data",data);
                
                
                // stock les events actualisé
                localStorage.setItem('events', JSON.stringify(data.events));
                // va stocker dans local storage le jour selectionné
                localStorage.setItem('reset', JSON.stringify(clicked));   
                // va appeler la page , la reset
                window.location.replace('/calendar');
                /* resetEvents(); */
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

                                <DisplayEvents days={days} element={element} key={index} clicked={clicked} />

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
                            <label htmlFor="phoneProprietaire">
                                {
                                    screen.width >= 400 ? "telephone proprietaire" : " tel proprietaire"
                                }
                                
                            </label>
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