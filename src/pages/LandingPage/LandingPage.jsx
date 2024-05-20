// LandingPage.js

import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { CardWrapper } from "../../components/PageLayout/Card";
import Typography from "@mui/material/Typography";
import ServiceCard from "./ServiceCard"; // Import the ServiceCard component

import { CircularProgress, LinearProgress } from "@mui/material";
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

    // useEffect(() => {
    //     async function fetchData() {
    //         setLoading(true);
    //         try {
    //             const response = await get_DataList("app-services");
    //             setServices(response.dataList);
    //         } catch (error) {
    //             console.error('Error fetching services:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     fetchData();
    // }, []);

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
                <Typography sx={{ marginBottom: 9 }} variant="h6">
                    PLEASE SELECT AN AGRICULTURAL SERVICE
                </Typography>

                <Grid container spacing={8}>
                    {services.map((service, index) => (
                        <Grid item xs={2} sm={6} md={4} key={index}>
                            <ServiceCard service={service} />
                        </Grid>
                    ))}
                </Grid>
            </CardWrapper>
        </ThemeProvider>
    );
};

export default LandingPage;





