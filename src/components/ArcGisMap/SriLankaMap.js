import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import "./style.css";
import { get_map } from "../../redux/actions/farmer/action";

const SriLankaMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    let view;
    let isMounted = true;

    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/GeoJSONLayer",
      "esri/request",
    ])
      .then(([Map, MapView, GeoJSONLayer, esriRequest]) => {
        if (isMounted) {
          const map = new Map({
            basemap: "topo",
          });

          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [80.7718, 7.8731],
            zoom: 8,
          });

          // const url = get_map;
          const url ="http://localhost:8080/api/v1/map/get-district-features?object=1-1, 2-1, 3-1, 4-1, 5-1, 6-1";

          const geojsonLayer = new GeoJSONLayer({
            url: url,
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [0, 255, 0,0.6],
                outline: {
                  color: [0, 0, 0,0.6],
                  width: 0.5,
                },
              },
            },
            popupTemplate: {
              title: "{Name}",
              content: "Type: {Type}<br>District: {District}",
            },
          });
          map.add(geojsonLayer);
        }
      })
      .catch((error) => {
        console.error("Error loading ArcGIS modules: ", error);
      });
    return () => {
      isMounted = false;
      if (view) {
        view.container = null;
        view.destroy();
      }
      if (map) {
        map.destroy();
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: 765, width: "100%",boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
  border: "1.5px solid #c0c9c0",borderRadius:"15px",padding:"7px" }}/>
  //   alignContent: "center", margin: "auto"
};

export default SriLankaMap;
