import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  Grid,
  InputBase,
  TextField,
} from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
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
import { baseURL } from "../../utils/constants/api";
import { getCropsByCropCategory } from "../../redux/actions/crop/cropVariety/action";
import { color } from "d3";

const Dashboard = () => {
  useUserAccessValidation();

  const [cropCategory, setCropCategory] = useState([]);
  console.log({ cropCategory });
  const [selectCropCategory, setSelectCropCategory] = useState();
  console.log({ selectCropCategory });
  const [allCropLookSeason, setAllCropLookSeason] = useState([]);
  const [allIrrigationModeData, setAllIrrigationModeData] = useState([]);
  const [allVarietyProgressData, setAllVarietyProgressData] = useState({});
  const [allTargetExtent, setAllTargetExtent] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingCrop, setLoadingCrop] = useState(false);

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

  console.log({ allIrrigationModeData });
  const [selectCropLookSeason, setCropLookSeason] = useState();
  const [selectCropList, setSelectCropList] = useState();
  const [selectCrop, setSelectCrop] = useState();
  console.log({ selectCrop });

  useEffect(() => {
    if (allCropLookSeason.length > 0) {
      setCropLookSeason(allCropLookSeason[0]);
    }
  }, [allCropLookSeason]);

  const cropCategoryChipHandleClick = async (event, value) => {
    setSelectCropCategory(value);
    setLoadingCrop(true);
    await getCropsByCropCategory(value?.id).then(({ dataList }) => {
      setSelectCropList(dataList);
      setSelectCrop(dataList[0]);
    });
    setLoadingCrop(false);
  };

  useEffect(() => {
    const fetchCropCategoryData = async () => {
      const { dataList } = await get_CategoryList().finally(() =>
        setLoading(false)
      );
      setCropCategory(dataList);
      setSelectCropCategory(dataList[0]);
      getCropsByCropCategories(dataList[0]?.id);
    };
    const fetchCropLookSeasons = async () => {
      await getCropLookSeasons()
        .then((res) => {
          setAllCropLookSeason(res?.dataList);
          setCropLookSeason(res?.dataList[0]);
        })
        .finally(() => setLoading(false));
    };

    fetchCropCategoryData();
    fetchCropLookSeasons();
  }, []);

  const getCropsByCropCategories = async (cropCategoryId) => {
    setLoadingCrop(true);
    await getCropsByCropCategory(cropCategoryId).then(({ dataList }) => {
      setSelectCropList(dataList);
      setSelectCrop(dataList[0]);
    });
    setLoadingCrop(false);
  };

  useEffect(() => {
    if (selectCropLookSeason?.id && selectCropCategory?.id) {
      getIrrigationModeProgress(
        selectCropLookSeason?.id,
        selectCropCategory?.id,
        selectCrop?.id
      ).then((res) => {
        setAllIrrigationModeData(res?.dataList);
      });

      getvarietyProgress(
        selectCropLookSeason?.id,
        selectCropCategory?.id,
        selectCrop?.id
      ).then((res) => {
        console.log({ res });
        setAllVarietyProgressData(res?.dataList);
      });
    }
  }, [
    selectCropLookSeason,
    selectCropCategory,
    selectCrop,
    allCropLookSeason,
    loadingCrop,
  ]);

  useEffect(() => {
    const filteredData = allIrrigationModeData.filter(
      (item) => item.total !== null && item.total !== 0
    );
    const sortedData = filteredData.sort((a, b) => b.total - a.total);

    const totals = filteredData.reduce((acc, item) => acc + item.total, 0);

    console.log({ totals });

    const percentageData = sortedData.map((item) => ({
      ...item,
      total: (item.total / totals) * 100,
    }));

    const moreThanTwoPercent = percentageData.filter((item) => item.total > 2);
    const length = moreThanTwoPercent.length;

    console.log({ moreThanTwoPercent });

    let result = [];

    if (length < 4) {
      console.log("less then 5");
      // show first length(count of moreThanTwoPercent) and other varities percentage total show as a others
      const firstItems = moreThanTwoPercent.slice(0, length);

      const othersTotal = percentageData
        .slice(length, percentageData.length)
        .reduce((acc, item) => acc + item.total, 0);

      if (othersTotal === 0) {
        result = [...firstItems];
      } else {
        result = [...firstItems, { varietyName: "others", total: othersTotal }];
      }
    } else {
      //show first 4 and other varities percentage total show as a others

      const firstFour = moreThanTwoPercent.slice(0, 4);
      const othersTotal = percentageData
        .slice(5, percentageData.length - 1)
        .reduce((acc, item) => acc + item.total, 0);

      if (othersTotal === 0) {
        result = [...firstFour];
      } else {
        result = [...firstFour, { varietyName: "others", total: othersTotal }];
      }
    }

    const varietyNames = result?.map((item) => item.varietyName);
    const total = result.map((item) => item?.total);

    setIrrigationSortData({
      varietyNames,
      total,
    });
  }, [allIrrigationModeData]);

  useEffect(() => {
    const newVar = allVarietyProgressData?.[0];

    if (newVar) {
      const dataArray = Object.entries(newVar);

      // Sort the array based on the numeric values
      dataArray.sort((a, b) => {
        const valueA = parseFloat(a[1] ?? 0);
        const valueB = parseFloat(b[1] ?? 0);

        // Sort in descending order
        return valueB - valueA;
      });

      console.log({ dataArray });

      //const convertedData = dataArray?.map(([name, total]) => ({ name, total }));

      const convertedData = dataArray
        ?.filter(([name, total]) => name && total)
        .map(([name, total]) => ({ name, total }));

      const totals = convertedData?.reduce((acc, item) => acc + item.total, 0);

      const percentageData = convertedData?.map((item) => ({
        ...item,
        total: (item.total / totals) * 100,
      }));

      const moreThanTwoPercent = percentageData.filter(
        (item) => item.total > 2
      );
      const length = moreThanTwoPercent.length;

      console.log("newl", length);
      console.log({ percentageData });

      let result = [];

      if (length < 4) {
        console.log("less then 5");
        // show first length(count of moreThanTwoPercent) and other varities percentage total show as a others
        const firstItems = moreThanTwoPercent.slice(0, length);

        const othersTotal = percentageData
          .slice(length, percentageData.length)
          .reduce((acc, item) => acc + item.total, 0);

        if (othersTotal === 0) {
          result = [...firstItems];
        } else {
          result = [...firstItems, { name: "others", total: othersTotal }];
        }
      } else {
        const firstItems = moreThanTwoPercent?.slice(0, 4);
        console.log({ firstItems });

        const othersTotal = percentageData
          .slice(5, convertedData.length - 1)
          .reduce((acc, item) => acc + item.total, 0);

        if (othersTotal === 0) {
          result = [...firstItems];
        } else {
          result = [...firstItems, { name: "others", total: othersTotal }];
        }
      }

      const name = result?.map((item) => item?.name);
      const updatedNames = name?.map((item) =>
        item?.startsWith("totalExtent") ? item.replace("totalExtent", "") : item
      );
      console.log({ updatedNames });
      const total = result?.map((item) => item?.total);

      setvarietyProgressData({
        keys: updatedNames,
        value: total,
      });
    }
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

  const handleCropChange = (event, value) => {
    setSelectCrop(value);
  };

  const series =
    varietyProgressSortData?.value.length < 1
      ? [10, 10]
      : varietyProgressSortData?.value;
  const seriestwo =
    irrigationSortData?.total?.length < 1
      ? [10, 10]
      : irrigationSortData?.total;
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
    colors:
      (irrigationSortData?.total?.length < 1 ? ["#e0e0e0", "#e0e0e0"] : null) ??
      [],

    labels:
      irrigationSortData?.varietyNames?.length < 1
        ? ["No Data", "No Data"]
        : irrigationSortData?.varietyNames,
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
    // noData: {
    //   text: "No data available",
    //   align: 'center',
    //   verticalAlign: 'middle',
    //   offsetX: 0,
    //   offsetY: 0,
    //   style: {
    //     color: '#000',
    //     fontSize: '14px',
    //     fontFamily: undefined
    //   }
    // },
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
    labels:
      varietyProgressSortData?.keys?.length < 1
        ? ["No Data", "No Data"]
        : varietyProgressSortData?.keys,
    legend: {
      position: "bottom", // Change this to your desired position: top, bottom, left, right
    },
    colors:
      (varietyProgressSortData?.keys?.length < 1
        ? ["#e0e0e0", "#e0e0e0"]
        : null) ?? [],
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
    baseURL + "map/get-district-features?object=1-1,1-2,4-3,6-2,6-1,8-1,9-1";

  console.log(url);
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
      <Grid display={"flex"} justifyContent={"flex-end"} my={2}>
        {loading !== true && (
          <>
            <Autocomplete
              options={allCropLookSeason}
              getOptionLabel={(option) => option?.agriSeason?.description}
              value={selectCropLookSeason}
              onChange={handleCropLookSeasonChange}
              sx={{ marginRight: "1%" }}
              renderInput={(params) => (
                <InputBase
                  {...params.InputProps}
                  inputProps={params.inputProps}
                  sx={{
                    color: "#fff",
                    width: "250px",
                    height: "40px",
                    borderRadius: "20px",
                    padding: "0px 0px 0px 30px",
                    border: "1px solid #DBDBDB",
                    backgroundColor: "#388e3c",
                  }}
                  placeholder="Select season"
                />
              )}
            />
          </>
        )}
      </Grid>
      <Grid>
        <Grid container spacing={2}>
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
            {/* <Grid mb={3}>
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
            </Grid> */}

            <Grid mb={3} sx={{ display: "flex" }}>
              {loading !== true && (
                <>
                  <Autocomplete
                    options={cropCategory}
                    getOptionLabel={(option) => option?.description}
                    value={selectCropCategory}
                    onChange={cropCategoryChipHandleClick}
                    sx={{ marginRight: "5px" }}
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
                        placeholder="Select Crop Category"
                        //endAdornment={<SearchIcon />}
                      />
                    )}
                  />
                </>
              )}

              {loadingCrop !== true && (
                <>
                  <Autocomplete
                    options={selectCropList}
                    getOptionLabel={(option) =>
                      selectCrop ? option?.description : ""
                    }
                    value={selectCrop}
                    onChange={handleCropChange}
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
                        placeholder="Select Crop"
                        //endAdornment={<SearchIcon />}
                      />
                    )}
                  />
                </>
              )}
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
              {loadingCrop === true ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <>
                  {varietyProgressSortData?.value.length < 1 ? (
                    <>
                      <Grid>
                        <h3 style={{ textAlign: "center" }}>No Data Found !</h3>
                        <ReactApexChart
                          options={optionss}
                          series={series}
                          type="donut"
                        />
                      </Grid>
                    </>
                  ) : (
                    <ReactApexChart
                      options={optionss}
                      series={series}
                      type="donut"
                    />
                  )}
                </>
              )}

              {loadingCrop === true ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <>
                  {varietyProgressSortData?.value.length < 1 ? (
                    <>
                      <Grid>
                        <h3 style={{ textAlign: "center" }}>No Data Found !</h3>
                        <ReactApexChart
                          options={optionssthree}
                          series={seriestwo}
                          type="donut"
                        />
                      </Grid>
                    </>
                  ) : (
                    <ReactApexChart
                      options={optionssthree}
                      series={seriestwo}
                      type="donut"
                    />
                  )}
                </>
              )}
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
