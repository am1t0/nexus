import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import  '@maptiler/leaflet-maptilersdk';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
// import '@maptiler/leaflet-maptilersdk/dist/maptilersdk.css';
import 'leaflet-draw';

export const MapComponent = ({ markedAreas, onSaveArea, onDeleteArea, projectName, canEdit, mapStyle }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const drawnItems = useRef(L.featureGroup()).current;
    const idToLayerMap = useRef(new Map());

    console.log(markedAreas);

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize the map only once
            mapRef.current = L.map(mapContainer.current,{
                center: [22.728434235399522, 75.86610674863611], // Change coordinates to center your map
                zoom: 16
              });

              const minZoom = 12; // Adjust as needed
             const maxZoom = 19; // Adjust as needed

             mapRef.current.setMinZoom(minZoom);
             mapRef.current.setMaxZoom(maxZoom);


             const maptilerLayer = new L.MaptilerLayer({
                apiKey: 'orJ9CcSmYB6LSaJb9z0d',
            }).addTo(mapRef.current);
            

            maptilerLayer.on('tileerror', function (error) {
                console.error('Maptiler layer failed to load tiles:', error);
            
                // Fallback to OpenStreetMap tiles if Maptiler fails
             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(mapRef.current);
            });

              
              const cityBounds = L.latLngBounds([
                [22.6, 75.7], // Southwest corner (lat, lng)
                [22.9, 76]  // Northeast corner (lat, lng)
            ]);

            // Set max bounds and handle events
            mapRef.current.setMaxBounds(cityBounds);
            
          

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
        markedAreas?.forEach((area) => {
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
            <div id="map" ref={mapContainer} style={mapStyle}></div>
        </div>
    );
};