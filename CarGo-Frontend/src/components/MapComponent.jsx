import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({ locationName, lat, lng }) {

    const position = [lat || 6.9271, lng || 79.8612]; 

    return (
        <div style={{ height: '250px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
            <MapContainer 
                center={position} 
                zoom={13} 
                scrollWheelZoom={false} 
                style={{ height: '100%' }}
                key={`${lat}-${lng}`}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Pickup Location: <br /> {locationName}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default MapComponent;