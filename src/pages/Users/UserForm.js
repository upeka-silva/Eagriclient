import React, {useState} from "react";
import Select from 'react-select';
import {
    TextField,
    Button,
    CircularProgress,
    MenuItem,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid, InputLabel, Autocomplete,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useUserAccessValidation} from "../../hooks/authentication";
import {useLocation, useNavigate} from "react-router";
import {DEF_ACTIONS} from "../../utils/constants/permission";
import {SnackBarTypes} from "../../utils/constants/snackBarTypes";
import {useSnackBars} from "../../context/SnackBarContext";
import RoleList from "./RolesList";
import ServicesList from "./ServicesList";
import data from "../../dropdown/drodwnlist"
import CascadingDropdown from "../../components/PageLayout/CascadingDropdown"
import {FormWrapper} from "../../components/FormLayout/FormWrapper";
import {FormHeader} from "../../components/FormLayout/FormHeader";
import {FieldWrapper} from "../../components/FormLayout/FieldWrapper";
import {FieldName} from "../../components/FormLayout/FieldName";
import {ButtonWrapper} from "../../components/FormLayout/ButtonWrapper";
import {AddButton} from "../../components/FormLayout/AddButton";
import {ResetButton} from "../../components/FormLayout/ResetButton";
import {PathName} from "../../components/FormLayout/PathName";

import {ActionWrapper} from "../../components/PageLayout/ActionWrapper";
import {handleUsers, updateUsers} from "../../redux/actions/users/action";

import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FilterTypeFilter from "../../components/FilterTypeFilter/FilterTypeFilter";

