import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "@maptiler/leaflet-maptilersdk";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import Filter from "../filter/Filter";
import "./map.css";

export const MapComponent = ({
  markedAreas,
  onSaveArea,
  onDeleteArea,
  projectName,
  canEdit,
  mapStyle,
  filterShown = true, // Default to true if not provided
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const drawnItems = useRef(L.featureGroup()).current;
  const idToLayerMap = useRef(new Map());

  // Function to get polygon style based on tag
  const getPolygonStyle = (tag) => {
    console.log(tag);
    switch (tag) {
      case "main":
        return {
          color: "#2d6cdf", // border
          weight: 2,
          fillColor: "#2d6cdf",
          fillOpacity: 0.3,
        };
      case "overlapping-region":
        return {
          color: "red",
          weight: 2,
          dashArray: "5, 5", // dashed border
          fillColor: "#ffcccc", // light red fill
          fillOpacity: 0.3,
        };
      case "other":
      default:
        return {
          color: "#555",
          weight: 2,
          fillColor: "#ddd",
          fillOpacity: 0.2,
        };
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only once
      mapRef.current = L.map(mapContainer.current, {
        center: [22.728434235399522, 75.86610674863611],
        zoom: 16,
      });

      const minZoom = 12;
      const maxZoom = 19;

      mapRef.current.setMinZoom(minZoom);
      mapRef.current.setMaxZoom(maxZoom);

      const maptilerLayer = new L.MaptilerLayer({
        apiKey: "orJ9CcSmYB6LSaJb9z0d",
      }).addTo(mapRef.current);

      maptilerLayer.on("tileerror", function (error) {
        console.error("Maptiler layer failed to load tiles:", error);

        // Fallback to OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      });

      const cityBounds = L.latLngBounds([
        [22.6, 75.7],
        [22.9, 76],
      ]);

      mapRef.current.setMaxBounds(cityBounds);
      mapRef.current.addLayer(drawnItems);

      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
          remove: true,
        },
      });
      if (canEdit) mapRef.current.addControl(drawControl);

      // Handle new polygon creation
      mapRef.current.on(L.Draw.Event.CREATED, async (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);

        if (layer instanceof L.Polygon) {
          const coordinates = layer.getLatLngs()[0].map((latlng) => ({
            lat: latlng.lat,
            lng: latlng.lng,
          }));

          const userDescription = projectName;
          onSaveArea(coordinates, userDescription);

          layer.bindPopup(`<p>${userDescription}</p>`).openPopup();
        }
      });

      // Handle polygon deletion
      mapRef.current.on(L.Draw.Event.DELETED, async (e) => {
        e.layers.eachLayer((layer) => {
          const id = Array.from(idToLayerMap.current.entries()).find(
            ([_, l]) => l === layer
          )?.[0];
          if (id) {
            onDeleteArea(id);
            idToLayerMap.current.delete(id);
          }
        });
      });
    }

    // Remove old polygons before adding new ones
    drawnItems.clearLayers();
    idToLayerMap.current.clear();

    // Load existing marked areas with styles
    markedAreas?.forEach((area) => {
      if (Array.isArray(area.coordinates)) {
        const latLngs = area.coordinates.map((c) => [c.lat, c.lng]);
        const polygon = L.polygon(latLngs, getPolygonStyle(area.tag)).bindPopup(
          `<p>${area.description}</p>`
        );

        drawnItems.addLayer(polygon);
        idToLayerMap.current.set(area.id, polygon);
      } else {
        console.warn("Invalid coordinates:", area.coordinates);
      }
    });

    if (markedAreas && markedAreas.length > 0) {
      const allCoords = markedAreas.flatMap((area) =>
        area.coordinates.map((c) => [c.lat, c.lng])
      );
      const bounds = L.latLngBounds(allCoords);
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off(L.Draw.Event.CREATED);
        mapRef.current.off(L.Draw.Event.DELETED);
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [canEdit, drawnItems, markedAreas, onDeleteArea, onSaveArea, projectName]);

  return (
    <div className="map-container">
      {filterShown && <Filter />}
      <div id="map" ref={mapContainer} style={mapStyle}></div>
    </div>
  );
};
