import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

export const MapComponent = ({ projectName, markedAreas, onSaveArea, onDeleteArea }) => {
    const mapContainer = useRef(null);
    const mapInstance = useRef(null);  // To store the Leaflet map instance
    const drawnItems = useRef(L.featureGroup()).current;
    const idToLayerMap = useRef(new Map());

    useEffect(() => {
        if (!mapInstance.current) {  // Only initialize the map if it hasn't been initialized
            mapInstance.current = L.map(mapContainer.current).setView([22.7196, 75.8577], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapInstance.current);

            mapInstance.current.addLayer(drawnItems);

            const drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems,
                    remove: true
                }
            });
            mapInstance.current.addControl(drawControl);
        }

        // Load existing marked areas
        markedAreas.forEach((area) => {
            if (Array.isArray(area.coordinates)) { // Ensure coordinates is an array
                const latLngs = area.coordinates.map(c => [c.lat, c.lng]);
                const polygon = L.polygon(latLngs).bindPopup(`<p>${area.description}</p>`);
                drawnItems.addLayer(polygon);
                idToLayerMap.current.set(area.id, polygon);
            }
        });

        // Handle new polygon creation
        mapInstance.current.on(L.Draw.Event.CREATED, async (e) => {
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
        mapInstance.current.on(L.Draw.Event.DELETED, async (e) => {
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
            if (mapInstance.current) {
                mapInstance.current.off(L.Draw.Event.CREATED);
                mapInstance.current.off(L.Draw.Event.DELETED);
                mapInstance.current.remove();  // Cleanup the map instance
                mapInstance.current = null;  // Reset the map instance
            }
        };
    }, [markedAreas, projectName, onSaveArea, onDeleteArea, drawnItems, idToLayerMap]);

    return (
        <div>
            <div id="map" ref={mapContainer} style={{ height: '680px' }}></div>
        </div>
    );
};
