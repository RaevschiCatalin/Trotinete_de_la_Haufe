
import React, { useState, useEffect } from 'react';
import scooterData from '@/data/scooters.json';

const userLocation = {
    lat: 52.520008,
    lng: 13.404954,
};

const ScooterList = () => {
    const [filteredScooters, setFilteredScooters] = useState([]);

    useEffect(() => {
        const updatedScooters = scooterData.scooters.map((scooter) => {
            const distance = calculateDistance(userLocation, {
                lat: scooter.lat,
                lng: scooter.lng,
            });
            return { ...scooter, distance };
        });

        const filtered = updatedScooters.filter(
            (scooter) => scooter.status === 'available' && scooter.distance <= 5 // Adjust the distance threshold as needed.
        );
        filtered.sort((a, b) => a.distance - b.distance);
        setFilteredScooters(filtered);
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

    function reserveScooter(scooterId) {
        // Create a copy of the filteredScooters data and update the status to 'reserved'
        const updatedScooters = filteredScooters.map((scooter) => {
            if (scooter.id === scooterId) {
                return { ...scooter, status: 'reserved' };
            }
            return scooter;
        });

        // Update the state with the modified data
        setFilteredScooters(updatedScooters);
    }

    function activateScooter(scooterId) {
        // Create a copy of the filteredScooters data and update the status to 'taken'
        const updatedScooters = filteredScooters.map((scooter) => {
            if (scooter.id === scooterId) {
                return { ...scooter, status: 'taken' };
            }
            return scooter;
        });

        // Update the state with the modified data
        setFilteredScooters(updatedScooters);
    }

    return (
        <div>
            {filteredScooters.length > 0 ? (
                filteredScooters.map((scooter) => (
                    <div key={scooter.id}>
                        <h3>{scooter.name}</h3>
                        <p>Price: {scooter.price} {scooter.currency}</p>
                        <p>Distance: {scooter.distance.toFixed(2)} km</p>
                        <p>Status: {scooter.status}</p>
                        {scooter.status === 'available' && (
                            <div className="flex gap-3">
                                <button className="black_btn" onClick={() => reserveScooter(scooter.id)}>Reserve</button>
                                <button className="outline_btn" onClick={() => activateScooter(scooter.id)}>Activate</button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No available scooters within the specified distance.</p>
            )}
        </div>
    );
};

export default ScooterList;