const UsersForm = () => {
    // const data = {
    //     "province": {
    //         "displayName": "Province",
    //         "apiCall": true,
    //         "links": null
    //     },
    //     "district": {
    //         "displayName": "District",
    //         "apiCall": true,
    //         "links": null
    //     },
    //     "AIRegionProvincial": {
    //         "displayName": "AI Region",
    //         "apiCall": true,
    //         "links": [
    //             "deputiyDirOfAgriProvincial",
    //             "ADASegmantProvincial"
    //         ]
    //     },
    //     "AIRegionInterProvincial": {
    //         "displayName": "AI Region",
    //         "apiCall": true,
    //         "links": [
    //             "deputiyDirOfAgriProvincial",
    //             "ADASegmantInterProvincial"
    //         ]
    //     },
    //     "GNDivision": {
    //         "displayName": "GN Division",
    //         "apiCall": true,
    //         "links": [
    //             "district",
    //             "DSDivision"
    //         ]
    //     },
    //     "DSDivision": {
    //         "displayName": "DS Division",
    //         "apiCall": false,
    //         "links": [
    //             "district"
    //         ]
    //     },
    //     "ADASegmantProvincial": {
    //         "displayName": "ADA Segmant Provincial",
    //         "apiCall": false,
    //         "links": [
    //             "deputiyDirOfAgriProvincial"
    //         ]
    //     },
    //     "ADASegmantInterProvincial": {
    //         "displayName": "ADA Segmant Inter Provincial",
    //         "apiCall": false,
    //         "links": [
    //             "deputiyDirOfAgriInterProvincial"
    //         ]
    //     },
    //     "deputiyDirOfAgriProvincial": {
    //         "displayName": "Deputiy Director Of Agriculture Provincial",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "deputiyDirOfAgriInterProvincial": {
    //         "displayName": "Deputiy Director Of Agriculture Inter Provincial",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "mahaweliUnit": {
    //         "displayName": "Mahaweli Unit",
    //         "apiCall": false,
    //         "links": [
    //             "mahaweliSystems",
    //             "block"
    //         ]
    //     },
    //     "block": {
    //         "displayName": "Block",
    //         "apiCall": false,
    //         "links": [
    //             "mahaweliSystems"
    //         ]
    //     },
    //     "mahaweliSystems": {
    //         "displayName": "Mahaweli Systems",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "ARPADivision": {
    //         "displayName": "ARPA Division",
    //         "apiCall": false,
    //         "links": [
    //             "districtCommisioner",
    //             "ASCDivision",
    //         ]
    //     },
    //     "ASCDivision": {
    //         "displayName": "ASC Division",
    //         "apiCall": false,
    //         "links": [
    //             "districtCommisioner"
    //         ]
    //     },
    //     "districtCommisioner": {
    //         "displayName": "District Commisioner",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "deptOfAgrarianDevelopment": {
    //         "displayName": "Department Of Agrarian Development",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "mahaweliAuthority": {
    //         "displayName": "Mahaweli Authority",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "directorDOA": {
    //         "displayName": "Director DOA",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "provincialDirectorOfAgri": {
    //         "displayName": "Provincial Director Of Agriculture",
    //         "apiCall": false,
    //         "links": null
    //     },
    //     "agroEcologicalZones": {
    //         "displayName": "Agro Ecological Zones",
    //         "apiCall": false,
    //         "links": null
    //     }
    // }
    useUserAccessValidation();
    const {state} = useLocation();
    const location = useLocation();
    const {addSnackBar} = useSnackBars();
    const dateAdapter = new AdapterDayjs();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ...(state?.target || {}),
        startDate: state?.target?.startDate
            ? dateAdapter.date(state?.target?.startDate)
            : null,
        endDate: state?.target?.endDate
            ? dateAdapter.date(state?.target?.endDate)
            : null,
    });
    const [saving, setSaving] = useState(false);
    const [selectRoles, setSelectRoles] = useState([]);
    const [selectServices, setSelectServices] = useState([]);
    const [val, setVal] = useState(null)
    const goBack = () => {
        navigate("/users");
    };
    const [parentLinks, setParentLinks] = useState([]);
    const [parentFilter, setParentFilter] = useState(null);
    const [originalPath, setOriginalPath] = useState(null);
    const [view, setView] = useState(false)
    const [isview, setIsview] = useState(false);
    const handleChange = (value, target) => {
        setFormData((current = {}) => {
            let newData = {...current};

            // Special handling for the "roleDTOs" field to update the "id" value

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

    const onSuccess = () => {
        addSnackBar({
            type: SnackBarTypes.success,
            message:
                state?.action === DEF_ACTIONS.ADD
                    ? "Successfully Added"
                    : "Successfully Updated",
        });
        setSaving(false);
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
            setSaving(true);

            let firstName = new Date(formData.firstName);
            let lastName = new Date(formData.lastName);

            try {
                if (formData?.id) {
                    await updateUsers(
                        {
                            ...formData,
                        },
                        onSuccess,
                        onError
                    );
                } else {
                    await handleUsers(
                        {
                            ...formData,
                            startDate: firstName.valueOf() || null,
                            endDate: lastName.valueOf() || null,
                            roleDTOs: selectRoles,
                            serviceDTO: selectServices,
                        },
                        onSuccess,
                        onError
                    );
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getPathName = () => {
        return location.pathname === "/" || !location.pathname
            ? ""
            : location.pathname;
    };

    const toggleRolesSelect = (component) => {
        setSelectRoles((current = []) => {
            let newList = [...current];
            let index = newList.findIndex((c) => c?.id === component?.id);
            if (index > -1) {
                newList.splice(index, 1);
            } else {
                newList.push(component);
            }
            return newList;
        });
    };

    const selectAllRoles = (all = []) => {
        setSelectRoles(all);
    };

    const resetSelectedRoles = () => {
        setSelectRoles([]);
    };
    // console.log(selectRoles)

    const handleAdvanceDataChange = (value) => {
        //   console.log('sssss ', value);
        setOriginalPath(value);
        const curFilter = data[value];
        setParentFilter(curFilter);
        setParentLinks(curFilter.links);
        setView(!view);
        setIsview(true);
        setVal(value)


    };

    const toggleServicesSelect = (component) => {
        setSelectServices((current = []) => {
            let newList = [...current];
            let index = newList.findIndex((c) => c?.id === component?.id);
            if (index > -1) {
                newList.splice(index, 1);
            } else {
                newList.push(component);
            }
            return newList;
        });
    };
    const reset = () => {

        setVal(null)
        setParentFilter(null)

        setView(!view);
    }
    const selectAllServices = (all = []) => {
        setSelectServices(all);
    };

    const resetSelectedServices = () => {
        setSelectServices([]);
    };
    // console.log(selectServices)
    return (
        <FormWrapper>
            <ActionWrapper isLeft>
                <Button startIcon={<ArrowBackIcon/>} onClick={goBack}>
                    Go back to users list
                </Button>
            </ActionWrapper>
            <PathName>{getPathName()}</PathName>
            <FormHeader>
                {saving && <CircularProgress size={20} sx={{mr: "8px"}}/>}
                {state?.action} New User
            </FormHeader>
            <ButtonWrapper style={{
                width: "95%",
                justifyContent: "flex-start",
                margin: "0",
                paddingLeft: "18px",
            }}>
                {state?.action !== DEF_ACTIONS.VIEW && (
                    <ActionWrapper>
                        {saving ? (
                            <AddButton variant="contained" disabled>
                                {state?.action === DEF_ACTIONS.ADD
                                    ? "ADDING..."
                                    : "UPDATING..."}
                            </AddButton>
                        ) : (
                            <>
                                <AddButton
                                    variant="contained"
                                    disabled={!enableSave()}
                                    onClick={handleFormSubmit}
                                >
                                    {state?.action === DEF_ACTIONS.ADD ? "ADD" : "UPDATE"}
                                </AddButton>
                                <ResetButton onClick={resetForm}>RESET</ResetButton>
                            </>
                        )}
                    </ActionWrapper>
                )}
            </ButtonWrapper>
            <Grid
                container
                sx={{
                    border: "1px solid #bec0c2",
                    margin: "15px",
                    width: "97%",
                    borderRadius: "5px",
                }}
            >
                <Grid item lg={3}>
                    <FieldWrapper>
                        <FieldName>First name</FieldName>
                        <TextField
                            name="firstName"
                            id="firstName"
                            value={formData?.firstName || ""}
                            fullWidth
                            disabled={
                                state?.action === DEF_ACTIONS.VIEW ||
                                state?.action === DEF_ACTIONS.EDIT
                            }
                            onChange={(e) => handleChange(e?.target?.value || "", "firstName")}
                            sx={{
                                // width: "264px",
                                "& .MuiInputBase-root": {
                                    // height: "30px",
                                    borderRadius: "8px",
                                },
                            }}
                        />
                    </FieldWrapper>
                </Grid>
                <Grid item lg={3}>
                    <FieldWrapper>
                        <FieldName>Last name</FieldName>
                        <TextField
                            name="lastName"
                            id="lastName"
                            value={formData?.lastName || ""}
                            fullWidth
                            disabled={state?.action === DEF_ACTIONS.VIEW}
                            onChange={(e) => handleChange(e?.target?.value || "", "lastName")}
                            sx={{
                                // width: "264px",
                                "& .MuiInputBase-root": {
                                    // height: "30px",
                                    borderRadius: "8px",
                                },
                            }}
                            size="small"
                        />
                    </FieldWrapper>
                </Grid>
                <Grid item lg={2}>
                    <FieldWrapper>
                        <FieldName>Date of Birth</FieldName>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DatePicker
                                name="dob"
                                id="dob"
                                disabled={state?.action === DEF_ACTIONS.VIEW}
                                slotProps={{textField: {size: "small"}}}
                                value={formData?.dob || ""}
                                onChange={(newValue) => handleChange(newValue || "", "startDate")}
                                in="DD-MM-YYYY"
                                sx={{
                                    // width: "246px",
                                    "& .MuiInputBase-root": {
                                        // height: "30px",
                                        borderRadius: "8px",
                                    },
                                }}
                            />

                        </LocalizationProvider>
                    </FieldWrapper>
                </Grid>
                <Grid item lg={3}>
                    <FieldWrapper>
                        <FieldName>Password</FieldName>
                        <TextField
                            name="password"
                            id="password"
                            value={formData?.password || ""}
                            fullWidth
                            disabled={state?.action === DEF_ACTIONS.VIEW}
                            onChange={(e) => handleChange(e?.target?.value || "", "password")}
                            sx={{
                                // width: "264px",
                                "& .MuiInputBase-root": {
                                    // height: "30px",
                                    borderRadius: "8px",
                                },
                            }}
                            size="small"
                        />
                    </FieldWrapper>
                </Grid>
                <Grid item lg={3}>
                    <FieldWrapper>
                        <FieldName>Verify password</FieldName>
                        <TextField
                            name="matchingPassword"
                            id="matchingPassword"
                            value={formData?.matchingPassword || ""}
                            fullWidth
                            disabled={state?.action === DEF_ACTIONS.VIEW}
                            onChange={(e) =>
                                handleChange(e?.target?.value || "", "matchingPassword")
                            }
                            sx={{
                                // width: "264px",
                                "& .MuiInputBase-root": {
                                    // height: "30px",
                                    borderRadius: "8px",
                                },
                            }}
                            size="small"
                        />
                    </FieldWrapper>
                </Grid>
                <Grid item lg={3}>
                    <FieldWrapper>
                        <FieldName>Email</FieldName>
                        <TextField
                            name="email"
                            id="email"
                            value={formData?.email || ""}
                            fullWidth
                            disabled={state?.action === DEF_ACTIONS.VIEW}
                            onChange={(e) => handleChange(e?.target?.value || "", "email")}
                            sx={{
                                // width: "264px",
                                "& .MuiInputBase-root": {
                                    // height: "30px",
                                    borderRadius: "8px",
                                },
                            }}
                            size='small'
                        />
                    </FieldWrapper>
                </Grid>
                <Grid item lg={5}>
                    <FieldWrapper>

                        {/* <FormControl
          component="fieldset"
          fullWidth
          sx={{ width: "264px", borderRadius: "8px"  }}
        > */}
                        {/*<RadioGroup*/}
                        {/*  name="roleDTOs"*/}
                        {/*  id="roleDTOs"*/}
                        {/*  value={formData.roleDTOs ? formData.roleDTOs[0].id.toString() : ""}*/}
                        {/*  onChange={(e) => handleChange(e.target.value, "roleDTOs")}*/}
                        {/* row*/}
                        {/*>*/}
                        {/*  <FormControlLabel*/}
                        {/*    value="1"*/}
                        {/*    control={<Radio />}*/}
                        {/*    label="SUPER ADMIN"*/}
                        {/*    disabled={state?.action === DEF_ACTIONS.VIEW}*/}
                        {/*  />*/}
                        {/*  <FormControlLabel*/}
                        {/*    value="2"*/}
                        {/*    control={<Radio />}*/}
                        {/*    label="SYSTEM USER"*/}
                        {/*    disabled={state?.action === DEF_ACTIONS.VIEW}*/}
                        {/*  />*/}
                        {/*  <FormControlLabel*/}
                        {/*    value="3"*/}
                        {/*    control={<Radio />}*/}
                        {/*    label="ADMIN"*/}
                        {/*    disabled={state?.action === DEF_ACTIONS.VIEW}*/}
                        {/*  />*/}
                        {/*</RadioGroup>*/}
                        {/* </FormControl> */}
                    </FieldWrapper>
                </Grid>
            </Grid>
            <Grid
                container
                sx={{
                    border: "1px solid #bec0c2",
                    margin: "15px",
                    width: "97%",
                    borderRadius: "5px",
                }}
            >
                <Grid item lg={3}>
                    <FieldWrapper>



                        <FormControl sx={{ display: "flex", justifyContent: "row", minWidth: "364px" }} size="small">
                            <FieldName>Filter type</FieldName>
                            <Autocomplete
                                id="dropdown"
                                isDisabled={view}
                                options={Object.keys(data).map((key) => ({
                                    value: key,
                                    label: data[key].displayName,
                                }))}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, selectedOption) => handleAdvanceDataChange(selectedOption?.value)}
                                value={{ value: val, label: data[val]?.displayName || "Choose an option" }}
                                isSearchable
                                renderInput={(params) => <TextField {...params} />}
                                sx={{
                                    borderRadius: "8px",
                                    '& .MuiInputBase-root': {
                                        backgroundColor: 'transparent', // Set the background color to transparent
                                    },
                                }}
                            />
                        </FormControl>

                    </FieldWrapper>


                </Grid>

                <Grid item lg={1}>

                    <FieldWrapper>
                        {parentFilter != null && (
                            <FilterTypeFilter data={data} originalPath={originalPath} parentLinks={parentLinks}
                                              parentFilter={parentFilter} currentLinkIndex={0} apiResponse={null}
                                              curSelectedVal={null} nextResponse={null}/>
                        )}
                    </FieldWrapper>


                </Grid>
                <Grid item lg={3}>


                </Grid>
                <Grid item lg={4}>
                    {isview &&
                    <div style={{display: 'flex',float:"right",marginTop:"30px",marginLeft:"130px",justifyContent: 'flex-end'}}>
                        <ResetButton onClick={reset} sx={{marginTop: '15px'}}>RESET</ResetButton>
                    </div>

                    }
                </Grid>

            </Grid>
            <Grid
                container
                sx={{
                    border: "1px solid #bec0c2",
                    margin: "15px",
                    width: "97%",
                    borderRadius: "5px",
                }}
            >
                <Grid item lg={3}>
                    <RoleList
                        selectedRows={selectRoles}
                        onRowSelect={toggleRolesSelect}
                        selectAll={selectAllRoles}
                        unSelectAll={resetSelectedRoles}
                    />

                </Grid>
                <Grid item lg={5}>
                    <ServicesList
                        selectedRows={selectServices}
                        onRowSelect={toggleServicesSelect}
                        selectAll={selectAllServices}
                        unSelectAll={resetSelectedServices}/>
                </Grid>
            </Grid>
        </FormWrapper>
    );
};

export default UsersForm;
