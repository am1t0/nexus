import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import '@maptiler/leaflet-maptilersdk';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

export const MapComponent = ({ markedAreas, onSaveArea, onDeleteArea, projectName, canEdit, mapStyle }) => {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    const drawnItems = useRef(L.featureGroup()).current;
    const idToLayerMap = useRef(new Map());

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map(mapContainer.current, {
                center: [22.728434235399522, 75.86610674863611],
                zoom: 16,
                scrollWheelZoom: false,
            });

            const minZoom = 12;
            const maxZoom = 19;

            mapRef.current.setMinZoom(minZoom);
            mapRef.current.setMaxZoom(maxZoom);

            new L.MaptilerLayer({
                apiKey: 'orJ9CcSmYB6LSaJb9z0d',
            }).addTo(mapRef.current);

            const cityBounds = L.latLngBounds([
                [22.6, 75.7],
                [22.9, 76]
            ]);

            mapRef.current.setMaxBounds(cityBounds);

            mapRef.current.addLayer(drawnItems);

            const drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems,
                    remove: true
                }
            });
            if (canEdit) mapRef.current.addControl(drawControl);

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

            mapRef.current.on(L.Draw.Event.DELETED, async (e) => {
                e.layers.eachLayer((layer) => {
                    const id = Array.from(idToLayerMap.current.entries())
                        .find(([_, l]) => l === layer)?.[0];

                    if (id) {
                        onDeleteArea(id);
                        idToLayerMap.current.delete(id);
                    }
                });
            });
        }

        markedAreas?.forEach((area) => {
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
            if (mapRef.current) {
                mapRef.current.off(L.Draw.Event.CREATED);
                mapRef.current.off(L.Draw.Event.DELETED);
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [markedAreas]);

    return (
        <div id="map" ref={mapContainer} style={{ ...mapStyle, height: '100%', width: '100%' }}></div>
    );
};
