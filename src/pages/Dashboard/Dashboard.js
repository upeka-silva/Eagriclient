import React, { useEffect, useState } from "react";
import { Chip, Grid, useTheme } from "@mui/material";
import { useUserAccessValidation } from "../../hooks/authentication";
import { tokens } from "../../utils/theme/app-theme";
import StatBoxWithoutImage from "../../components/DashBoardStatBox/StatBoxWithoutImage";
import { get_CategoryList } from "../../redux/actions/crop/cropCategory/action";
import SriLankaMap from "../../components/ArcGisMap/SriLankaMap";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  useUserAccessValidation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectCropCategory, setSelectCropCategory] = useState({ id: 1 });
  const [cropCategory, setCropCategory] = useState([]);
  const cropCategoryChipHandleClick = async (chipLabel) => {
    setSelectCropCategory(chipLabel);
    console.info("You clicked the Chip: ", chipLabel);
  };

  useEffect(() => {
    const fetchCropCategoryData = async () => {
      const { dataList } = await get_CategoryList();
      setCropCategory(dataList);
    };
    fetchCropCategoryData();
  }, []);

  const series = [11, 2, 2, 2, 7];
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
    labels: ["Work", "Eat", "Commute", "Watch TV", "Sleep"],
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
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
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
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
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

  const ulrString =
    "http://localhost:8080/api/v1/map/get-district-features?object=1-1,1-2,1-3";

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
              <ReactApexChart options={optionss} series={series} type="donut" />
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
            <SriLankaMap ulrString={ulrString} />
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
