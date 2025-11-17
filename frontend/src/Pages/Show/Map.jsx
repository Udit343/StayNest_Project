import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ coordinates, location, country }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = "pk.eyJ1IjoiYWJoaXNoZWsyNDMiLCJhIjoiY204YnYwMGRhMjFwdzJtcjcwbHlhNTcwYyJ9.GPAtioo6jH-WhaNbNgrstg";
    mapboxgl.accessToken = accessToken;

    if (!location) return;


    const geocodeLocation = async () => {
      try {
        const searchQuery = country ? `${location}, ${country}` : location;
        
        const [lng, lat] = coordinates;
        
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;

          if (!map.current) {
            map.current = new mapboxgl.Map({
              container: mapContainer.current,
              style: "mapbox://styles/mapbox/streets-v11",
              center: [lng, lat],
              zoom: 10,
            });

            new mapboxgl.Marker({ color: "red" })
              .setLngLat([lng, lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(`<h6>${location}, ${country}</h6>`)
              )
              .addTo(map.current);
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setLoading(false);
      }
    };

    geocodeLocation();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [location, country]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "2rem 0",
      }}
    >
      <div
        ref={mapContainer}
        style={{
          width: "90%",
          maxWidth: "800px",
          height: "400px",
          border: "1px solid black",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
}

export default Map;

