// LandingPage.js

import React, {useContext,useState, useEffect} from "react";

import {  useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Farmer from "../../assets/images/farmer.png";
import { CardWrapper } from "../../components/PageLayout/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ServiceCard from "./ServiceCard"; // Import the ServiceCard component

import { Routes } from "../../routes/routes";
import { get_DataList } from "../../redux/actions/list/list";
import {CircularProgress, LinearProgress} from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

const LoaderWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20vh;
`;

const LandingPage = ({ loadingTable = false, loaderType = "circular" }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(loadingTable);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await get_DataList("app-services");
                setServices(response.dataList);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const renderProgress = () => {
        switch (loaderType) {
            case "linear":
                return (
                    <div style={{ width: "50%" }}>
                        <Typography>Loading...</Typography>
                        <LinearProgress />
                    </div>
                );
            case "circular":
            default:
                return <CircularProgress />;
        }
    };

    if (loading) {
        return <LoaderWrapper>{renderProgress()}</LoaderWrapper>;
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <CardWrapper>
                <h1>
                    <strong>Hi Dinidu!</strong>
                </h1>
                <Typography variant="h4">
                    PLEASE SELECT AN AGRICULTURAL SERVICE
                </Typography>
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ServiceCard service={service} />
                        </Grid>
                    ))}
                </Grid>
            </CardWrapper>
        </ThemeProvider>
    );
};

export default LandingPage;





