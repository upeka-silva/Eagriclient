import React, {useState, useEffect} from "react";
import {
    TextField,
    Button,
    CircularProgress,
    Grid,
    Select,
    MenuItem, Box, FormControl, Autocomplete,
} from "@mui/material";
import {useUserAccessValidation} from "../../hooks/authentication";
import {useLocation, useNavigate} from "react-router";
import {useSnackBars} from "../../context/SnackBarContext";
import {
    DEF_ACTIONS
} from "../../utils/constants/permission";
import {SnackBarTypes} from "../../utils/constants/snackBarTypes";
import {Colors} from "../../utils/constants/Colors";
import {Fonts} from "../../utils/constants/Fonts";
import {ActionWrapper} from "../../components/PageLayout/ActionWrapper";
import {FormHeader} from "../../components/FormLayout/FormHeader";
import {FieldWrapper} from "../../components/FormLayout/FieldWrapper";
import {FieldName} from "../../components/FormLayout/FieldName";
import {ButtonWrapper} from "../../components/FormLayout/ButtonWrapper";
import {Add, ArrowCircleLeftRounded, Edit} from "@mui/icons-material";
import {
    getFormTemplateByType, getFormTemplatesByGapReqId,
    handleAuditForm,
    saveFormDataWithValues, saveGapDataWithValues,
    updateAuditForm, updateGapDataWithValues
} from "../../redux/actions/auditForm/action";
import CommonQuestionList from "./../../pages/AuditForm/CommonQuestionList";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DataGrid} from "@mui/x-data-grid";
import {handleFarmLand, updateFarmLand} from "../../redux/actions/farmLand/action";
import Checkbox from "@mui/material/Checkbox";
import FileUploadDynamic from "./FileUploadDynamic";

