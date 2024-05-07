import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Grid } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { CircularProgress } from "@mui/material";
import { stringAvatar } from "../../utils/helpers/stringUtils";
import { getGapDetails } from "../../redux/actions/gap/action";

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        width: 420,
        margin: '0 auto',
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: theme.shadows[3],
        borderRight: "1px solid green"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: theme.spacing(2),
    },
}));

const GapDetailsPreview = () => {
    const { id } = useParams();
    const [gapData, setGapData] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const { dataList } = await getGapDetails(id);
            setGapData(dataList);
        } catch (error) {
            console.error('Error fetching gap data:', error);
        }
    };

    const handleDownloadPdf = () => {
        const pdfUrl = gapData.certificatePresignedUrl
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('PDF URL is not available.');
        }
    };

    return (
        <Grid container
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: "100vh", padding: "16px" }} 
        >
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Paper className={classes.tableContainer}>
                    {gapData ? (
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} colSpan={2} component="td" scope="row" height="120px" align="center">
                                                {gapData?.farmerDTO?.profilePicture ? (
                                                    <Avatar
                                                        alt="Profile Image"
                                                        src={gapData?.farmerDTO?.profilePicture}
                                                        sx={{ width: "60px", height: "60px" }}
                                                    />
                                                ) : (
                                                    <Avatar style={{ width: "80px", height: "80px", fontSize: "20px", margin: "auto" }} className={classes.avatar}
                                                        {...stringAvatar((gapData && gapData.farmerDTO && gapData.farmerDTO.firstName + " " + gapData.farmerDTO.lastName) || 'Guest', "ProfileImgSmall")}
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Name:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{`${gapData?.farmerDTO?.firstName} ${gapData?.farmerDTO?.lastName}`}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Date of Birth:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{new Date(gapData?.farmerDTO?.dob).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Address:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmerDTO?.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                NIC:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmerDTO?.nic}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Email:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmerDTO?.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Mobile:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmerDTO?.mobile}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Export Farmer:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmerDTO?.isExportFarmer ? "Yes" : "No"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                FarmLand Name:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmLandDTO?.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Location:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmLandDTO?.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                City:
                                            </TableCell>
                                            <TableCell style={{ fontSize: "16px" }} align="right">{gapData?.farmLandDTO?.city}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "16px" }} component="td" scope="row">
                                                Download Gap Certificate:
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button onClick={handleDownloadPdf} variant="contained" color="primary">Download PDF</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    ) : (
                        <CircularProgress />
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default GapDetailsPreview;

