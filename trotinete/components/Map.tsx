
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//@ts-ignore
const Map = ({ location }) => {
    return (
        <MapContainer center={location} scrollWheelZoom={false} zoom={13} style={{ height: '75%', width: '75%' } }>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={location}>
                <Popup>You are here</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
