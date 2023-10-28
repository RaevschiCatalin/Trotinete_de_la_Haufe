

//@ts-nocheck
import React, { useState, useEffect } from 'react';
import scooterData from '../data/scooters.json';

const userLocation = {
    lat: 52.520008,
    lng: 13.404954,
};

const ScooterList = () => {
    const [scooters, setScooters] = useState([]);
    const [selectedScooter, setSelectedScooter] = useState(null);

    useEffect(() => {

        const availableScooters = scooterData.scooters.filter(
            (scooter) =>
                scooter.status === 'available' && calculateDistance(userLocation, scooter) <= 1
        );
        setScooters(availableScooters);
    }, []);

    function calculateDistance(location1, location2) {
        const R = 6371;
        const lat1 = location1.lat;
        const lon1 = location1.lng;
        const lat2 = location2.lat;
        const lon2 = location2.lng;

        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    }

    function reserveOrActivateScooter(scooterId) {
        const selected = scooters.find((scooter) => scooter.id === scooterId);
        if (selected.distance <= 0.01) {
            selected.status = 'taken';
        } else {
            selected.status = 'reserved';
        }

        const updatedScooterData = scooterData.scooters.map((scooter) => {
            if (scooter.id === scooterId) {
                scooter.status = selected.status;
            }
            return scooter;
        });


        scooterData.scooters = updatedScooterData;

        setSelectedScooter(selected);
    }

    function returnScooter() {
        if (selectedScooter) {
            const scooterId = selectedScooter.id;

            const updatedScooterData = scooterData.scooters.map((scooter) => {
                if (scooter.id === scooterId) {
                    scooter.status = 'available';
                }
                return scooter;
            });


            scooterData.scooters = updatedScooterData;
        }

        setSelectedScooter(null);
    }


    return (
        <div>
            {selectedScooter ? (
                <div>
                    <h3>{selectedScooter.name}</h3>
                    <p>Price: {selectedScooter.price} {selectedScooter.currency}</p>
                    <p>Distance: {selectedScooter && selectedScooter.distance ? selectedScooter.distance.toFixed(2) + " km" : "Distance not available"}</p>

                    <p>Status: {selectedScooter.status}</p>
                    {selectedScooter.status === 'reserved' ? (
                        <button className="black_btn" onClick={returnScooter}>Return Scooter</button>
                    ) : null}
                </div>
            ) : (
                <div>
                    {scooters.length > 0 ? (
                        scooters.map((scooter) => (
                            <div key={scooter.id}>
                                <h3>{scooter.name}</h3>
                                <p>Price: {scooter.price} {scooter.currency}</p>
                                <p>Distance: {scooter.distance ? scooter.distance.toFixed(2) + " km" : "Distance not available"}</p>

                                <p>Status: {scooter.status}</p>
                                <button className="black_btn" onClick={() => reserveOrActivateScooter(scooter.id)}>
                                    {scooter.status === 'reserved' ? 'Activate Scooter' : 'Reserve Scooter'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No available scooters within the specified distance.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ScooterList;
