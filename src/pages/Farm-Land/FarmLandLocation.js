import React, { useRef, useState, useEffect } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styled from "styled-components";
import { Grid } from "@mui/material";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Map from "react-map-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWdyaXRlc3QiLCJhIjoiY2xsZ2F6bDJtMDB6cTNnbWs5cDQwOHNnMCJ9.kbacxY47ddUCRZFD9C3WHA";

export default function FarmLandLocation() {
  const mapContainer = useRef(null);
  const drawRef = useRef(null);
  const [lng, setLng] = useState(80.7003);
  const [lat, setLat] = useState(7.8774);
  const [zoom, setZoom] = useState(9);

  let map;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("click", (event) => {
      const clickedCoordinates = event.lngLat;
      console.log("Clicked Coordinates:", clickedCoordinates);
    });

    const draw = new MapboxDraw({
      displayControlsDefault: true,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    map.addControl(draw);

    drawRef.current = draw;
    // map.on('load', () => {
    //     // Attach the draw.create event listener
    //     map.on('draw.create', event => {
    //       const createdFeature = event.features[0];
    //       console.log('Newly Created Feature:', createdFeature);
    // });
    // });

    map.on("draw.create", (event) => {
      const createdFeature = event.features[0];
      console.log("Newly Created Feature:", createdFeature);
    });
    // const drawnFeatures = draw.getAll();

    // Log the features to the console
    // console.log("Drawn Features:", drawnFeatures);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item lg={12} sx={{ paddingTop: "20px" }}>
          <MapContainer ref={mapContainer} />
        </Grid>
      </Grid>
    </div>
  );
}

export const MapContainer = styled.div`
  padding: 20px;
  height: 500px;
  width: 700px;
`;
