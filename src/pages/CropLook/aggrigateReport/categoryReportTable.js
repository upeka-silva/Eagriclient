import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAggrigateReportData } from "../../../redux/actions/cropLook/aggrigateReport/actions";

const CategoryReportTabel = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData(categoryId) {
      const dataList = await getAggrigateReportData(categoryId);
      console.log('aggrigate data list');
      console.log(dataList);
      setData(dataList);
    }

    fetchData(category.categoryId);
  }, []);

  return (
    <>
    <h5>{category.description}</h5>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Variety</TableCell>
            <TableCell>Target Major (ha)</TableCell>
            <TableCell>Target Minor (ha)</TableCell>
            <TableCell>Target Rainfed (ha)</TableCell>
            <TableCell>Target Irrigate (ha)</TableCell>
            <TableCell>Target (ha)</TableCell>
            <TableCell>Total Target (ha)</TableCell>
            <TableCell>Progress Major (ha)</TableCell>
            <TableCell>Progress Minor (ha)</TableCell>
            <TableCell>Progress Rainfed (ha)</TableCell>
            <TableCell>Progress Irrigate (ha)</TableCell>
            <TableCell>Progress Extent (ha)</TableCell>
            <TableCell>Total Progress (ha)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.varietyName}</TableCell>
              <TableCell>{row.totalTargetedExtentMajor}</TableCell>
              <TableCell>{row.totalTargetedExtentMinor}</TableCell>
              <TableCell>{row.totalTargetedExtentRainfed}</TableCell>
              <TableCell>{row.targetedExtentIrrigate}</TableCell>
              <TableCell>{row.totalTargetedExtent}</TableCell>
              <TableCell>{row.allTargetedExtent}</TableCell>
              <TableCell>{row.totalExtentMajor}</TableCell>
              <TableCell>{row.totalExtentMinor}</TableCell>
              <TableCell>{row.totalExtentRainfed}</TableCell>
              <TableCell>{row.totalExtentIrrigate}</TableCell>
              <TableCell>{row.totalExtent}</TableCell>
              <TableCell>{row.allExtent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default CategoryReportTabel;
