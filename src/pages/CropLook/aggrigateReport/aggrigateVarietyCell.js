import { useEffect, useState } from "react";
import { convertCropLookFields, getDbFieldName } from "../../../utils/appUtils";
import { TableCell, TableRow } from "@mui/material";

const AggrigateVarietyCell = ({
  cropData = [],
  cropName = "",
  targetConfigs = {},
  reportConfigs = {},
}) => {
  const [irrigationModeMap, setirrIgationModeMap] = useState(new Map());
  const [irrigationModeTargetMap, setirrIgationModeTargetMap] = useState(
    new Map()
  );

  useEffect(() => {
    setirrIgationModeMap(new Map());
    setirrIgationModeTargetMap(new Map());

    for (let data of cropData) {
      for (let field of reportConfigs) {
        const dbField = convertCropLookFields(field);
        updateIrrigationModeMap(field, data[dbField]);
      }
      for (let field1 of targetConfigs) {
        const dbField = convertCropLookFields(field1);
        updateIrrigationModeTargetMap(field1, data[dbField]);
      }
      updateIrrigationModeMap("grandTotalBiWeek", data?.grandTotalBiWeek);
      updateIrrigationModeTargetMap(
        "grandTotalTargeted",
        data?.grandTotalTargeted
      );
    }
  }, []);

  const updateIrrigationModeMap = (key, value) => {
    setirrIgationModeMap((prevMap) => {
      const newMap = new Map(prevMap);

      if (newMap.has(key)) {
        newMap.set(key, newMap.get(key) + value);
      } else {
        newMap.set(key, value);
      }

      return newMap;
    });
  };

  const updateIrrigationModeTargetMap = (key, value) => {
    setirrIgationModeTargetMap((prevMap) => {
      const newMap = new Map(prevMap);

      if (newMap.has(key)) {
        newMap.set(key, newMap.get(key) + value);
      } else {
        newMap.set(key, value);
      }

      return newMap;
    });
  };

  const getRoundValue = (value) => {
    return value?.toFixed(3);
  };

  return (
    <>
      {cropData?.map((row, index) => (
        <TableRow key={index}>
          <TableCell style={{ backgroundColor: "#A8CD9F" }}>
            {cropName}
          </TableCell>
          <TableCell style={{ backgroundColor: "#A8CD9F" }}>
            {row.varietyName}
          </TableCell>
          {targetConfigs.length > 0 &&
            targetConfigs.map((fieldName, innerIndex) => (
              <TableCell key={innerIndex} align="right">
                {getRoundValue(row[convertCropLookFields(fieldName)])}
              </TableCell>
            ))}
          <TableCell style={{ backgroundColor: "#F5DAD2" }} align="right">
            {getRoundValue(row.grandTotalTargeted)}
          </TableCell>
          {reportConfigs.length > 0 &&
            reportConfigs.map((fieldName1, innerIndex1) => (
              <TableCell key={innerIndex1} align="right">
                {getRoundValue(row[convertCropLookFields(fieldName1)])}
              </TableCell>
            ))}

          <TableCell style={{ backgroundColor: "#F5DAD2" }} align="right">
            {getRoundValue(row.grandTotalBiWeek)}
          </TableCell>
        </TableRow>
      ))}

      <TableRow>
        <TableCell style={{ backgroundColor: "#FCFFE0" }}></TableCell>
        <TableCell style={{ backgroundColor: "#FCFFE0" }}>Total</TableCell>
        {targetConfigs.length > 0 &&
          targetConfigs.map((fieldName, innerIndex) => (
            <TableCell key={innerIndex} style={{ backgroundColor: "#FCFFE0" }} align="right">
              {getRoundValue(irrigationModeTargetMap.get(fieldName))}
            </TableCell>
          ))}
        <TableCell style={{ backgroundColor: "#F5DAD2" }} align="right">
          {getRoundValue(irrigationModeTargetMap.get("grandTotalTargeted"))}
        </TableCell>
        {reportConfigs.length > 0 &&
          reportConfigs.map((fieldName1, innerIndex1) => (
            <TableCell key={innerIndex1} style={{ backgroundColor: "#FCFFE0" }} align="right">
              {getRoundValue(irrigationModeMap.get(fieldName1))}
            </TableCell>
          ))}

        <TableCell style={{ backgroundColor: "#F5DAD2" }} align="right">
          {getRoundValue(irrigationModeMap.get("grandTotalBiWeek"))}
        </TableCell>
      </TableRow>
    </>
  );
};

export default AggrigateVarietyCell;
