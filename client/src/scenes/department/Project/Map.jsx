import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

export const MapComponent = ({ markedAreas, onSaveArea, onDeleteArea, projectName, canEdit, height }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const drawnItems = useRef(L.featureGroup()).current;
    const idToLayerMap = useRef(new Map());

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize the map only once
            mapRef.current = L.map(mapContainer.current).setView([22.728434235399522, 75.86610674863611], 16);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            mapRef.current.addLayer(drawnItems);

            const drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems,
                    remove: true
                }
            });
            {canEdit && mapRef.current.addControl(drawControl);}

            // Handle new polygon creation
            mapRef.current.on(L.Draw.Event.CREATED, async (e) => {
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
            mapRef.current.on(L.Draw.Event.DELETED, async (e) => {
                e.layers.eachLayer((layer) => {
                    const id = Array.from(idToLayerMap.current.entries())
                        .find(([_, l]) => l === layer)?.[0]; // Find the ID of the layer

                    if (id) {
                        onDeleteArea(id);
                        idToLayerMap.current.delete(id); // Remove the layer from the map
                    }
                });
            });
        }

        // Load existing marked areas
        markedAreas.forEach((area) => {
            // Ensure that the coordinates are an array
            if (Array.isArray(area.coordinates)) {
                const latLngs = area.coordinates.map(c => [c.lat, c.lng]);
                const polygon = L.polygon(latLngs).bindPopup(`<p>${area.description}</p>`);
                drawnItems.addLayer(polygon);
                idToLayerMap.current.set(area.id, polygon);
            } else {
                console.warn('Invalid coordinates:', area.coordinates);
            }
        });

        return () => {
            // Cleanup when the component unmounts
            if (mapRef.current) {
                mapRef.current.off(L.Draw.Event.CREATED);
                mapRef.current.off(L.Draw.Event.DELETED);
                mapRef.current.remove(); // This ensures the map is properly destroyed
                mapRef.current = null;
            }
        };
    }, [markedAreas]); // Re-run this effect only when markedAreas change

    return (
        <div>
            <div id="map" ref={mapContainer} style={{ height: height ? `${height}px` : '500px' }}></div>
        </div>
    );
};