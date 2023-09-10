import React, {useState, useEffect} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Colors} from "../../utils/constants/Colors";
import {FieldWrapper} from "../../components/FormLayout/FieldWrapper";
import {FieldName} from "../../components/FormLayout/FieldName";
import {Fonts} from "../../utils/constants/Fonts";
import {DEF_ACTIONS} from "../../utils/constants/permission";
import Checkbox from "@mui/material/Checkbox";
import {useUserAccessValidation} from "../../hooks/authentication";
import {useLocation} from "react-router";
import {ActionWrapper} from "../../components/PageLayout/ActionWrapper";
import {Add, Edit} from "@mui/icons-material";
import {ButtonWrapper} from "../../components/FormLayout/ButtonWrapper";

export default function DynamicFormDialogGap({
                                              open,
                                              handleClose,
                                              confirmAction,
                                              formData,
                                              mode,
                                              addView,
                                          }) {
    useUserAccessValidation();
    const {state} = useLocation();
    const [formDataQ, setFormDataQ] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (!formData) {
            return;
        }
        const newOne = {};
        newOne.auditId = formData.auditId;
        newOne.id = formData.id;
        newOne.description = formData.description;
        newOne.auditCategory = formData.auditCategory;
        newOne.auditSubCategory = formData.auditSubCategory;
        let idKey = '';
        let idAnsKey = '';
        if (formData?.auditAnswers && formData?.auditAnswers?.length > 0) {

            for (const answer of formData?.auditAnswers) {
                idKey = 'question_' + answer?.question?.id;
                idAnsKey = 'answer_' + answer?.question?.id;
                newOne[idKey] = answer?.question?.questionString;
                newOne[idAnsKey] = answer?.answer;
            }
        }
        setFormDataQ(newOne)

    }, [formData]);

    const handleChange = (value, target) => {
        setFormDataQ((current = {}) => {
            let newData = {...current};
            newData[target] = value;
            return newData;
        });
    };

    const resetForm = () => {
        if (state?.action === DEF_ACTIONS.EDIT) {
            setFormDataQ(state?.target || {});
        } else {
            setFormDataQ({});
        }
    };

    const enableSave = () => {
        if (state?.action === DEF_ACTIONS.EDIT) {
            if (JSON.stringify(state?.target || {}) !== JSON.stringify(formData)) {
                return true;
            }
        }
        if (
            state?.action === DEF_ACTIONS.ADD &&
            Object.keys(formData || {}).length > 0
        ) {
            return true;
        }
        return false;
    };

    return (
        <>
            <ButtonWrapper>
                {state?.action !== DEF_ACTIONS.VIEW && (
                    <ActionWrapper>
                        {saving ? (
                            <Button variant="contained">
                                {state?.action === DEF_ACTIONS.ADD
                                 ? "ADDING..."
                                 : "UPDATING..."}
                            </Button>
                        ) : (
                             <>
                                 <Button
                                     variant="outlined"
                                     disabled={!enableSave()}
                                     onClick={event => addView(event, formDataQ)}
                                     size="small"
                                     color="success"
                                 >
                                     ADD
                                 </Button>
                                 <Button
                                     variant="outlined"
                                     disabled={!enableSave()}
                                     onClick={event => confirmAction(event, formDataQ, mode)}
                                     size="small"
                                     color="success"
                                     sx={{marginLeft: "10px"}}
                                 >
                                     {state?.action === DEF_ACTIONS.ADD ? <Add/> : <Edit/>}
                                 </Button>
                                 <Button
                                     onClick={resetForm}
                                     color="success"
                                     variant="contained"
                                     size="small"
                                     sx={{marginLeft: "10px"}}
                                 >
                                     RESET
                                 </Button>
                             </>
                         )}
                    </ActionWrapper>
                )}
            </ButtonWrapper>
            <Box sx={{display: 'flex'}}>
                <Grid
                    container
                    sx={{
                        margin: "15px",
                        width: "97%",
                        borderRadius: "5px",
                    }}
                >
                    <Grid item lg={5}>
                        <FieldWrapper>
                            <FieldName>Audit ID</FieldName>
                            <TextField
                                name="auditId"
                                id="auditId"
                                value={formDataQ?.auditId || ""}
                                disabled={mode === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                    handleChange(e?.target?.value || "", "auditId")
                                }
                                size="small"
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        borderRadius: "8px",
                                        backgroundColor: `${Colors.white}`,
                                    },
                                }}
                            />
                        </FieldWrapper>
                    </Grid>

                    <Grid item lg={5}>
                        <FieldWrapper>
                            <FieldName>description</FieldName>
                            <TextField
                                name="description"
                                id="description"
                                value={formDataQ?.description || ""}
                                disabled={mode === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                    handleChange(e?.target?.value || "", "description")
                                }
                                size="small"
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": {
                                        borderRadius: "8px",
                                        backgroundColor: `${Colors.white}`,
                                    },
                                }}
                            />
                        </FieldWrapper>
                    </Grid>

                    <Grid item lg={5}>
                        <FieldWrapper>
                            <FieldName>category</FieldName>
                            <Select
                                value={formDataQ?.auditCategory || ""}
                                disabled={mode === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                    handleChange(e?.target?.value || "", "auditCategory")
                                }
                                sx={{
                                    borderRadius: "8px",
                                    backgroundColor: `${Colors.white}`,
                                }}
                                size="small"
                                fullWidth
                            >
                                <MenuItem value={"SL_GAP"}>SL_GAP</MenuItem>
                                <MenuItem value={"GAP_B"}>GAP_B</MenuItem>
                            </Select>
                        </FieldWrapper>
                    </Grid>

                    <Grid item lg={5}>
                        <FieldWrapper>
                            <FieldName>sub cat</FieldName>
                            <Select
                                value={formDataQ?.auditSubCategory || ""}
                                disabled={mode === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                    handleChange(e?.target?.value || "", "auditSubCategory")
                                }
                                sx={{
                                    borderRadius: "8px",
                                    backgroundColor: `${Colors.white}`,
                                }}
                                size="small"
                                fullWidth
                            >
                                <MenuItem value={"VEG"}>Veg</MenuItem>
                                <MenuItem value={"FRUIT"}>Fruit</MenuItem>
                                <MenuItem value={"PADDY"}>Paddy</MenuItem>
                            </Select>
                        </FieldWrapper>
                    </Grid>

                    <Grid item lg={7}></Grid>
                    {formData?.auditAnswers?.map((item, index) => (
                        <Grid item lg={6}>
                            <FieldWrapper>
                                <FieldName>{index + 1}. {item?.question?.questionString} ? </FieldName>

                                {item?.question?.questionType === 'TEXT' &&
                                 <TextField
                                     name={"answer_" + item.question.id}
                                     id={"answer_" + item.question.id}
                                     value={formDataQ["answer_" + item.question.id] || ""}
                                     disabled={mode === DEF_ACTIONS.VIEW}
                                     onChange={(e) =>
                                         handleChange(e?.target?.value || "", "answer_" + item.question.id)
                                     }
                                     size="small"
                                     fullWidth
                                     sx={{
                                         "& .MuiInputBase-root": {
                                             borderRadius: "8px",
                                             backgroundColor: `${Colors.white}`,
                                         },
                                     }}
                                 />
                                }

                                {item?.question?.questionType === 'BOOLEAN' &&
                                 <Checkbox
                                     name={"answer_" + item.question.id}
                                     id={"answer_" + item.question.id}
                                     value={formDataQ["answer_" + item.question.id]}
                                     disabled={mode === DEF_ACTIONS.VIEW}
                                     onChange={(e) =>
                                         handleChange(e?.target?.checked || "", "answer_" + item.question.id)
                                     }
                                     checked={formDataQ["answer_" + item.question.id] === true}
                                 />
                                }
                                {item?.proofDocs[0]?.id &&
                                    <p>File ID: {item?.proofDocs[0]?.id}</p>
                                }

                            </FieldWrapper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}
