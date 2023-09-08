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
        console.log('initial d ', formData);
        console.log('initial d ', mode);
        const newOne = {};
        newOne.assessmentId = formData.assessmentId;
        newOne.id = formData.id;
        let idKey = '';
        let idAnsKey = '';
        console.log('dddd ', formData?.answerList);
        if (formData?.answerList && formData?.answerList?.length > 0) {

            for (const answer of formData?.answerList) {
                idKey = 'question_' + answer?.question?.id;
                idAnsKey = 'answer_' + answer?.question?.id;
                newOne[idKey] = answer?.question?.questionString;
                newOne[idAnsKey] = answer?.answer;
            }

            console.log('new form ', newOne);
            setFormDataQ(newOne)
        }

    }, [formData]);

    const handleChange = (value, target) => {
        //console.log('fff ', value);
        //console.log('target ', target);
        setFormDataQ((current = {}) => {
            let newData = {...current};
            newData[target] = value;
            //console.log('changed value ', newData[target]);
            return newData;
        });
        //console.log('updated ', formDataQ);
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
                        // border: "1px solid #bec0c2",
                        margin: "15px",
                        width: "97%",
                        borderRadius: "5px",
                    }}
                >
                    <Grid item lg={5}>
                        <FieldWrapper>
                            <FieldName>Assessment ID</FieldName>
                            <TextField
                                name="assessmentId"
                                id="assessmentId"
                                value={formDataQ?.assessmentId || ""}
                                disabled={mode === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                    handleChange(e?.target?.value || "", "assessmentId")
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
                    <Grid item lg={7}></Grid>
                    {formData?.answerList?.map((item, index) => (
                        <Grid item lg={6}>
                            <FieldWrapper>
                                <FieldName>{index + 1}. {item?.question?.questionString} ?</FieldName>

                                {item?.question?.questionType === 'TEXT' &&
                                 <TextField
                                     name={"answer_" + item.id}
                                     id={"answer_" + item.id}
                                     value={formDataQ["answer_" + item.id] || ""}
                                     disabled={mode === DEF_ACTIONS.VIEW}
                                     onChange={(e) =>
                                         handleChange(e?.target?.value || "", "answer_" + item.id)
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
                                     name={"answer_" + item.id}
                                     id={"answer_" + item.id}
                                     value={formDataQ["answer_" + item.id] || ""}
                                     disabled={mode === DEF_ACTIONS.VIEW}
                                     onChange={(e) =>
                                         handleChange(e?.target?.value || "", "answer_" + item.id)
                                     }
                                     checked={formDataQ["answer_" + item.id] === true}
                                 />
                                }

                            </FieldWrapper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
        /*            <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Cancel
                        </Button>
                        <Button disabled={mode === DEF_ACTIONS.VIEW}
                                onClick={event => confirmAction(event, formDataQ, mode)}>Save</Button>
                    </DialogActions>*/
    )
}
