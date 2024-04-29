import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import * as d3 from "d3";
import { handleMapData } from "../../redux/actions/map/action";

const SriLankaMap = ({ url, type, distribution }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    let codeTypeValue = "";
    let functionName = null;
    if (type === "gn") {
      codeTypeValue = "GNDCODE7";
    } else if (type === "ds") {
      codeTypeValue = "ADM3_PCODE";
      functionName = "convertDsCode";
    } else if (type === "district") {
      codeTypeValue = "ADM2_PCODE";
      functionName = "convertDistrictCode";
    }
    localStorage.setItem("code", codeTypeValue);
    localStorage.setItem("functionName", functionName);
  }, [type]);

  let code = localStorage.getItem("code");

  useEffect(() => {
    let map;
    let view;
    let isMounted = true;
    let json = [];
    loadModules(["esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer"])
      .then(([Map, MapView, GeoJSONLayer]) => {
        if (isMounted) {
          map = new Map({
            basemap: "topo",
          });

          view = new MapView({
            container: mapRef.current,
            map: map,
            center: [80.7718, 7.8731],
            zoom: 8,
          });

          const geojsonLayer = new GeoJSONLayer({
            url: url,
            renderer: {
              type: "unique-value",
              field: code,
              uniqueValueInfos: [],
              defaultSymbol: {
                type: "simple-fill",
                color: [255, 0, 0, 0.5],
                outline: {
                  color: [100, 100, 100],
                  width: 0.5,
                },
              },
            },
            popupTemplate: {
              title: code,
              content: "District Code: " + code,
            },
          });

          const colorScale = d3
            .scaleSequential()
            .interpolator(d3.interpolateGreens)
            .domain([0, d3.max(Object.values(distribution))]);

          const getColor = (id) => {
            const density = distribution[id];
            return density ? colorScale(density) : "white";
          };
          code = localStorage.getItem("code");
          const convertCode = (type, code) => {
            //x-x-xx-xxx
            if (type === "gn" && code.length >= 7) {
              let strNumber = code.toString();
              let regexPattern = /^(\d)(\d)(\d{2})(\d{3})$/;
              let formattedNumber = strNumber.replace(
                regexPattern,
                "$1-$2-$3-$4"
              );
              return formattedNumber;
            }
            //x-x-xx
            if (type === "ds" && code.length >= 6) {
              let removeLk = code.slice(2);
              let regexPattern = /^(\d)(\d)(\d{2})$/;
              let formattedNumber = removeLk.replace(regexPattern, "$1-$2-$3");
              return formattedNumber;
            }
            //x-x
            if (type === "district" && code.length >= 4) {
              let removeLk = code.slice(2);
              let n1 = removeLk.charAt(0);
              let n2 = removeLk.charAt(1);
              const result = `${n1}-${n2}`;
              return result;
            } else {
              return code;
            }
          };

          //pass from backend
          const mapUrl = `map/get-district-features?object=1-1,1-2,4-3,6-2,6-1,8-1,9-1`;

          const fetchData = async () => {
            try {
              const response = await handleMapData(mapUrl);
              for (let i = 0; i < response.features.length; i++) {
                console.log(response.features[i]);
                json.push({
                  value: response.features[i].properties[code],
                  symbol: {
                    type: "simple-fill",
                    color: getColor(
                      convertCode(type, response.features[i].properties[code])
                    ),
                    outline: {
                      color: [100, 100, 100],
                      width: 0.5,
                    },
                  },
                });
              }
              console.log("sss", json);
              geojsonLayer.renderer.uniqueValueInfos = json;
            } catch (error) {
              console.error("Error fetching data: ", error);
            }
          };

          fetchData();

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

  return (
    <div
      ref={mapRef}
      style={{
        height: 765,
        width: "100%",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        border: "1.5px solid #c0c9c0",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default SriLankaMap;
