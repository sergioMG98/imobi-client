// video leaflet = https://www.youtube.com/watch?v=jD6813wGdBA
// map
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import "./DetailsPage.css";


function LeafletMap(props) {


    /* ----- montre l'emplacement exact du lieu ---- */
    const markers = [
        {
            geocode:[props.latitude, props.longitude],
            popUp: "hello, I am here"
        }
    ];

    const customIcon = L.icon({
        iconUrl: 'http://127.0.0.1:8000/storage/map/mZRIQ0q3vWdKbZ0LYfWxajBRTFk35aONJr8IfVaM.png',
        iconSize: [38, 38] // size of the icon
    });


    return (
       
        <MapContainer center={[props.latitude, props.longitude]} zoom={14}>

            <TileLayer 
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

                {markers.map(marker => (
                    <Marker position={marker.geocode} icon={customIcon}/>
                ))}
        </MapContainer>
    


    )
}
export default LeafletMap;