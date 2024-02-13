import { useEffect, useState } from "react";

function DisplayEvents ({element, clicked}){

    const [titre , setTitre] = useState(element.title);
    const [lastnameVisitor, setLastnameVisitor] = useState(element.lastnameVisitor);
    const [firstnameVisitor, setFirstnameVisitor] = useState(element.firstnameVisitor);
    const [phoneVisitor, setPhoneVisitor] = useState(element.phoneVisitor);
    const [adresse, setAdresse] = useState(element.adresse);
    const [phoneOwner, setPhoneOwner] = useState(element.phoneOwner);
    const [startVisit, setStartVisit] = useState(element.startVisit);
    const [endVisit, setEndVisit] = useState(element.endVisit);

    const [date, setDate] = useState(clicked);
   

    const resetEvents = async() => {
        console.log('get events display');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            
            const response = await fetch(`${import.meta.env.VITE_API_URL12}`, options);
            const data = await response.json();
            /* console.log('=> :', data.data); */

            localStorage.setItem('events', JSON.stringify(data.data));
        } catch(error){
            console.log("error");
        }
    }

    const modifEvent = async(element) => {
        
        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "id" : element.id,
                "date" : clicked,
                "startVisit": startVisit != '' ? startVisit : element.startVisit, 
                "endVisit":  endVisit != '' ? endVisit : element.endVisit,
                "adresse":  adresse != '' ? adresse : element.adresse,
                "title" :  titre != '' ? titre : element.title, 
                "lastnameVisitor" :  lastnameVisitor != '' ? lastnameVisitor : element.lastnameVisitor, 
                "firstnameVisitor" : firstnameVisitor  != '' ? firstnameVisitor  : element.firstnameVisitor , 
                "phoneVisitor" :  phoneVisitor != '' ? phoneVisitor : element.phoneVisitor, 
                "phoneOwner" :  phoneOwner != '' ? phoneOwner : element.phoneOwner
            }),
        };

        try{
            
            const response = await fetch(`${import.meta.env.VITE_API_URL13}`,options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            

            if(data){
                alert(data.message);
                
            } else {
                alert("try again");
            }

        } catch (error){
            console.error("Fetch error:" , error);
        }
    }

    const deleteEvent = async(element) => {
        let options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "id" : element.id,
            }),
        };

        try{
            console.log("option", options);
            const response = await fetch(`${import.meta.env.VITE_API_URL14}`,options);
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
            if (data.status == 'true') {
                console.log('display 1');
                resetEvents();
                console.log('display 2');
                /* window.location.reload(false); */

            }

        } catch (error){
            console.error("Fetch error:" , error);
        }
    }

    return (

        <div className="eventsDay" >
            
            <div className="eventData">
                <div className="enventDataInput">
                    <input type="text" name="titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    <label htmlFor="titre">titre</label>
                </div>
                
                <div className="enventDataInput">
                    <input type="text" name="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
                    <label htmlFor="adresse">adresse</label>
                </div>

                <div className="enventDataInput">
                    <input type="text" name="phoneVisitor" value={phoneVisitor} onChange={(e) => setPhoneVisitor(e.target.value)} />
                    <label htmlFor="">telephone visiteur</label>
                </div>

                <div className="enventDataInput">
                    <input type="text" name="phoneOwner" value={phoneOwner} onChange={(e) => setPhoneOwner(e.target.value)} />
                    <label htmlFor="">telephone proprietaire</label>
                </div>

                <div className="enventDataInput">
                    <input type="text" name="startVisit" value={startVisit} onChange={(e) => setStartVisit(e.target.value)} />
                    <label htmlFor="">heure debut </label>
                </div>

                <div className="enventDataInput">
                    <input type="text" name="endVisit" value={endVisit} onChange={(e) => setEndVisit(e.target.value)} />
                    <label htmlFor="">heure fin </label>
                </div>

                <div className="enventDataInput">
                    <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <label htmlFor="">date</label>
                </div>

                <div className="enventDataInput">
                    <input type="text" name="lastnameVisitor" value={lastnameVisitor} onChange={(e) => setLastnameVisitor(e.target.value)} />
                    <label htmlFor="">nom visiteur</label>
                </div>
                
            </div>
            

            <div className="eventBtn">
                <button onClick={() => deleteEvent(element)}>supprimer</button>
                <button onClick={() => modifEvent(element)}>modifier</button>
            </div>
        </div>

    )
}
export default DisplayEvents;