import React, { useEffect, useState } from "react";

import {
  getNationalData,
  getProgressTrackerNode,
} from "../../../redux/actions/cropLook/aggrigateReport/actions";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { defaultMessages } from "../../../utils/constants/apiMessages";
import { useSnackBars } from "../../../context/SnackBarContext";
import Tree from "react-d3-tree";
import { CircularProgress } from "@mui/material";

const TreeComponent = ({ category, season, week }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { addSnackBar } = useSnackBars();

  useEffect(() => {
    async function fetchData(categoryId, seasonId, weekId) {
      setLoading(true);
      const dataList = await getProgressTrackerNode(
        categoryId,
        seasonId,
        weekId
      );

      console.log(dataList);

      setData(dataList);
      setLoading(false);
    }

    fetchData(category?.id, season?.id, week?.id);
  }, [week]);

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Approved`,
    });
  };

  const onError = (message) => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: message || defaultMessages.apiErrorUnknown,
    });
  };

  const data1 = {
    name: "Parent",
    id: null,
    children: [
      {
        id: 1,
        name: "Child One",

        children: [
          {
            id: 2,
            name: "Grandchild One",
            children: [],
          },
        ],
      },
      {
        id: 3,
        name: "Child Two",
        children: [],
      },
    ],
  };

  const data2 = {
    id: null,
    name: "National",
    children: [
      {
        id: 1,
        name: "Western",
        children: [
          {
            id: 1,
            name: "Colombo (P)",
            children: [
              {
                id: 1,
                name: "Udahamulla",
                children: [
                  {
                    id: 1,
                    name: "Udahamulla - DS Colombo",
                    children: [],
                  },
                  {
                    id: 11,
                    name: "Udahamulla - DS SJK",
                    children: [],
                  },
                  {
                    id: 12,
                    name: "Udahamulla - DS Thimbirigasyaya",
                    children: [],
                  },
                ],
              },
              {
                id: 2,
                name: "Colombo ",
                children: [
                  {
                    id: 2,
                    name: "Kolonnawa",
                    children: [],
                  },
                  {
                    id: 3,
                    name: "Malambe",
                    children: [],
                  },
                  {
                    id: 4,
                    name: "Kahathuduwa",
                    children: [],
                  },
                  {
                    id: 7,
                    name: "Kosgama",
                    children: [],
                  },
                  {
                    id: 10,
                    name: "Maharagama",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const renderCustomNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle
        r="15"
        fill={nodeDatum.color}
        onClick={toggleNode}
      ></circle>
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
      <text fill="gray" x="20" y="20">
        {nodeDatum.info}
      </text>
    </g>
  );

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        {!loading ? (
          <Tree
            data={data}
            translate={{ x: 50, y: 50 }}
            renderCustomNodeElement={renderCustomNode}
            orientation="vertical"
            nodeSize={{ x: 150, y: 200 }}
            //orientation="horizontal"
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default TreeComponent;
