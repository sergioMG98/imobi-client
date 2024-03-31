// video : https://www.youtube.com/watch?v=Q5Xen_Y7lUk&t=0s

import { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import "./calendar.css";
import Day from "./Days/Day";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import EventsOfDays from "./EventsOfDay/EventsOfdays";
import { useLocation } from "react-router-dom";

function Calendar(props){
    let token = localStorage.getItem('TokenUserImobi');

    console.log('calendar');
    const [nav, setNav] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('');
    const [clicked, setClicked] = useState(
        localStorage.getItem('reset') ? JSON.parse(localStorage.getItem('reset')) : "",
    );

    const [events, setEvents] = useState(
        //parse : converti text en objet
        localStorage.events != 'undefined' ? JSON.parse(localStorage.getItem('events')) : null
    ); 

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

    // va verifier si il y un evenemnt qui existe pour le jour choisi
    const eventForDate = date => events?.find(obj => {
        return obj.date == date;
    })

    // va fermer le popup puis delete "reset" dans local storage
    const clearLocal = () => {
        setClicked(null);
        localStorage.removeItem("reset");
    }

    useEffect(() => {
        getEvents();
    }, [])

    useEffect(() => {
        console.log("useEffect ----> ");
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const semaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

        // obtenir date courante en rapport avec les millisecondes depuis 1970
        const dt = new Date();
       
        // nav : permet de naviguer par rapport aux mois
        if(nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        // methode getDate() : retourne le jour du mois
        const day = dt.getDate();
        // méthode getMonth() : retourne le mois d'une année, 0 est janvier et 11 est decembre
        const month = dt.getMonth();
        // méthode getFullYear : retourne l'année au format quatre chiffres
        const year = dt.getFullYear();

        // je récupere un jour specifique '1'
        const firstDayOfMonth = new Date(year, month, 1);

        // recupere le nombre de jour du mois
        const daysInMonth = new Date( year, month + 1, 0).getDate();

        // .toLocalDateString : permet d'obtenir une date en tant que chaine de caractere
        // date premier jour mois : jour 01/mois/année
        const dateString = firstDayOfMonth.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        
        // stock dans dateDisplay l'affichage du mois et année
        setDateDisplay(`${dt.toLocaleDateString('fr-FR', {month: 'long'})} ${year} `);
        
        // indeOf : renvoie le premier indice pour lequel il trouve l'element s'il ne trouve pas il renvoie "-1"
        // split : place chaque element separer d'un espace dans un tableau
        
        // decortique la date et recupere le jour'[0]' puis verifie si le jour existe dans le tableau "semaine"
        const paddingDays = semaine.indexOf(dateString.split(' ')[0]);
        
        const daysArr = [];
        
        // va mettre des valeur dans le tableau "dayArr" pour chaque jour
        for(let i = 1; i <= paddingDays + daysInMonth; i++){
            
            // met un zero devant un nombre unique comme 9 -> 09
            const numberDays = (i - paddingDays) >= 1 && (i - paddingDays) <= 9 ? `0${i - paddingDays}` : (i - paddingDays);

            const dayString = month + 1 >= 10 ? `${year}-${month + 1}-${numberDays}` : `${year}-0${month + 1}-${numberDays}`;
            
            if(i > paddingDays){
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0/*  ? true : false */,
                    date: dayString, 
                });
            } else {
                daysArr.push({
                    value: 'padding',
                    event: null,
                    isCurrentDay: false/*  ? true : false */,
                    date: '', 
                });
            }
        }
        /* console.log("test", daysArr); */
        setDays(daysArr);

    }, [events, nav]);

    let location = useLocation();
    console.log("loc", history, clicked);


    return (
        <>
            <div className="calendarParent">
                <div className="dashboardContainer">
                    <Dashboard></Dashboard>
                </div>

                <div className="calendarContent">
                    
                    <div className="calendarHeaderContainer">
                        <CalendarHeader
                            dateDisplay={dateDisplay}
                            onNext={() => setNav(nav + 1)}
                            onBack={() => setNav(nav - 1)}
                        />

                    </div>

                    {
                        /* determine la taille de l'ecran */
                        screen.width >= 575 ?
                            <div className="weekdays">

                                <div>Lundi</div>
                                <div>Mardi</div>
                                <div>Mercredi</div>
                                <div>Jeudi</div>
                                <div>Vendredi</div>
                                <div>Samedi</div>
                                <div>Dimanche</div>
                            </div>
                        : 
                            <div className="weekdays">

                                <div>Lun</div>
                                <div>Mar</div>
                                <div>Mer</div>
                                <div>Jeu</div>
                                <div>Ven</div>
                                <div>Sam</div>
                                <div>Dim</div>
                            </div>
                            
                    }


                    <div id="calendar" className="calendar">
                        {console.log("all days =========", days )}
                        {days.map((d, index) => (
                            <div className={`dayContainer ${d.value}`} key={index}>
                                <Day
                                    key={index}
                                    day={d}
                                    
                                    onClick={() => {
                                        console.log("-----> click !", d);
                                        if(d.value !== 'padding'){
                                            setClicked(d.date);
                                        }

                                    }}
                                />
                            </div>

                        ))}
                    </div>
                
                </div>
            </div>
            
            {
                clicked ? 
                <EventsOfDays
                    days={days}
                    clicked={clicked}
                    onClose={() => clearLocal()}
                /> : ''
            }

        </>

    )
}
export default Calendar;