import React, { useState, useEffect } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button, Grid, MenuItem, Select, TextField} from "@mui/material";
import { Colors } from "../../utils/constants/Colors";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { Fonts } from "../../utils/constants/Fonts";

import {get_InstitutionCatList} from "../../redux/actions/institution/institutionCategory/action";
import {DEF_ACTIONS} from "../../utils/constants/permission";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Switch demo" } };
export default function AddQuestionDialog({
                                              open,
                                              handleClose,
                                              confirmAction,
                                              formData,
                                              mode
                                          }) {

    const [formDataQ, setFormDataQ] = useState({} );

    useEffect(() => { setFormDataQ(formData) }, [formData]);


    const handleChange = (value, target) => {
        setFormDataQ((current = {}) => {
            let newData = { ...current };
            newData[target] = value;
            return newData;
        });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-object"
            aria-describedby="delete-description"
        >
            <DialogTitle id="delete-object" style={{
                fontFamily:Fonts.fontStyle1
            }}>{mode} QUESTION</DialogTitle>
            <DialogContent>
                <Box sx={{ display:'flex' }}>
                    <Grid
                        container
                        sx={{
                            // border: "1px solid #bec0c2",
                            margin: "15px",
                            width: "97%",
                            borderRadius: "5px",
                        }}
                    >
                        <Grid item lg={12}>
                            <FieldWrapper
                                style={{
                                    flexDirection: "column",
                                    flex: "1 1 264px",
                                    gap: "0",
                                    marginInline:'5px',
                                    fontFamily:Fonts.fontStyle1

                                }}
                            >
                                <FieldName
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Question
                                </FieldName>
                                <TextField
                                    name="questionString"
                                    id="questionString"
                                    value={formDataQ?.questionString || ""}
                                       disabled={mode === DEF_ACTIONS.VIEW}
                                       onChange={(e) =>
                                         handleChange(
                                           e?.target?.value || "",
                                           "questionString"
                                         )
                                       }
                                    size="small"
                                    fullWidth
                                    sx={{
                                        // width: "264px",
                                        "& .MuiInputBase-root": {
                                            // height: "30px",
                                            borderRadius: "8px",
                                            backgroundColor: `${Colors.white}`,
                                        },
                                    }}
                                />
                            </FieldWrapper>
                        </Grid>
                        <Grid item lg={12}>
                            <FieldWrapper
                                style={{
                                    flexDirection: "column",
                                    flex: "1 1 264px",
                                    gap: "0",
                                    marginInline:'5px',
                                    fontFamily:Fonts.fontStyle1

                                }}
                            >
                                <FieldName
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Order
                                </FieldName>
                                <TextField
                                    name="order"
                                    id="order"
                                    value={formDataQ?.order || ""}
                                    disabled={mode === DEF_ACTIONS.VIEW}
                                    onChange={(e) =>
                                        handleChange(
                                            e?.target?.value || "",
                                            "order"
                                        )
                                    }
                                    size="small"
                                    fullWidth
                                    sx={{
                                        // width: "264px",
                                        "& .MuiInputBase-root": {
                                            // height: "30px",
                                            borderRadius: "8px",
                                            backgroundColor: `${Colors.white}`,
                                        },
                                    }}
                                />
                            </FieldWrapper>
                        </Grid>
                        <Grid item lg={12}>
                            <FieldWrapper
                                style={{
                                    flexDirection: "column",
                                    flex: "1 1 200px",
                                    gap: "0",
                                    marginInline:'5px',
                                    fontFamily:Fonts.fontStyle1
                                }}
                            >
                                <FieldName
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Question Type
                                </FieldName>

                                <Select
                                    name="questionType"
                                    id="questionType"
                                    value={formDataQ?.questionType || ""}
                                    disabled={mode === DEF_ACTIONS.VIEW}
                                    onChange={(e) =>
                                        handleChange(
                                            e?.target?.value || "",
                                            "questionType"
                                        )
                                    }
                                    size="small"
                                    fullWidth
                                    sx={{
                                        // width: "264px",
                                        "& .MuiInputBase-root": {
                                            // height: "30px",
                                            borderRadius: "8px",
                                            backgroundColor: `${Colors.white}`,
                                        },
                                    }}
                                >
                                    <MenuItem value={"TEXT"}>TEXT</MenuItem>
                                    <MenuItem value={"BOOLEAN"}>BOOLEAN</MenuItem>
                                </Select>

                            </FieldWrapper>
                        </Grid>
                        <Grid item lg={12}>
                            <FieldWrapper
                                style={{
                                    flexDirection: "column",
                                    flex: "1 1 264px",
                                    gap: "0",
                                    marginInline:'5px',
                                    fontFamily:Fonts.fontStyle1
                                }}
                            >
                                <FieldName
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Compliance Group
                                </FieldName>


                                <Select
                                    name="complianceGroup"
                                    id="complianceGroup"
                                    value={formDataQ?.complianceGroup || ""}
                                    disabled={mode === DEF_ACTIONS.VIEW}
                                    onChange={(e) =>
                                        handleChange(
                                            e?.target?.value || "",
                                            "complianceGroup"
                                        )
                                    }
                                    size="small"
                                    fullWidth
                                    sx={{
                                        // width: "264px",
                                        "& .MuiInputBase-root": {
                                            // height: "30px",
                                            borderRadius: "8px",
                                            backgroundColor: `${Colors.white}`,
                                        },
                                    }}
                                >
                                    <MenuItem value={"CRUCIAL"}>CRUCIAL</MenuItem>
                                    <MenuItem value={"MAJOR"}>MAJOR</MenuItem>
                                    <MenuItem value={"MINOR"}>MINOR</MenuItem>
                                    <MenuItem value={"RECOMMENDED"}>RECOMMENDED</MenuItem>
                                </Select>

                            </FieldWrapper>
                        </Grid>
                        <Grid item lg={12}>
                            <FieldWrapper
                                style={{
                                    flexDirection: "column",
                                    flex: "1 1 264px",
                                    gap: "0",
                                    marginInline:'5px',
                                    fontFamily:Fonts.fontStyle1
                                }}
                            >
                                <FieldName
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Item Group
                                </FieldName>

                                <Select
                                    name="itemGroup"
                                    id="itemGroup"
                                    value={formDataQ?.itemGroup || ""}
                                    disabled={mode === DEF_ACTIONS.VIEW}
                                    onChange={(e) =>
                                        handleChange(
                                            e?.target?.value || "",
                                            "itemGroup"
                                        )
                                    }
                                    size="small"
                                    fullWidth
                                    sx={{
                                        // width: "264px",
                                        "& .MuiInputBase-root": {
                                            // height: "30px",
                                            borderRadius: "8px",
                                            backgroundColor: `${Colors.white}`,
                                        },
                                    }}
                                >
                                    <MenuItem value={"INPUT_MANAGEMENT"}>INPUT_MANAGEMENT</MenuItem>
                                    <MenuItem value={"DOCUMENTATION"}>DOCUMENTATION</MenuItem>
                                    <MenuItem value={"REQUIREMENT"}>REQUIREMENT</MenuItem>
                                    <MenuItem value={"SEEDS"}>SEEDS</MenuItem>
                                    <MenuItem value={"PLANTING_MATERIAL"}>PLANTING_MATERIAL</MenuItem>
                                </Select>
                            </FieldWrapper>
                        </Grid>
                        <Grid item lg={12}>
                            <FieldWrapper
                                style={{
                                    flexDirection: "column",
                                    flex: "1 1 264px",
                                    gap: "0",
                                    marginInline:'5px',
                                    fontFamily:Fonts.fontStyle1
                                }}
                            >
                                <FieldName
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Proof Required
                                </FieldName>
                                <Checkbox
                                    {...label}
                                    name="proofRequired"
                                    id="proofRequired"
                                    value={formDataQ?.proofRequired}
                                    disabled={mode === DEF_ACTIONS.VIEW}
                                    onChange={(e) =>
                                        handleChange(e?.target?.checked, "proofRequired")
                                    }
                                    checked={formDataQ?.proofRequired === true}
                                />
                            </FieldWrapper>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
                <Button disabled={mode === DEF_ACTIONS.VIEW} onClick={ event => confirmAction(event, formDataQ, mode)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
