// video : https://www.youtube.com/watch?v=Q5Xen_Y7lUk&t=0s

import { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import "./calendar.css";
import Day from "./Days/Day";
import NewEventModal from "./NewEventModal/NewEventModal";
import DeleteEventModal from "./DeleteEventModal/DeleteEventModal";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import EventsOfDays from "./EventsOfDay/EventsOfdays";

function Calendar(){
    console.log('calendar');
    const [nav, setNav] = useState(0);
    const [days, setDays] = useState([]);
    const [dateDisplay, setDateDisplay] = useState('');
    const [clicked, setClicked] = useState();

    const [events, setEvents] = useState(
        //parse : converti text en objet
        /* localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [] */
    ); 


    const getEvents = async() => {
        console.log('get events');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            
            const response = await fetch(`http://127.0.0.1:8000/api/allEvents`, options);
            const data = await response.json();
            /* console.log('=> :', data.data); */
            setEvents(data.data);


            localStorage.setItem('events', JSON.stringify(data.data));
        } catch(error){
            console.log("error");
        }
    }

    const eventForDate = date => events?.find(obj => {
        return obj.date == date;
    })

    useEffect(() => {
        getEvents();
    }, [])

    useEffect(() => {
        
        
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
        
        for(let i = 1; i <= paddingDays + daysInMonth; i++){
            /* const dayString = `${i - paddingDays}/${month + 1}/${year}`; */
            const dayString = month + 1 >= 10 ? `${year}-${month + 1}-${i - paddingDays}` : `${year}-0${month + 1}-${i - paddingDays}`
            ;
            /* console.log("=>  : " ,dayString); */
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

                    <div className="weekdays">
                        <div>Lundi</div>
                        <div>Mardi</div>
                        <div>Mercredi</div>
                        <div>Jeudi</div>
                        <div>Vendredi</div>
                        <div>Samedi</div>
                        <div>Dimanche</div>
                    </div>

                    <div id="calendar" className="calendar">
                        
                        {days.map((d, index) => (
                            <div className={`dayContainer ${d.value}`} key={index}>
                                <Day
                                    key={index}
                                    day={d}
                                   /*  onClose={() => setClicked(null)} */
                                    onClick={() => {
                                        console.log("click !", d.value, d.date);
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
                    clicked={clicked}
                    onClose={() => setClicked(null)}
                /> : ''
            }

        </>

    )
}
export default Calendar;