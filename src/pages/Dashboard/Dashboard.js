import React, { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, Grid, InputBase } from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import StatBoxWithoutImage from "../../components/DashBoardStatBox/StatBoxWithoutImage";
import { get_CategoryList } from "../../redux/actions/crop/cropCategory/action";
import SriLankaMap from "../../components/ArcGisMap/SriLankaMap";
import ReactApexChart from "react-apexcharts";
import { getCropLookSeasons } from "../../redux/actions/cropLook/biWeekReporting/actions";
import {
  getIrrigationModeProgress,
  getProgressBiweekly,
  getvarietyProgress,
} from "../../redux/actions/cropLook/irrigationMode/action";
import { baseURL } from "../../utils/constants/api";
import { getCropsByCropCategory } from "../../redux/actions/crop/cropVariety/action";
import { cropDamageGnDistribution } from "../../redux/actions/crop/cropDamage/action";
import setGlobals from "react-map-gl/dist/esm/utils/set-globals";

const Dashboard = () => {
  useUserAccessValidation();

  const [cropCategory, setCropCategory] = useState([]);

  const [selectCropCategory, setSelectCropCategory] = useState();

  const [allCropLookSeason, setAllCropLookSeason] = useState([]);
  const [allIrrigationModeData, setAllIrrigationModeData] = useState([]);
  const [allVarietyProgressData, setAllVarietyProgressData] = useState({});
  const [biWeekProgressData, setBiWeekProgressData] = useState();

  const [allTargetExtent, setAllTargetExtent] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingCrop, setLoadingCrop] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [mapData, setMapData] = useState(null);

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

  const [selectCropLookSeason, setCropLookSeason] = useState();
  const [selectCropList, setSelectCropList] = useState();
  const [selectCrop, setSelectCrop] = useState();

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
        setAllVarietyProgressData(res?.dataList);
      });

      getProgressBiweekly(
        selectCropLookSeason?.id,
        selectCropCategory?.id,
        selectCrop?.id
      ).then((res) => {
        setBiWeekProgressData(res?.dataList);
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

    const percentageData = sortedData.map((item) => ({
      ...item,
      total: (item.total / totals) * 100,
    }));

    const moreThanTwoPercent = percentageData.filter((item) => item.total > 2);
    const length = moreThanTwoPercent.length;

    let result = [];

    if (length < 4) {
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

      let result = [];

      if (length < 4) {
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
    setCropLookSeason(value);
  };
  console.log({selectCropLookSeason});

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

  const weekList = biWeekProgressData?.weekList;
  const remainingTarget = biWeekProgressData?.remainingTarget;
  const currentWeekExtent = biWeekProgressData?.currentWeekExtent;
  const progress = biWeekProgressData?.progress;

  const totalTargetForSeason = biWeekProgressData?.totalTargetForSeason;

  const seriesline = [
    {
      name: "Progress",
      data: progress,
    },
    {
      name: "Current Week Extent",
      data: currentWeekExtent,
    },

    {
      name: "Remaining Target",
      data: remainingTarget,
    },
  ];

  const lineChartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: weekList,
    },
    yaxis: {
      max: totalTargetForSeason,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
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

  useEffect(() => {
    setLoadingMap(false);
    const fetchCropDamageDistribution = async () => {
      await cropDamageGnDistribution(selectCropLookSeason?.agriSeason?.id).then((res) => {
        setMapData(res);
        setLoadingMap(true);
      });
    };
    fetchCropDamageDistribution();
  }, [selectCropLookSeason?.agriSeason]);

  const gnDiviionIds = [];
  mapData?.map((data) => {
    gnDiviionIds.push(data.code);
  });

  const distribution = {};

  mapData?.map((item) => {
    distribution[item.code] = item.variation;
  });

  const url = `map/get-gn-features?object=${gnDiviionIds}`;
  const type = "gn";

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
              {biWeekProgressData?.weekList?.length > 0 ? (
                <>
                  <ReactApexChart
                    options={lineChartOptions}
                    series={seriesline}
                    type="bar"
                    height={380}
                  />
                </>
              ) : (
                <h3 style={{ marginLeft: "20px" }}>
                  It looks like there is no bi-weekly data available for your
                  chosen items !
                </h3>
              )}
            </Grid>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            {loadingMap ? (
              <SriLankaMap url={url} distribution={distribution} type={type} />
            ) : null}
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
