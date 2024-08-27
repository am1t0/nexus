import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

export const MapComponent = ({markedAreas, onSaveArea, onDeleteArea, projectName }) => {
    const mapContainer = useRef(null);
    const drawnItems = useRef(L.featureGroup()).current;
    const idToLayerMap = useRef(new Map());

    useEffect(() => {
        console.log("marked ares", markedAreas)
        const map = L.map(mapContainer.current).setView([22.7196, 75.8577], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        map.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        });
        map.addControl(drawControl);

        // Load existing marked areas
        markedAreas.forEach((area) => {
            console.log(area);
            const latLngs = area.coordinates.map(c => [c.lat, c.lng]);
            const polygon = L.polygon(latLngs).bindPopup(`<p>${area.description}</p>`);
            drawnItems.addLayer(polygon);
            idToLayerMap.current.set(area.id, polygon);
        });

        
        // Handle new polygon creation
        map.on(L.Draw.Event.CREATED, async (e) => {
            const layer = e.layer;
            drawnItems.addLayer(layer);

            if (layer instanceof L.Polygon) {
                const coordinates = layer.getLatLngs()[0].map(latlng => ({
                    lat: latlng.lat,
                    lng: latlng.lng
                }));

                const userDescription = projectName;
                onSaveArea(coordinates, userDescription);

                layer.bindPopup(`<p>${userDescription}</p>`).openPopup();
            }
        });

        // Handle polygon deletion
        map.on(L.Draw.Event.DELETED, async (e) => {
            e.layers.eachLayer((layer) => {
                const id = Array.from(idToLayerMap.current.entries())
                    .find(([_, l]) => l === layer)?.[0]; // Find the ID of the layer

                if (id) {
                    onDeleteArea(id);
                    idToLayerMap.current.delete(id); // Remove the layer from the map
                }
            });
        });

        return () => {
            map.off(L.Draw.Event.CREATED);
            map.off(L.Draw.Event.DELETED);
            map.remove();
        };
    }, []); // Add markedAreas as a dependency

    return (
        <div>
            <div id="map" ref={mapContainer} style={{ height: '680px' }}></div>
        </div>
    );
};
