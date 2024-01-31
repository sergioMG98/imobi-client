// video leaflet = https://www.youtube.com/watch?v=jD6813wGdBA
// map
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import CustomerSell from '../CustomerSell/CustomerSell';

import "leaflet/dist/leaflet.css";
import "./carte.css";


function Carte({values}) {
       
    console.log('map page', values);


    /* ----- montre l'emplacement exact du lieu ---- */
    const markers = [
        
    ];

    for(let index = 0; index < values.length; index++) {
        markers.push(
            {
                geocode:[values[index].latitude, values[index].longitude],
                popUp: "hello i'am here",
                lastname: values[index].lastname ,
                firstname: values[index].firstname
            }
        )
    }
    const customIcon = L.icon({
        iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3SPYGZOym3ZgkAwHKEbzieVI93Gcytqnh_g&usqp=CAU',
        iconSize: [38, 38] // size of the icon
    });
    const seeSeller = (marker) => {
        console.log('je rentre');
        document.querySelector('.contactSeller').innerHTML += `
            <div classname=""></div>
            <div>${marker.lastname}</div>
            <div>${marker.firstname}</div>
            <div>telephone</div>
            <div>e-mail</div>
            `; 
    }

    console.log('-->', markers);
    return (
       
        <MapContainer center={[values[0].latitude, values[0].longitude]} zoom={14}>

            <TileLayer 
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

                {markers?.map(marker => (
                    <Marker position={marker.geocode} icon={customIcon} >
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