const DynamicFormGap = ({
                         auditFormType = '',
                         afterSave
                     }) => {
    useUserAccessValidation();
    const {state} = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    let uriPath = '';
    let formHeader = '';

    const [formData, setFormData] = useState(state?.target || {});
    const [saving, setSaving] = useState(false);
    const [formTemplate, setFormTemplate] = useState({});
    const [ds, setDs] = useState([]);
    const [gn, setGn] = useState([]);
    const [soilType, setSoilType] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [protectedHouseType, setProtectedHouseType] = useState(true);
    const [otherField, setOtherField] = useState("none");

    const { addSnackBar } = useSnackBars();

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const goBack = () => {
        navigate("/farm-land");
    };

    const handleChange = (value, target) => {
        setFormData((current = {}) => {
            let newData = { ...current };
            newData[target] = value;
            return newData;
        });
    };

    const resetForm = () => {
        if (state?.action === DEF_ACTIONS.EDIT) {
            setFormData(state?.target || {});
        } else {
            setFormData({});
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

    const onSuccessSave = async (response) => {
        console.log('response after sacve', response );

        const id = response?.payload?.id;

        console.log('form ', formData);

        const auditAnswers = [];
        const keysArray = Object.keys(formData);
        //console.log('keysArray ', keysArray);

        for (const qKey of keysArray) {
            console.log(qKey);
            if (qKey.indexOf('question_') !== -1) {
                const parts = qKey.split('_');
                const questionId = parts[1];
                const answer = formData[qKey];
                auditAnswers.push({
                    question: {
                        id: questionId
                    },
                    answer: answer,
                    proofDocs: []
                });
            }

        }
        console.log('auditAnswers ', auditAnswers);


        const updateData = {
            id: id,
            templateId: formTemplate.id,
            auditId: formData.auditId,
            gapRequestDto: {
                id: 1
            },
            description: 'test desc',
            auditCategory: formData.auditCategory,
            auditSubCategory: formData.auditSubCategory,
            auditAnswers: auditAnswers
        }

        try {
            //if (formData?.id) {
                await updateGapDataWithValues(id, 1, uriPath, updateData, onSuccess, onError);
            //}
        } catch (error) {
            console.log(error);
        }

/*        addSnackBar({
                        type: SnackBarTypes.success,
                        message:
                            state?.action === DEF_ACTIONS.ADD
                            ? "Successfully Added"
                            : "Successfully Updated",
                    });
        setSaving(false);
        afterSave();*/
    };

    const onSuccess = async (response) => {
                addSnackBar({
                                type: SnackBarTypes.success,
                                message:
                                    state?.action === DEF_ACTIONS.ADD
                                    ? "Successfully Added"
                                    : "Successfully Updated",
                            });
                setSaving(false);
                afterSave();

    };

    const onError = (message) => {
        addSnackBar({
                        type: SnackBarTypes.error,
                        message: message || "Login Failed",
                    });
        setSaving(false);
    };

    const handleFormSubmit = async () => {
        if (enableSave()) {


            const saveData = {
                templateId: formTemplate.id,
                gapRequestDto: {
                    id: 1 // TODO
                }
            }

            setSaving(true);
            try {
                if (formData?.id) {
                    console.log('ERRRRRRRRRRR');
                } else {
                    await saveGapDataWithValues(1, uriPath, saveData, onSuccessSave, onError);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const populateAttributes = () => {

        if (auditFormType === 'SELF_ASSESSMENT') {
            uriPath = 'self-assessments';
            formHeader = 'SELF ASSESSMENT FORM';
        } else if (auditFormType === 'INTERNAL_AUDIT') {
            uriPath = 'internal-audit';
            formHeader = 'INTERNAL AUDIT FORM';
        } else if (auditFormType === 'EXTERNAL_AUDIT') {
            uriPath = 'external-audit';
            formHeader = 'EXTERNAL AUDIT FORM';
        } else if (auditFormType === 'BASIC_ASSESSMENT') {
            uriPath = 'basic-assessments';
            formHeader = 'BASIC ASSESSMENT FORM';
        }

    }

    populateAttributes();

    useEffect(() => {
        //question-form-template/type/" + type
        getFormTemplateByType(auditFormType).then(({data = {}}) => {
            //setDistrict(dataList);
            console.log('res ', data);
            setFormTemplate(data);
            console.log('formTemplate11 ', formTemplate);
        });
    }, []);

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
                                     onClick={handleFormSubmit}
                                     size="small"
                                     color="success"
                                 >
                                     {state?.action === DEF_ACTIONS.ADD ? <Add/> : <Edit/>}
                                     {/* {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"} */}
                                 </Button>
                                 <Button
                                     onClick={resetForm}
                                     color="success"
                                     variant="contained"
                                     size="small"
                                     sx={{marginLeft: "10px"}}
                                 >
                                     RESET11
                                 </Button>
                             </>
                         )}
                    </ActionWrapper>
                )}
            </ButtonWrapper>
            <Box sx={{padding: "20px"}}>
                <Grid
                    container
                    sx={{
                        border: "1px solid #bec0c2",
                        borderRadius: "5px",
                    }}
                >
                    <Grid item lg={5}>
                        <FieldWrapper>
                            <FieldName>Audit ID</FieldName>
                            <TextField
                                name="auditId"
                                id="auditId"
                                value={formData?.auditId || ""}
                                disabled={state?.action === DEF_ACTIONS.VIEW}
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
                                value={formData?.description || ""}
                                disabled={state?.action === DEF_ACTIONS.VIEW}
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
                                value={formData?.auditCategory || ""}
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                    handleChange(e?.target?.value || "", "auditCategory")
                                }
                                sx={{
                                    // width: "264px",
                                    // height: "30px",
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
                                value={formData?.auditSubCategory || ""}
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                onChange={(e) =>
                                    handleChange(e?.target?.value || "", "auditSubCategory")
                                }
                                sx={{
                                    // width: "264px",
                                    // height: "30px",
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
                    {formTemplate?.questionDTOS?.map((item, index) => (
                    <Grid item lg={6}>
                        <FieldWrapper>
                            <FieldName>{index + 1}. {item.questionString} ?</FieldName>

                            {item.questionType === 'TEXT' &&
                             <TextField
                                 name={"question_" + item.id}
                                 id={"question_" + item.id}
                                 value={formData?.['question_' + item.id] || ""}
                                 disabled={state?.action === DEF_ACTIONS.VIEW}
                                 onChange={(e) =>
                                     handleChange(e?.target?.value || "", "question_" + item.id)
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

                            {item.questionType === 'BOOLEAN' &&
                             <Checkbox
                                 name={"question_" + item.id}
                                 id={"question_" + item.id}
                                 value={formData?.['question_' + item.id] || ""}
                                 disabled={state?.action === DEF_ACTIONS.VIEW}
                                 onChange={(e) =>
                                     handleChange(e?.target?.value || "", "question_" + item.id)
                                 }
                                 checked={formData?.['question_' + item.id] === true}
                             />
                            }

                        </FieldWrapper>
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default DynamicFormGap;
