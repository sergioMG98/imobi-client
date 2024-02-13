// video leaflet = https://www.youtube.com/watch?v=jD6813wGdBA
// map
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import CustomerSell from '../CustomerSell/CustomerSell';

import "leaflet/dist/leaflet.css";
import "./carte.css";
import { useEffect } from 'react';


function Carte({values ,setSeller_id, latitude, longitude}) {
       
    console.log('map page', latitude ,longitude);


    /* ----- montre l'emplacement exact du lieu ---- */
    const markers = [
        
    ];

    for(let index = 0; index < values.length; index++) {
        if (values[index].latitude != null && values[index].longitude != null) {
            markers.push(
                {
                    geocode:[values[index].latitude, values[index].longitude],
                    popUp: `hello i'am here ${index} `,
                    lastname: values[index].lastname ,
                    firstname: values[index].firstname,
                    seller_id: values[index].seller_id,
                    phone: values.phone
                },
            )
        }

    }
    const customIcon = L.icon({
        iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3SPYGZOym3ZgkAwHKEbzieVI93Gcytqnh_g&usqp=CAU',
        iconSize: [38, 38] // size of the icon
    });
    const seeSeller = (marker) => {
        
        let parentDiv = document.querySelector('.infoSeller');
        let childDiv = document.createElement("div").innerHTML += `
            
                ${marker.lastname} ${marker.firstname}
                ${marker.phone != undefined ? marker.phone : ''}
        
        `;

        parentDiv.innerHTML = '';
        parentDiv.prepend(childDiv);

        setSeller_id(marker.seller_id);
    }
    
/*     useEffect(()=> {
        let mapcontainer = document.querySelector("#mapContainer");
        mapcontainer.location.reload(false);
    }, []); */


    return (
       
        <MapContainer key={JSON.stringify( latitude, longitude)} center={[latitude,  longitude]} zoom={14}>
                {console.log('changement --> ', latitude)}
            <TileLayer 
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

                {markers?.map((marker , index) => (
                    
                    <Marker position={marker.geocode} icon={customIcon} key={index}>
                    
                        <Popup >
                            {marker.lastname}  {marker.firstname}
                            <button onClick={() => seeSeller(marker)}>voir</button>
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    )
}
export default Carte;