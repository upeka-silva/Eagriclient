import React, { useEffect, useState } from "react";
import { Autocomplete, Chip, Grid, InputBase, useTheme } from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import { tokens } from "../../utils/theme/app-theme";
import StatBoxWithoutImage from "../../components/DashBoardStatBox/StatBoxWithoutImage";
import { get_CategoryList } from "../../redux/actions/crop/cropCategory/action";
import SriLankaMap from "../../components/ArcGisMap/SriLankaMap";
import ReactApexChart from "react-apexcharts";
import { getCropLookSeasons } from "../../redux/actions/cropLook/biWeekReporting/actions";
import {
  getIrrigationModeProgress,
  getTargetExtent,
  getvarietyProgress,
} from "../../redux/actions/cropLook/irrigationMode/action";

const Dashboard = () => {
  useUserAccessValidation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectCropCategory, setSelectCropCategory] = useState({ id: 1 });
  const [cropCategory, setCropCategory] = useState([]);
  const [allCropLookSeason, setAllCropLookSeason] = useState([]);
  const [allIrrigationModeData, setAllIrrigationModeData] = useState([]);
  const [allVarietyProgressData, setAllVarietyProgressData] = useState({});
  const [allTargetExtent, setAllTargetExtent] = useState([]);
  console.log({ allTargetExtent });

  console.log({ allVarietyProgressData });

  const [irrigationSortData, setIrrigationSortData] = useState({
    varietyNames: [],
    total: [],
  });

  const [varietyProgressSortData, setvarietyProgressData] = useState({
    keys: [],
    value: [],
  });

  const [targetExtentConfigData, setTargetExtentConfigData] = useState({
    district: [],
    totalExtent: [],
    totalTarget: [],
  });

  console.log("bb", allCropLookSeason[0]?.id);

  console.log({ allIrrigationModeData });
  const [selectCropLookSeason, setCropLookSeason] = useState();
  console.log({ selectCropLookSeason });

  useEffect(() => {
    if (allCropLookSeason.length > 0) {
      setCropLookSeason(allCropLookSeason[0]);
    }
  }, [allCropLookSeason]);

  const cropCategoryChipHandleClick = async (chipLabel) => {
    setSelectCropCategory(chipLabel);
    console.info("You clicked the Chip: ", chipLabel);
  };

  useEffect(() => {
    const fetchCropCategoryData = async () => {
      const { dataList } = await get_CategoryList();
      setCropCategory(dataList);
    };
    const fetchCropLookSeasons = async () => {
      await getCropLookSeasons().then((res) => {
        setAllCropLookSeason(res?.dataList);
        console.log("crpdata", res?.dataList);
      });
    };

    fetchCropCategoryData();
    fetchCropLookSeasons();
  }, []);

  useEffect(() => {
    console.log("beforenewg");
    if (selectCropLookSeason?.id && selectCropCategory?.id) {
      console.log("newg");
      getIrrigationModeProgress(
        selectCropLookSeason?.id,
        selectCropCategory?.id
      ).then((res) => {
        setAllIrrigationModeData(res?.dataList);
      });

      getvarietyProgress(selectCropLookSeason?.id, selectCropCategory?.id).then(
        (res) => {
          console.log({ res });
          //setAllIrrigationModeData(res?.dataList);
          setAllVarietyProgressData(res?.dataList);
        }
      );

      getTargetExtent(selectCropLookSeason?.id, selectCropCategory?.id).then(
        (res) => {
          setAllTargetExtent(res?.dataList);
        }
      );
    }
  }, [selectCropLookSeason, selectCropCategory, allCropLookSeason]);

  useEffect(() => {
    const sortedData = allIrrigationModeData.sort(
      (a, b) => (b.total || 0) - (a.total || 0)
    );
    const top10 = sortedData.slice(0, 9);

    const otherVarieties = sortedData.slice(9, sortedData?.length);

    const otherTotalSum = otherVarieties.reduce(
      (sum, obj) => sum + (obj.total || 0),
      0
    );

    const otherObj = {
      varietyId: "Others",
      varietyName: "Others",
      total: otherTotalSum,
    };

    top10.push(otherObj);

    const varietyNames = top10.map((item) => item.varietyName);
    const total = top10.map((item) => item?.total);

    setIrrigationSortData({
      varietyNames,
      total,
    });

    console.log({ varietyNames });
    console.log({ total });
  }, [allIrrigationModeData]);

  useEffect(() => {
    const newVar = allVarietyProgressData?.[0];
    let sortedKeysArray = [];
    let sortedValuesArray = [];

    console.log("tt", newVar);

    //   const newVar = allVarietyProgressData[0];

    if (newVar) {
      const dataArray = Object.entries(newVar);
      console.log({ dataArray });

      dataArray?.sort((a, b) => {
        // Compare the second element of each inner array (which contains the value)
        // Use parseFloat to convert string values to numbers for comparison
        return parseFloat(b[1]) - parseFloat(a[1]);
      });

      const top10 = dataArray.slice(0, 9);

      const restValues = dataArray.slice(10);
      const restValuesSum = restValues.reduce(
        (acc, val) => acc + (parseFloat(val[1]) || 0),
        0
      );

      const otherObj = ["other", restValuesSum];

      top10.push(otherObj);

      console.log({ top10 });

      sortedKeysArray = top10.map((entry) => {
        // Extract the substring after "totalExtent" if it exists, otherwise keep the key as it is
        const key = entry[0].startsWith("totalExtent")
          ? entry[0].substring("totalExtent".length)
          : entry[0];
        // Capitalize the first letter of the key
        return key.charAt(0).toUpperCase() + key.slice(1);
      });
      sortedValuesArray = top10.map((entry) =>
        entry[1] === null ? 0 : entry[1]
      );

      console.log({ sortedValuesArray });

      setvarietyProgressData({
        keys: sortedKeysArray,
        value: sortedValuesArray,
      });
    }

    console.log({ sortedKeysArray });
  }, [allVarietyProgressData]);

  useEffect(() => {
    const district = allTargetExtent?.map((item) => item?.districtName);
    const totalExtent = allTargetExtent?.map((item) => item?.totalExtent);
    const totalTarget = allTargetExtent?.map((item) => item?.totalTarget);

    setTargetExtentConfigData({
      district: district,
      totalExtent: totalExtent,
      totalTarget: totalTarget,
    });
  }, [allTargetExtent]);

  const handleCropLookSeasonChange = (event, value) => {
    console.log("dd", value);
    setCropLookSeason(value);
  };

  const series = varietyProgressSortData?.value;
  const seriestwo = irrigationSortData?.total
    ? irrigationSortData?.total
    : null;
  const optionssthree = {
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "15px",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "45%",
          show: false,
          labels: {
            name: {
              show: true,
              fontSize: "10px",
            },
          },
        },
      },
    },
    labels: irrigationSortData?.varietyNames
      ? irrigationSortData?.varietyNames
      : null,
    legend: {
      position: "bottom", // Change this to your desired position: top, bottom, left, right
    },
    responsive: [
      {
        breakpoint: 3900,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1750,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1700,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    // Add other options as needed
  };
  const optionss = {
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "15px",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "45%",
          show: false,
          labels: {
            name: {
              show: true,
              fontSize: "10px",
            },
          },
        },
      },
    },
    labels: varietyProgressSortData?.keys.map((key) =>
      key.length > 5 ? key.substr(0, 5) + ".." : key
    ),
    legend: {
      position: "bottom", // Change this to your desired position: top, bottom, left, right
    },
    responsive: [
      {
        breakpoint: 3900,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1750,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1700,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    // Add other options as needed
  };

  const seriesline = [
    {
      name: "Series 1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
    {
      name: "Series 2",
      data: [25, 35, 30, 45, 44, 55, 65, 86, 110],
    },
  ];

  const lineChartOptions = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    stroke: {
      curve: "smooth", // Set the stroke curve to smooth
    },
  };

  const seriesBar = [
    {
      name: "Total Target",
      data: targetExtentConfigData ? targetExtentConfigData?.totalTarget : "",
    },
    {
      name: "Total Extent",
      data: targetExtentConfigData ? targetExtentConfigData?.totalExtent : "",
    },
  ];

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: targetExtentConfigData
        ? targetExtentConfigData?.district
        : "",
    },
    yaxis: {
      title: {
        text: "",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {},
    },
  };

  //Sri lanka map url, distribution and type

  const url =
    "http://localhost:8080/api/v1/map/get-district-features?object=1-1,1-2,4-3,6-2,6-1,8-1,9-1";

  const distribution = {
    "1-1": 154915,
    "1-2": 37424,
    "4-3": 21110,
    "6-0": 111110,
    "6-2": 32110,
    "8-1": 12310,
    "9-1": 86110,
  };

  const type = "district";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
        height: "90vh",
        //width:"10px",
        overflowY: "scroll",
        //scrollbarColor: '#52C41A #F1F1F1',
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          width: "1px !important", // Change this to adjust the width of the scrollbar
          //display: 'none'
        },
        "&::-webkit-scrollbar-track": {
          background: "#F1F1F1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#52C41A",
        },
      }}
    >
      <Grid>
        <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          <Grid item sm={12} md={2} lg={2}>
            <StatBoxWithoutImage
              count={"6554"}
              title={"Crop Production"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"2540"}
              title={"Cultivation Extent"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"50"}
              title={"Crop Damage Extents"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"50"}
              title={"Crop Damage Extents"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"2M"}
              title={"Number of Farmers"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"5K"}
              title={"GAP Farmers"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"5K"}
              title={"Seed Farmers"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"5K"}
              title={"Certified Seed Production"}
              subtitle={"Million Metric tons"}
            />
            <StatBoxWithoutImage
              count={"5K"}
              title={"Statistics"}
              subtitle={"Million Metric tons"}
            />
          </Grid>
          <Grid item sm={12} md={6} lg={6}>
            <Grid mb={3}>
              {cropCategory?.map((item) => (
                <>
                  <Chip
                    color="success"
                    label={item?.description}
                    variant={
                      selectCropCategory?.id === item?.id
                        ? "default"
                        : "outlined"
                    }
                    onClick={() => cropCategoryChipHandleClick(item)}
                    sx={{ marginRight: "5px", marginBottom: "5px" }}
                  />
                </>
              ))}
            </Grid>

            <Grid mb={3}>
              <Autocomplete
                options={allCropLookSeason}
                getOptionLabel={(option) => option?.agriSeason?.description}
                value={selectCropLookSeason}
                onChange={handleCropLookSeasonChange}
                renderInput={(params) => (
                  <InputBase
                    {...params.InputProps}
                    inputProps={params.inputProps}
                    sx={{
                      color: "black",
                      width: "250px",
                      height: "40px",
                      bgcolor: "#ffffff",
                      borderRadius: "20px",
                      padding: "0px 0px 0px 30px",
                      border: "2px solid #DBDBDB",
                    }}
                    placeholder="Select season"
                    //endAdornment={<SearchIcon />}
                  />
                )}
              />
            </Grid>

            <Grid
              sx={{
                borderRadius: "15px",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                border: "1.5px solid #c0c9c0",
                backgroundColor: "none",
              }}
              display={"flex"}
              flexDirection={"row"}
            >
              <ReactApexChart options={optionss} series={series} type="donut" />
              <ReactApexChart
                options={optionssthree}
                series={seriestwo}
                type="donut"
              />
            </Grid>

            <Grid
              sx={{
                borderRadius: "15px",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                border: "1.5px solid #c0c9c0",
              }}
              mt={3}
            >
              <ReactApexChart
                options={lineChartOptions}
                series={seriesline}
                type="line"
                height={380}
              />
            </Grid>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <SriLankaMap url={url} distribution={distribution} type={type} />
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: "2px" }}>
          <Grid item sm={12} md={2} lg={2}></Grid>
          <Grid item md={10} lg={10}>
            <Grid
              sx={{
                borderRadius: "15px",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                border: "1.5px solid #c0c9c0",
                backgroundColor: "#87C5AA",
              }}
            >
              <ReactApexChart
                options={barChartOptions}
                series={seriesBar}
                type="bar"
                height={380}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
