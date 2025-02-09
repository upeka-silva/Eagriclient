import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Box,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { ButtonWrapper } from "../../components/FormLayout/ButtonWrapper";
import { FieldName } from "../../components/FormLayout/FieldName";
import { FieldWrapper } from "../../components/FormLayout/FieldWrapper";
import HorizontalStepper from "../../components/HorizontalStepper/HorizontalStepper";
import MultiItemSelect from "../../components/MultiItemSelector/MultiItemSelectorComponent";
import PageHeader from "../../components/PageHeader/PageHeader";
import { ActionWrapper } from "../../components/PageLayout/ActionWrapper";
import DialogBox from "../../components/PageLayout/DialogBox";
import PermissionWrapper from "../../components/PermissionWrapper/PermissionWrapper";
import { useSnackBars } from "../../context/SnackBarContext";
import { useUserAccessValidation } from "../../hooks/authentication";
import {
  getAllAssessmentsByFarmLandId,
  getFarmLandByFarmerId,
} from "../../redux/actions/farmLand/action";
import {
  addGapRequestAction,
  changeStatus,
  deleteCropDetails,
  getCropDetailsList,
  getGapCertificate,
  getNextGapId,
  getUsersByAdministrativeDivisionAndValue,
  get_GapRequestActionList,
  handleGap,
  saveGapExternalAuditores,
  updateGap,
  uploadOtherCertificate,
} from "../../redux/actions/gap/action";
import { gapReqDto } from "./gap-type";
import { get_GnDivisionList } from "../../redux/actions/gnDivision/action";
import {
  get_FarmersListByScsRegionId,
  get_ScsRegionList,
} from "../../redux/actions/scsRegion/action";
import { get_SoilType } from "../../redux/actions/soil/soilType/action";
import { get } from "../../services/api";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";
import { DEF_ACTIONS, DEF_COMPONENTS } from "../../utils/constants/permission";
import { SnackBarTypes } from "../../utils/constants/snackBarTypes";
import {
  getUserPermissionByComponent,
  getUserPermissionStateByAuthority,
} from "../../utils/helpers/permission";
import DynamicFormListGap from "../DynamicFormGap/DynamicFormListGap";
import AddCropDetailsDialog from "./AddCropDetailsDialog";
import CropDetailsList from "./CropDetails/CropDetailsList";
import GapRequestCertificate from "./GapRequestCertificate/GapRequestCertificate";
import { useAuthContext } from "../../context/AuthContext";
import GapRequestActionsButtons from "./GapRegActionsButtons";
import GapRegActionList from "../Gap/GapRegActionList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import {
  TabButton,
  TabContent,
  TabWrapper,
} from "../../components/TabButtons/TabButtons";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";

const label = { inputProps: { "aria-label": "Switch demo" } };

const GapRegForm = () => {
  useEffect(() => {
    getUserPermissionByComponent(DEF_COMPONENTS.CROP_AREA).then((r) => {
      setCropAreaPermission(r);
    });
    getUserPermissionByComponent(DEF_COMPONENTS.INTERNAL_AUDIT).then((r) => {
      setIntAuditPermission(r);
    });
    getUserPermissionByComponent(DEF_COMPONENTS.EXTERNAL_AUDIT).then((r) => {
      console.log(r);
      setExtAuditPermission(r);
    });
    getUserPermissionByComponent("TEST").then((r) => {
      setTestPermission(r);
    });
    getUserPermissionByComponent(DEF_COMPONENTS.GAP_CERTIFICATE_REQUEST).then(
      (r) => {
        setCertificatePermission(r);
      }
    );
  }, []);

  const [cropAreaPermission, setCropAreaPermission] = useState();
  const [intAuditPermission, setIntAuditPermission] = useState();
  const [extAuditPermission, setExtAuditPermission] = useState();
  const [certificatePermission, setCertificatePermission] = useState();

  const [testPermission, setTestPermission] = useState();

  const [openApproveDialog, setOpenApproveDialog] = useState({
    open: false,
    option: "",
  });

  useUserAccessValidation();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(state?.target || gapReqDto);
  const [saving, setSaving] = useState(false);
  const [gn, setGn] = useState([]);
  const [farmerList, setFarmerList] = useState([]);
  const [scsRegionList, setScsRegionList] = useState([]);
  const [farmerLandList, setFarmerLandList] = useState([]);
  const [soilType, setSoilType] = useState([]);
  const [toggleState, setToggleState] = useState(1);
  const [tabEnabled, setTabInabled] = useState(true);

  const [enablePreGAPReqNo, setEnablePreGAPReqNo] = useState(false);
  const [enableOtherBusinessNature, setEnableOtherBusinessNature] =
    useState(false);
  const [enableOtherCeritications, setEnableOtherCeritications] =
    useState(false);
  const [enableOtherFertilizerMgt, setEnableOtherFertilizerMgt] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedCrop, setSelectedCrop] = useState([]);
  const [selectedCropData, setSelectedCropData] = useState([]);

  const [dialogSelectedCrop, setDialogSelectedCrop] = useState([]);

  const [cropList, setCropList] = useState([]);
  console.log({cropList})
  const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);
  const [cdFormData, setCdFormData] = useState({ gapRequestDto: formData });
  const [cdAction, setCdAction] = useState(DEF_ACTIONS.ADD);
  const [refreshCList, setRefreshCList] = useState(false);
  const [openDeleteCropDetail, setOpenDeleteCropDetail] = useState(false);

  const [statusLoading, setStatusLoading] = useState(false);

  const initStatus = {
    lblState: "DRAFT",
    lblText: "Draft",
    lblColor: "primary",
  };

  const [gapReqStatus, setGapReqStatus] = useState(initStatus);
  const [stateResponse, setStateResponse] = useState("");
  const [openConfSubmit, setOpenConfSubmit] = useState(false);

  const [inputScsRegionCategory, setInputScsRegionCategory] = useState("");
  const [inputFarmerCategory, setInputFarmerCategory] = useState("");
  const [inputFarmLandCategory, setInputFarmLandCategory] = useState("");
  const [inputBasicAssesmentCategory, setInputBasicAssesmentCategory] =
    useState("");

  const [rejectReason, setRejectReason] = useState("");
  const [gapReqActionList, setGapReqActionList] = useState([]);

  const [basicAssessments, setBasicAssessments] = useState([]);

  const [isAuditorsAssignDialogOpen, setIsAuditorsAssignDialogOpen] =
    useState(false);

  const [auditores, setAuditores] = useState([]);

  const [isCertificateGenerating, setIsCertificateGenerating] = useState(false);

  const [file, setFile] = useState();
  const [iconColor, setIconColor] = useState("gray");
  const [otherCertificateImg, setOtherCertificateImg] = useState(null);
  const [OtherCertificateFileType, setOtherCertificateFileType] =
    useState(null);

  const [openOtherCertificateDialog, setOpenOtherCertificateDialog] =
    useState(false);

  const [nextGapId, setNextGapId] = useState("");

  const handleCloseOtherCertificateDialog = () => {
    setOpenOtherCertificateDialog(false);
  };

  const { addSnackBar } = useSnackBars();

  const { role } = useAuthContext();

  const auditorsAssignDialogHandler = () => {
    setIsAuditorsAssignDialogOpen(false);
  };

  const auditorsAssignDialogValuesHandler = (selectedValues) => {
    for (const value of selectedValues) {
      const payload = {
        user: { id: value.id },
        gapRequest: { id: formData?.id },
      };
      saveGapExternalAuditores(formData?.id, payload);
    }

    setIsAuditorsAssignDialogOpen(false);
  };

  const generateCertificate = () => {
    setIsCertificateGenerating(true);
    getGapCertificate(formData?.id).then((response) => {
      setIsCertificateGenerating(false);
      if (response) {
        const url = window.URL.createObjectURL(
          new Blob([response], { type: "application/pdf" })
        );

        const pdfWindow = window.open();
        pdfWindow.location.href = url;
      }
    });
  };

  const toggleTab = (index) => {
    setToggleState(index);
    console.log(index);
  };

  useEffect(() => {
    if (state && state.tabIndex) {
      setToggleState(state.tabIndex);
    }
    if (state?.action === DEF_ACTIONS.ADD) {
      randomIdGenerator();
    }
  }, [state]);

  const randomIdGenerator = async () => {
    const generatedId = await getNextGapId();
    setNextGapId(generatedId);
  };

  const goBack = () => {
    navigate("/gap/gap-registration");
  };

  useEffect(() => {
    setLoading(true);

    getUsersByAdministrativeDivisionAndValue(
      formData?.scsRegionDTO?.id,
      "SCSBRANCH"
    ).then((data = []) => {
      setAuditores(data);
    });

    get_GnDivisionList().then(({ dataList = [] }) => {
      setGn(dataList);
    });

    get_ScsRegionList().then(({ dataList = [] }) => {
      setScsRegionList(dataList);
    });

    get_SoilType()
      .then(({ dataList = [] }) => {
        setSoilType(dataList);
      })
      .catch(() => {
        setSoilType([]);
      });

    setLoading(false);

    if (
      state?.action === DEF_ACTIONS.EDIT ||
      state?.action === DEF_ACTIONS.VIEW
    ) {
      setTabInabled(false);
      const fetchGapReq = async (path, id) => {
        try {
          const { payload } = await get(`${path}/${id}`, true);
          setFormData(payload);

          const { actionList } = await get_GapRequestActionList(id);
          setGapReqActionList(actionList);

          const statusColor =
            payload.status === "SUBMITTED" ? "success" : "primary";
          setGapReqStatus({
            lblState: payload.status,
            lblText: payload.statusClient,
            lblColor: statusColor,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchGapReq("gap-request", formData?.id);
      get_GapRequestActionList(formData?.id);

      if (formData?.appliedGapBefore) {
        setEnablePreGAPReqNo(true);
      }

      if (formData?.otherCertificateDocStoredFileName) {
        setEnableOtherCeritications(true);
      }
    }
  }, []);

  const changeGapReqStatus = async (statusToSave) => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      try {
        if (formData?.id) {
          setStatusLoading(true);
          const resValue = await changeStatus(
            formData?.id,
            statusToSave,
            rejectReason,
            onSuccess,
            onError
          );

          setStateResponse(resValue.payload);
          console.log(resValue);
          setGapReqStatus({
            lblState: resValue.payload.name,
            lblText: resValue.payload.label,
            lblColor: "success",
          });
          setOpenConfSubmit(false);
          setStatusLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (value, target) => {
    if (target === "hasOtherCertificates" && !value) {
      setFormData((prevState) => ({
        ...prevState,
        otherCertificateDocOriginalFileName: "",
        otherCertificateDocPresignedUrl: "",
        otherCertificateDocStoredFileName: "",
        otherCertificateDocExpireDate: null,
      }));
    }

    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });

    if (target === "appliedGapBefore") {
      setEnablePreGAPReqNo(value);
    }

    if (target === "appliedGapBefore" && !value) {
      setFormData((prevState) => ({ ...prevState, previousGapReqNo: "" }));
    }

    if (target === "businessNature") {
      setEnableOtherBusinessNature(value === "OTHER");
    }

    if (target === "hasOtherCertificates") {
      setEnableOtherCeritications(value);
    }

    if (target === "fertilizerMangeOther") {
      setEnableOtherFertilizerMgt(value);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIconColor("primary");
      setOtherCertificateImg(URL.createObjectURL(file));

      const fileType = getFileType(file);
      setOtherCertificateFileType(fileType);

      const form = new FormData();
      form.append("file", file);
      setFile(form);
    }
  };

  const getFileType = (file) => {
    // Get the file extension
    const extension = getFileExtension(file.name);
    // Check if it's an image, pdf, or word document
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return "image";
    } else if (extension === "pdf") {
      return "pdf";
    } else if (["doc", "docx"].includes(extension)) {
      return "word";
    }
    return null; // Unknown file type
  };

  useEffect(() => {
    // Determine file type based on file extension
    const fileExtension = getFileExtension(
      formData.otherCertificateDocStoredFileName ||
        formData.otherCertificateDocOriginalFileName ||
        ""
    );
    const fileType = getFileTypeFromExtension(fileExtension);
    setOtherCertificateFileType(fileType);
  }, [
    formData.otherCertificateDocStoredFileName,
    formData.otherCertificateDocOriginalFileName,
  ]);

  // Function to get file extension
  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toLowerCase();
  };

  // Function to determine file type from extension
  const getFileTypeFromExtension = (extension) => {
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return "image";
    } else if (
      extension === "pdf" ||
      extension === "doc" ||
      extension === "docx"
    ) {
      return extension; // Return the file extension directly for PDF and Word documents
    }
    return null; // Unknown file type
  };

  const handlePreview = () => {
    if (OtherCertificateFileType === "image") {
      setOpenOtherCertificateDialog(true); // Open modal for image preview
    } else if (
      OtherCertificateFileType === "pdf" ||
      OtherCertificateFileType === "word"
    ) {
      window.open(
        otherCertificateImg != null
          ? otherCertificateImg
          : formData.otherCertificateDocPresignedUrl,
        "_blank"
      ); // Open in a new browser tab
    }
  };

  const resetForm = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      setFormData(state?.target || {});
    } else {
      setFormData({});
    }
  };

  const setSubmitted = async () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      try {
        if (formData?.id) {
          setStatusLoading(true);
          const resValue = await changeStatus(
            formData?.id,
            "SUBMITTED",
            rejectReason,
            onSuccess,
            onError
          );

          setStateResponse(resValue.payload);
          console.log(resValue);
          setGapReqStatus({
            lblState: resValue.payload.name,
            lblText: resValue.payload.label,
            lblColor: "success",
          });
          setOpenConfSubmit(false);
          setStatusLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const enableSave = () => {
    if (state?.action === DEF_ACTIONS.EDIT) {
      console.log(`state target ${JSON.stringify(state.target)}`);
      console.log(`formdata ${JSON.stringify(state.formData)}`);
      if (
        JSON.stringify(state?.target || {}) !== JSON.stringify(formData) ||
        file != null
      ) {
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

  const onSuccess = (gapReqId) => {
    console.log("gap req id " + gapReqId);
    addSnackBar({
      type: SnackBarTypes.success,
      message:
        state?.action === DEF_ACTIONS.ADD
          ? "Successfully Added"
          : "Successfully Updated",
    });
    setSaving(false);
    formData.id = gapReqId;
    setTabInabled(false);
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
      if (!formData.businessNature) {
        formData.businessNature = "OTHER";
      }
      if (!formData.irrigationMethod) {
        formData.irrigationMethod = "OTHER";
      }
      try {
        if (formData?.id) {
          const response = await updateGap(formData, onSuccess, onError);
          if (response && response?.payload) {
            const gapReqId = response.payload.id;
            const otherCertificate =
              response.payload.otherCertificateDocPresignedUrl;
            const hasOtherCertificate = response.payload.hasOtherCertificate;

            setFormData(response?.payload);
            await addGapRequestAction(response.payload.id, "UPDATED");

            if (gapReqId != null && otherCertificate != null && file != null) {
              await uploadOtherCertificate(gapReqId, file, onSuccess, onError);
            }
          }
        } else {
          const savedData = { ...formData, code: nextGapId };
          const response = await handleGap(savedData, onSuccess, onError);
          if (response && response.payload) {
            const gapReqId = response.payload.id;
            const hasOtherCertificate = response.payload.hasOtherCertificate;
            const otherCertificatePresignedUrl =
              response.payload.otherCertificatePresignedUrl;

            setFormData(response.payload);
            await addGapRequestAction(response.payload.id, "DRAFT");

            if (
              gapReqId != null &&
              otherCertificatePresignedUrl == null &&
              file != null
            ) {
              await uploadOtherCertificate(gapReqId, file, onSuccess, onError);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(`formdata: ${JSON.stringify(formData)}`);

  const getLandsByFarmerId = (id) => {
    getFarmLandByFarmerId(id).then(({ dataList = {} }) => {
      setFarmerLandList(dataList);
    });
  };

  const getFarmersByScsRegionId = (id) => {
    get_FarmersListByScsRegionId(id).then(({ dataList = [] }) => {
      setFarmerList(dataList);
    });
  };

  // Implementation Of Crop Details Tab

  const fetchCropAreaData = () => {
    getCropDetailsList(formData?.id).then(
      ({ dataList = {} }) => {
      setCropList(dataList);
    });
  };

  useEffect(() => {
    fetchCropAreaData();
  }, [refreshCList]);

  const toggleCropSelect = (component) => {
    console.log(component);
    setSelectedCrop(component);

    const selectedRowData = cropList?.filter((row) =>
      component.includes(row.id)
    );
    console.log("srows", selectedRowData);
    setSelectedCropData(selectedRowData);
  };

  const resetSelectedCropDetails = () => {
    setSelectedCrop([]);
    refreshCList();
  };

  const onCreateCropDetails = () => {
    setCdFormData({ gapRequestDto: formData });
    setCdAction(DEF_ACTIONS.ADD);
    setOpenCropAreaAddDlg(true);
  };
  const onEditCropDetails = () => {
    const data = cropList.filter((item) => item?.id === selectedCrop[0]);
    console.log(data[0]);

    setCdFormData({ ...data[0], gapRequestDto: formData });
    setCdAction(DEF_ACTIONS.EDIT);
    setOpenCropAreaAddDlg(true);
  };
  const onDeleteCropDetails = () => {
    setOpenDeleteCropDetail(true);
    setDialogSelectedCrop(selectedCropData);
  };

  const onViewCropDetails = () => {
    const data = cropList.filter((item) => item?.id === selectedCrop[0]);
    console.log(data[0]);

    setCdAction(DEF_ACTIONS.VIEW);
    setCdFormData({ ...data[0] });
    setOpenCropAreaAddDlg(true);
  };

  const refreshCropList = () => {
    setRefreshCList(!refreshCList);
  };

  const closeCropDetailsDlg = () => {
    setOpenCropAreaAddDlg(false);
  };

  const onConfirmDeleteCropDetail = async () => {
    try {
      setLoading(true);
      for (const id of selectedCrop) {
        await deleteCropDetails(formData?.id, id, onSuccessDelete, onError);
        setRefreshCList(!refreshCList);
      }
      setLoading(false);
      setOpenDeleteCropDetail(false);
      resetSelectedCropDetails();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: `Successfully Deleted`,
    });
  };

  const closeCropDelete = () => {
    setOpenDeleteCropDetail(false);
    setDialogSelectedCrop([]);
  };

  const renderSelectedItems = () => {
    return (
      <List>
        {selectedCrop.map((p, key) => {
          console.log(p);
          return (
            <ListItem>
              <ListItemIcon>
                {loading ? (
                  <CircularProgress size={16} />
                ) : (
                  <RadioButtonCheckedIcon color="info" />
                )}
              </ListItemIcon>
              <ListItemText>
                {p} - {p.ownerType}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const getAllAssessmentsByFLId = (id) => {
    getAllAssessmentsByFarmLandId(id)
      .then(({ dataList = {} }) => {
        setBasicAssessments(dataList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isRejectState = (state) => {
    return [
      "SCS_REGIONAL_OFFICER_REJECT",
      "REJECTED_BY_DD",
      "REJECTED_BY_MAIN_SCS",
    ].includes(state);
  };
  const isApproveState = (state) => {
    return [
      "APPROVED_BY_DD",
      "SCS_REGIONAL_OFFICER_APPROVE",
      "MAIN_SCS_REGIONAL_OFFICER_APPROVE",
      "GENERATE_CERTIFICATE",
      "SEND_CERTIFICATE",
      "EXTERNAL_AUDITOR_SUBMITTED",
      "SUBMITTED",
      "ASSIGN_AUDITORS",
      "DRAFT",
    ].includes(state);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        fontFamily: `${Fonts.fontStyle1}`,
        marginTop: "10px",
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <PageHeader
        saving={saving}
        state={state}
        formName="GAP Request"
        goBack={goBack}
      />
      <Grid container sx={{ marginTop: "10px", marginBottom: "10px" }}>
        <Grid
          item
          md={12}
          lg={12}
          sx={{
            paddingInline: "20px",
            backgroundColor: "#DCE7DB",
            display: "flex",
            alignItems: "center",
            paddingTop: "10px",
            border: "1px solid #40a845",
            borderRadius: "5px",
          }}
        >
          <HorizontalStepper gapReqStatus={gapReqStatus} />
        </Grid>
      </Grid>

      <TabContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack direction="row" spacing={1}>
          <ButtonWrapper
            style={{
              width: "95%",
              justifyContent: "flex-start",
              margin: "0",
              paddingLeft: "18px",
            }}
          >
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
                    <ButtonGroup>
                      <PermissionWrapper
                        permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.GAP_REQUEST}`}
                      >
                        {gapReqStatus.lblState === "SUBMITTED" ||
                        gapReqStatus.lblState === "APPROVED_BY_DD" ||
                        gapReqStatus.lblState ===
                          "SCS_REGIONAL_OFFICER_APPROVE" ||
                        gapReqStatus.lblState ===
                          "MAIN_SCS_REGIONAL_OFFICER_APPROVE" ? null : (
                          <Button
                            variant="contained"
                            disabled={!enableSave()}
                            onClick={handleFormSubmit}
                            size="small"
                            color="success"
                          >
                            {state?.action === DEF_ACTIONS.ADD
                              ? "SAVE"
                              : "UPDATE"}
                          </Button>
                        )}
                      </PermissionWrapper>

                      <PermissionWrapper
                        permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.GAP_REQUEST}`}
                      >
                        {gapReqStatus.lblState === "DRAFT" ||
                        gapReqStatus.lblState === "REJECTED_BY_DD" ||
                        gapReqStatus.lblState ===
                          "SCS_REGIONAL_OFFICER_REJECT" ||
                        gapReqStatus.lblState === "REJECTED_BY_MAIN_SCS" ? (
                          <Button
                            onClick={resetForm}
                            color="success"
                            variant="outlined"
                            size="small"
                            sx={{ marginLeft: "10px" }}
                          >
                            RESET
                          </Button>
                        ) : null}
                      </PermissionWrapper>
                    </ButtonGroup>
                    <PermissionWrapper
                      permission={`${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.GAP_BY_AI}`}
                    >
                      {gapReqStatus.lblState === "DRAFT" ||
                      gapReqStatus.lblState === "REJECTED_BY_DD" ||
                      gapReqStatus.lblState === "SCS_REGIONAL_OFFICER_REJECT" ||
                      gapReqStatus.lblState === "REJECTED_BY_MAIN_SCS" ? (
                        <Button
                          onClick={() => setOpenConfSubmit(true)}
                          color="success"
                          variant="outlined"
                          size="small"
                          sx={{ marginLeft: "10px" }}
                        >
                          SUBMIT
                        </Button>
                      ) : null}
                    </PermissionWrapper>

                    <GapRequestActionsButtons
                      role={role}
                      gapReqStatus={gapReqStatus}
                      setOpenApproveDialog={setOpenApproveDialog}
                      existingAuditores={formData?.externalAuditors}
                    />

                    <PermissionWrapper
                      permission={`${DEF_ACTIONS.ASSIGN}_${DEF_COMPONENTS.EXTERNAL_AUDITORS}`}
                    >
                      {gapReqStatus.lblState ===
                        "SCS_REGIONAL_OFFICER_REJECT" ||
                      gapReqStatus.lblState === "EXTERNAL_AUDITOR_SUBMITTED" ||
                      gapReqStatus.lblState ===
                        "SCS_REGIONAL_OFFICER_APPROVE" ? null : ( // role == "SCS_REGINAL_OFFICER" && gapReqStatus.lblState === "APPROVED_BY_DD" && formData?.externalAuditors != 0
                        <Button
                          onClick={() => {
                            setIsAuditorsAssignDialogOpen(true);
                          }}
                          color="success"
                          variant="outlined"
                          size="small"
                          sx={{ marginLeft: "10px" }}
                          disabled={gapReqStatus.lblState === "MAIN_SCS_REGIONAL_OFFICER_APPROVE"}
                        >
                          ASSIGN AUDITORS
                        </Button>
                      )}
                    </PermissionWrapper>

                    <PermissionWrapper
                      permission={`${DEF_ACTIONS.GENERATE}_${DEF_COMPONENTS.GAP_CERTIFICATE}`}
                    >
                      {gapReqStatus.lblState ===
                        "MAIN_SCS_REGIONAL_OFFICER_APPROVE" ||
                      gapReqStatus.lblState === "GENERATE_CERTIFICATE" ? (
                        <Button
                          onClick={() => {
                            generateCertificate();
                            changeGapReqStatus("GENERATE_CERTIFICATE");
                          }}
                          color="success"
                          variant="outlined"
                          size="small"
                          sx={{ marginLeft: "10px" }}
                        >
                          {isCertificateGenerating ? (
                            <>
                              Generate Certificate &nbsp;&nbsp;{" "}
                              <CircularProgress size="1rem" color="success" />
                            </>
                          ) : (
                            "Generate Certificate"
                          )}
                        </Button>
                      ) : null}
                    </PermissionWrapper>
                  </>
                )}
              </ActionWrapper>
            )}
          </ButtonWrapper>

          {/* Display Gap Registation Number  */}
          {formData?.gapRegistrationNumber ? (
            <Chip
              label={`Gap Registration Number : ${formData?.gapRegistrationNumber}`}
              variant="filled"
              style={{
                marginTop: "5px",
                color: "#ffffff",
                backgroundColor: "#2aaf70",
              }} //#2caf70 #4caf50
            />
          ) : null}

          {!statusLoading ? (
            <Chip
              label={gapReqStatus.lblText}
              variant="filled"
              style={{
                marginTop: "5px",
                backgroundColor: isRejectState(gapReqStatus.lblState)
                  ? "red"
                  : isApproveState(gapReqStatus.lblState)
                  ? "green"
                  : "default",
                color: "white",
              }}
            />
          ) : (
            <CircularProgress />
          )}
        </Stack>

        <Grid container spacing={0}>
          <Grid
            item
            sx={{
              display: "flex",
            }}
            lg={1}
          >
            <FieldWrapper>
              <FieldName
                style={{
                  width: "100%",
                }}
              >
                Renewal
              </FieldName>
              <Checkbox
                {...label}
                name="isRenewal"
                id="isRenewal"
                value={formData?.isRenewal || ""}
                onChange={(e) =>
                  handleChange(e?.target?.checked || false, "isRenewal")
                }
                checked={formData?.isRenewal}
                disabled={state?.action === DEF_ACTIONS.VIEW}
              />
            </FieldWrapper>
          </Grid>
          <Grid item sm={3} md={3} lg={2}>
            <FieldWrapper>
              <FieldName
                style={{
                  width: "100%",
                }}
              >
                GAP Request No
              </FieldName>
              <TextField
                name="code"
                id="code"
                value={
                  state?.action === DEF_ACTIONS.ADD ? nextGapId : formData?.code
                }
                disabled={
                  state?.action === DEF_ACTIONS.VIEW ||
                  state?.action === DEF_ACTIONS.EDIT ||
                  state?.action === DEF_ACTIONS.ADD
                }
                onChange={(e) => handleChange(e?.target?.value || "", "code")}
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
          <Grid item sm={12} md={6} lg={4}>
            <FieldWrapper>
              <FieldName>SCS Region</FieldName>
              {loading ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  key={formData?.scsRegionDTO}
                  id="scsRegionDTO"
                  isOptionEqualToValue={(option, value) =>
                    option.scsRegionId === value.scsRegionId
                  }
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  options={scsRegionList}
                  value={formData ? formData.scsRegionDTO : ""}
                  getOptionLabel={(i) => `${i.scsRegionId} - ${i.name}`}
                  inputValue={inputScsRegionCategory}
                  onInputChange={(event, newInputValue) => {
                    setInputScsRegionCategory(newInputValue);
                  }}
                  onChange={(event, value) => {
                    handleChange(value, "scsRegionDTO");
                    getFarmersByScsRegionId(value?.id);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              )}
            </FieldWrapper>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <FieldWrapper>
              <FieldName>Farmer</FieldName>
              {loading ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  key={formData?.farmerDTO}
                  id="farmerDTO"
                  disabled={
                    state?.action === DEF_ACTIONS.VIEW ||
                    formData?.scsRegionDTO == null
                  }
                  options={farmerList}
                  value={formData ? formData.farmerDTO : ""}
                  getOptionLabel={(i) =>
                    `${i.farmerId} - ${i.firstName} ${i.lastName}`
                  }
                  inputValue={inputFarmerCategory}
                  onInputChange={(event, newInputValue) => {
                    setInputFarmerCategory(newInputValue);
                  }}
                  onChange={(event, value) => {
                    handleChange(value, "farmerDTO");
                    getLandsByFarmerId(value?.id);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              )}
            </FieldWrapper>
          </Grid>
          <Grid container spacing={0}>
            <Grid item sm={12} md={6} lg={4}>
              <FieldWrapper>
                <FieldName>Farm Land</FieldName>
                <Autocomplete
                  key={formData?.farmLandDTO}
                  id="farmLandDTO"
                  disabled={
                    state?.action === DEF_ACTIONS.VIEW ||
                    formData?.farmerDTO == null
                  }
                  options={farmerLandList}
                  value={formData ? formData.farmLandDTO : ""}
                  getOptionLabel={(i) => `${i.code} - ${i.name}`}
                  inputValue={inputFarmLandCategory}
                  onInputChange={(event, newInputValue) => {
                    setInputFarmLandCategory(newInputValue);
                  }}
                  onChange={(event, value) => {
                    handleChange(value, "farmLandDTO");
                    getAllAssessmentsByFLId(value?.id);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={12} md={6} lg={4}>
              <FieldWrapper>
                <FieldName>Basic Assesment</FieldName>
                <Autocomplete
                  key={formData?.basicAssessmentDTO}
                  id="basicAssessmentDTO"
                  disabled={
                    state?.action === DEF_ACTIONS.VIEW ||
                    formData?.farmLandDTO == null
                  }
                  options={basicAssessments}
                  value={formData ? formData?.basicAssessmentDTO : ""}
                  getOptionLabel={(i) => `${i.assessmentId}`}
                  inputValue={inputBasicAssesmentCategory}
                  onInputChange={(event, newInputValue) => {
                    setInputBasicAssesmentCategory(newInputValue);
                  }}
                  onChange={(event, value) => {
                    handleChange(value, "basicAssessmentDTO");
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: `${Colors.white}`,
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  fullWidth
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ marginBottom: "20px" }} spacing={1}></Grid>
      </TabContent>

      <TabWrapper style={{ margin: "0px 0px" }}>
        <TabButton
          className={toggleState === 1 ? "active-tabs" : ""}
          onClick={() => toggleTab(1)}
        >
          General
        </TabButton>
        <TabButton
          className={toggleState === 2 ? "active-tabs" : ""}
          onClick={() => toggleTab(2)}
          disabled={formData?.id == null || !cropAreaPermission?.isEnabled}
        >
          Crop Details
        </TabButton>

        <TabButton
          className={toggleState === 4 ? "active-tabs" : ""}
          onClick={() => toggleTab(4)}
          disabled={formData?.id == null || !intAuditPermission?.isEnabled}
        >
          Internal Audit
        </TabButton>
        <TabButton
          className={toggleState === 5 ? "active-tabs" : ""}
          onClick={() => toggleTab(5)}
          disabled={formData?.id == null || !extAuditPermission?.isEnabled}
        >
          Final Audit
        </TabButton>

        <TabButton
          className={toggleState === 6 ? "active-tabs" : ""}
          onClick={() => toggleTab(6)}
          disabled={formData?.id === "" || !certificatePermission?.isEnabled}
        >
          Certificate
        </TabButton>

        <TabButton
          className={toggleState === 7 ? "active-tabs" : ""}
          onClick={() => toggleTab(7)}
          disabled={formData?.id == null}
        >
          Actions
        </TabButton>
        {/* <TabButton
          className={toggleState === 8 ? "active-tabs" : ""}
          onClick={() => toggleTab(8)}
          disabled={formData?.id == null}
        >
          Initial Assesment
        </TabButton> */}
      </TabWrapper>

      <TabContent className={toggleState === 1 ? "active-content" : ""}>
        <Grid
          container
          flexDirection="row"
          sx={{ paddingTop: "20px", paddingInline: "20px" }}
          spacing={0}
        >
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4} spacing={0}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Have you applied for registration under the SL-GAP previously?
                </FieldName>
                <Switch
                  {...label}
                  name="appliedGapBefore"
                  id="appliedGapBefore"
                  value={formData?.appliedGapBefore || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "appliedGapBefore"
                    )
                  }
                  checked={formData?.appliedGapBefore}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            {enablePreGAPReqNo && (
              <Grid item sm={4} md={4} lg={4}>
                <FieldWrapper>
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Previous Gap Request Number
                  </FieldName>
                  <TextField
                    name="previousGapReqNo"
                    id="previousGapReqNo"
                    value={formData?.previousGapReqNo || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(e?.target?.value || "", "previousGapReqNo")
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
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Bussiness Nature
                </FieldName>
                <Select
                  name="businessNature"
                  id="businessNature"
                  value={formData?.businessNature || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "businessNature")
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                >
                  <MenuItem value={"SOLE"}>Sole</MenuItem>
                  <MenuItem value={"PROPRIETORSHIP"}>Proprietorship</MenuItem>
                  <MenuItem value={"PARTNERSHIP"}>Partnership</MenuItem>
                  <MenuItem value={"COMPANY"}>Company</MenuItem>
                  <MenuItem value={"SOCIETY"}>Society</MenuItem>
                  <MenuItem value={"OTHER"}>Other</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            {enableOtherBusinessNature && (
              <Grid item sm={6} md={6} lg={6}>
                <FieldWrapper>
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Bussiness Nature Other Value
                  </FieldName>
                  <TextField
                    name="businessNatureOtherValue"
                    id="businessNatureOtherValue"
                    value={formData?.businessNatureOtherValue || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "businessNatureOtherValue"
                      )
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
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper style={{}}>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Have you obtained any other kind of certificate for your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="hasOtherCertificates"
                  id="hasOtherCertificates"
                  value={formData?.hasOtherCertificates || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "hasOtherCertificates"
                    )
                  }
                  checked={formData?.hasOtherCertificates}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            {enableOtherCeritications && (
              <Grid item sm={4} md={4} lg={6}>
                <FieldWrapper>
                  <FieldName>
                    Type of certification (Please attach a photocopy)
                  </FieldName>
                  <Stack spacing={{ xs: 2, sm: 2 }} direction="row">
                    {(formData?.otherCertificateDocStoredFileName ||
                      otherCertificateImg) && (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FilePresentIcon
                          fontSize="large"
                          color="success"
                          sx={{ marginRight: "5px" }}
                        />
                        <Button
                          size="small"
                          color="success"
                          variant="outlined"
                          startIcon={<VisibilityIcon color="success" />}
                          onClick={handlePreview}
                        >
                          Preview
                        </Button>
                      </div>
                    )}
                    {state?.action === DEF_ACTIONS.VIEW ? null : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UploadFileOutlinedIcon
                          fontSize="large"
                          sx={{
                            marginRight: "5px",
                            color: iconColor === "gray" ? "gray" : "#1976d2",
                          }}
                        />
                        <InputLabel
                          style={{
                            cursor: "pointer",
                            color: iconColor === "gray" ? "gray" : "#1976d2",
                            fontSize: "10px",
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid",
                            borderColor:
                              iconColor === "gray" ? "gray" : "#1976d2",
                            borderRadius: "4px",
                            padding: "4px 6px 4px 6px",
                          }}
                          htmlFor="otherCertificateDoc"
                        >
                          <AttachmentOutlinedIcon
                            sx={{ marginRight: 1 }}
                            fontSize="small"
                            color={iconColor}
                          />{" "}
                          CHOOSE A FILE
                        </InputLabel>
                      </div>
                    )}
                    <input
                      name="otherCertificateDoc"
                      id="otherCertificateDoc"
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      onChange={(event) => handleFileChange(event)}
                      type="file"
                      accept="image/*"
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                          backgroundColor: `${Colors.white}`,
                        },
                      }}
                      style={{ display: "none" }}
                    />
                  </Stack>
                </FieldWrapper>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Do you have proper knowledge on SL-GAP standard?
                </FieldName>
                <Switch
                  {...label}
                  name="hasProperKnowledgeOnSLGap"
                  id="hasProperKnowledgeOnSLGap"
                  value={formData?.hasProperKnowledgeOnSLGap || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "hasProperKnowledgeOnSLGap"
                    )
                  }
                  checked={formData?.hasProperKnowledgeOnSLGap}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Do you have brochures or leaflets prepared pertaining to
                  SL-GAP standard?
                </FieldName>
                <Switch
                  {...label}
                  name="hasLeafletsPertainingToSLGap"
                  id="hasLeafletsPertainingToSLGap"
                  value={formData?.hasLeafletsPertainingToSLGap || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "hasLeafletsPertainingToSLGap"
                    )
                  }
                  checked={formData?.hasLeafletsPertainingToSLGap}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have a checklist pertaining to SL-GAP standard?
                </FieldName>
                <Switch
                  {...label}
                  name="hasChecklist"
                  id="hasChecklist"
                  value={formData?.hasChecklist || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || false, "hasChecklist")
                  }
                  checked={formData?.hasChecklist}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Do you have a quality management plan for your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="hasQualityManagementPlan"
                  id="hasQualityManagementPlan"
                  value={formData?.hasQualityManagementPlan || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "hasQualityManagementPlan"
                    )
                  }
                  checked={formData?.hasQualityManagementPlan}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Seeds obtained from your own farm
                </FieldName>
                <Checkbox
                  {...label}
                  name="seedsFromOwnFarm"
                  id="seedsFromOwnFarm"
                  value={formData?.seedsFromOwnFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "seedsFromOwnFarm"
                    )
                  }
                  checked={formData?.seedsFromOwnFarm}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid
              item
              sm={3}
              md={3}
              lg={3}
              style={{
                paddingInline: "15px",
              }}
            >
              <FieldWrapper
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0",
                }}
              >
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Seeds obtained from private institutes
                </FieldName>
                <Checkbox
                  {...label}
                  name="seedsFromPrivateFarm"
                  id="seedsFromPrivateFarm"
                  value={formData?.seedsFromPrivateFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "seedsFromPrivateFarm"
                    )
                  }
                  checked={formData?.seedsFromPrivateFarm}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Certified seeds (DOA)
                </FieldName>
                <Checkbox
                  {...label}
                  name="certifiedSeeds"
                  id="certifiedSeeds"
                  value={formData?.certifiedSeeds || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || false, "certifiedSeeds")
                  }
                  checked={formData?.certifiedSeeds}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={1} md={1} lg={1}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Other
                </FieldName>
                <Checkbox
                  {...label}
                  name="seedsFromOther"
                  id="seedsFromOther"
                  value={formData?.seedsFromOther || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || false, "seedsFromOther")
                  }
                  checked={formData?.seedsFromOther}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Seeds From Specify
                </FieldName>
                <TextField
                  name="seedsFromSpecify"
                  id="seedsFromSpecify"
                  value={formData?.seedsFromSpecify || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "seedsFromSpecify")
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
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If seeds / planting materials obtained are certified, mention
                  the name of the institution by which the certification was
                  made.
                </FieldName>
                <TextField
                  name="seedsCertifiedInstitution"
                  id="seedsCertifiedInstitution"
                  value={formData?.seedsCertifiedInstitution || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "seedsCertifiedInstitution"
                    )
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
            <Grid item sm={12} md={12} lg={12}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If seeds / planting materials obtained are not certified,
                  mention the place they were obtained, name and the officer /
                  institute recommended
                </FieldName>
                <TextField
                  name="notCertifiedSeedsRecommendedOfficer"
                  id="notCertifiedSeedsRecommendedOfficer"
                  value={formData?.notCertifiedSeedsRecommendedOfficer || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "notCertifiedSeedsRecommendedOfficer"
                    )
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FormControl fullWidth>
                  <FieldName>
                    Soil Type {formData?.soilTypeDTO?.length}
                  </FieldName>

                  <Autocomplete
                    name="soilTypeDTO"
                    id="soilTypeDTO"
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    options={soilType}
                    value={
                      soilType.find(
                        (option) =>
                          `${option.soilTypeCode} - ${option.description}` ===
                          formData?.existingSoilType
                      ) || null
                    }
                    getOptionLabel={(i) =>
                      i.soilTypeCode
                        ? `${i.soilTypeCode} - ${i.description}`
                        : ""
                    }
                    onChange={(event, value) => {
                      const selectedDescription = value
                        ? value.description
                        : "";
                      const selectedCode = value ? value.soilTypeCode : "";
                      const concat = `${selectedCode} - ${selectedDescription}`;
                      handleChange(concat, "existingSoilType");
                    }}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: `${Colors.white}`,
                      },
                    }}
                    size="small"
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </FormControl>
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Mention whether any soil test has been done for your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="hasSoilTestDone"
                  id="hasSoilTestDone"
                  value={formData?.hasSoilTestDone || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || false, "hasSoilTestDone")
                  }
                  checked={formData?.hasSoilTestDone}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName>Fertilizer management based on soil test</FieldName>
                <Switch
                  {...label}
                  name="fertilizerManageBasedOnSoilTest"
                  id="fertilizerManageBasedOnSoilTest"
                  value={formData?.fertilizerManageBasedOnSoilTest || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "fertilizerManageBasedOnSoilTest"
                    )
                  }
                  checked={formData?.fertilizerManageBasedOnSoilTest}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName>
                  Following the recommendation of Department Of Agriculture
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerManageRecommendationOfAD"
                  id="fertilizerManageRecommendationOfAD"
                  value={formData?.fertilizerManageRecommendationOfAD || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "fertilizerManageRecommendationOfAD"
                    )
                  }
                  checked={formData?.fertilizerManageRecommendationOfAD}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Following the recommendation of another recognized institute
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerManageRecommendationOfAnotherInstitute"
                  id="fertilizerManageRecommendationOfAnotherInstitute"
                  value={
                    formData?.fertilizerManageRecommendationOfAnotherInstitute ||
                    ""
                  }
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "fertilizerManageRecommendationOfAnotherInstitute"
                    )
                  }
                  checked={
                    formData?.fertilizerManageRecommendationOfAnotherInstitute
                  }
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "70%",
                  }}
                >
                  Other Fertilizer management
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerMangeOther"
                  id="fertilizerMangeOther"
                  value={formData?.fertilizerMangeOther || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "fertilizerMangeOther"
                    )
                  }
                  checked={formData?.fertilizerMangeOther}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>

            {enableOtherFertilizerMgt && (
              <Grid item sm={8} md={8} lg={8}>
                <FieldWrapper>
                  <FieldName
                    style={{
                      width: "100%",
                    }}
                  >
                    Specify
                  </FieldName>
                  <TextField
                    name="fertilizerManageSpecify"
                    id="fertilizerManageSpecify"
                    value={formData?.fertilizerManageSpecify || ""}
                    disabled={state?.action === DEF_ACTIONS.VIEW}
                    onChange={(e) =>
                      handleChange(
                        e?.target?.value || "",
                        "fertilizerManageSpecify"
                      )
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
            )}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Mention whether you have added compost to the soil
                </FieldName>
                <Switch
                  {...label}
                  name="addedCompostToSoil"
                  id="addedCompostToSoil"
                  value={formData?.addedCompostToSoil || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "addedCompostToSoil"
                    )
                  }
                  checked={formData?.addedCompostToSoil}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Prepared within the farm
                </FieldName>
                <Checkbox
                  {...label}
                  name="compostPreparedWithinFarm"
                  id="compostPreparedWithinFarm"
                  value={formData?.compostPreparedWithinFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "compostPreparedWithinFarm"
                    )
                  }
                  checked={formData?.compostPreparedWithinFarm}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={2} md={2} lg={2}>
              <FieldWrapper>
                <FieldName style={{}}>Prepared outside the farm</FieldName>
                <Checkbox
                  {...label}
                  name="compostPreparedOutsideFarm"
                  id="compostPreparedOutsideFarm"
                  value={formData?.compostPreparedOutsideFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "compostPreparedOutsideFarm"
                    )
                  }
                  checked={formData?.compostPreparedOutsideFarm}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If received from outside, mention the place and address
                </FieldName>
                <TextField
                  name="addressIfCompostReceivedOutside"
                  id="addressIfCompostReceivedOutside"
                  value={formData?.addressIfCompostReceivedOutside || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "addressIfCompostReceivedOutside"
                    )
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Mention whether human fecal matters were added to the field in
                  direct or indirect way.
                </FieldName>
                <Switch
                  {...label}
                  name="humanFecalMattersAdded"
                  id="humanFecalMattersAdded"
                  value={formData?.humanFecalMattersAdded || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "humanFecalMattersAdded"
                    )
                  }
                  checked={formData?.humanFecalMattersAdded}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have any measures adopted to minimize soil erosion?
                </FieldName>
                <Switch
                  {...label}
                  name="anyMeasuresToAdoptedSoilErosion"
                  id="anyMeasuresToAdoptedSoilErosion"
                  value={formData?.anyMeasuresToAdoptedSoilErosion || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "anyMeasuresToAdoptedSoilErosion"
                    )
                  }
                  checked={formData?.anyMeasuresToAdoptedSoilErosion}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have water testing report with regard to the water used
                  for irrigation?
                </FieldName>
                <Switch
                  {...label}
                  name="hasWaterTestReport"
                  id="hasWaterTestReport"
                  value={formData?.hasWaterTestReport || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "hasWaterTestReport"
                    )
                  }
                  checked={formData?.hasWaterTestReport}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  How often water is tested to ascertain its quality?
                </FieldName>
                <TextField
                  name="howOftenWaterTest"
                  id="howOftenWaterTest"
                  value={formData?.howOftenWaterTest || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "howOftenWaterTest")
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
            <Grid item>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  What is the irrigation methods used in your farm/field?
                </FieldName>
                <Select
                  name="irrigationMethod"
                  id="irrigationMethod"
                  value={formData?.irrigationMethod || "OTHER"}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "irrigationMethod")
                  }
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: `${Colors.white}`,
                  }}
                  size="small"
                >
                  <MenuItem value={"FLOOD"}>FLOOD</MenuItem>
                  <MenuItem value={"DRIP"}> DRIP</MenuItem>
                  <MenuItem value={"SPRINKLER"}>SPRINKLER</MenuItem>
                  <MenuItem value={"OTHER"}> OTHER</MenuItem>
                </Select>
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If there Specific irrigation method ?
                </FieldName>
                <TextField
                  name="irrigationMethodSpecify"
                  id="irrigationMethodSpecify"
                  value={formData?.irrigationMethodSpecify || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "irrigationMethodSpecify"
                    )
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Whether the farm has been used for any other non-agricultural
                  purpose earlier?
                </FieldName>
                <Switch
                  {...label}
                  name="farmUsedForNonAgriculturalPurpose"
                  id="farmUsedForNonAgriculturalPurpose"
                  value={formData?.farmUsedForNonAgriculturalPurpose || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "farmUsedForNonAgriculturalPurpose"
                    )
                  }
                  checked={formData?.farmUsedForNonAgriculturalPurpose}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  If yes, mention for what purpose?
                </FieldName>
                <TextField
                  name="specifyNonAgriculturalPurpose"
                  id="specifyNonAgriculturalPurpose"
                  value={formData?.specifyNonAgriculturalPurpose || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "specifyNonAgriculturalPurpose"
                    )
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
            {/* <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Crops cultivated within past two years
                </FieldName>
                <TextField
                  name="cropsCultivatedPastTwoYears"
                  id="cropsCultivatedPastTwoYears"
                  value={formData?.cropsCultivatedPastTwoYears || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "cropsCultivatedPastTwoYears"
                    )
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
            </Grid> */}
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  How do you manage weeds in your farm?
                </FieldName>
                <TextField
                  name="howManageWeeds"
                  id="howManageWeeds"
                  value={formData?.howManageWeeds || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(e?.target?.value || "", "howManageWeeds")
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have SL-GAP and the conventional agricultural practices
                  available in your farm?
                </FieldName>
                <Switch
                  {...label}
                  name="slgapConvPracExists"
                  id="slgapConvPracExists"
                  value={formData?.slgapConvPracExists || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "slgapConvPracExists"
                    )
                  }
                  checked={formData?.slgapConvPracExists}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  mention the measures which have been taken to supply such
                  products to the market separately
                </FieldName>
                <TextField
                  name="howToMarketSeparately"
                  id="howToMarketSeparately"
                  value={formData?.howToMarketSeparately || ""}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.value || "",
                      "howToMarketSeparately"
                    )
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
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have identified any risk due to the activities from the
                  surrounding lands?
                </FieldName>
                <Switch
                  {...label}
                  name="surroundingLandRiskExist"
                  id="surroundingLandRiskExist"
                  value={formData?.surroundingLandRiskExist || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "surroundingLandRiskExist"
                    )
                  }
                  checked={formData?.surroundingLandRiskExist}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Have you taken the corrective measures to minimize the risk?
                </FieldName>
                <Switch
                  {...label}
                  name="correctiveMeasuresTakenForSurroundingLands"
                  id="correctiveMeasuresTakenForSurroundingLands"
                  value={
                    formData?.correctiveMeasuresTakenForSurroundingLands || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "correctiveMeasuresTakenForSurroundingLands"
                    )
                  }
                  checked={formData?.correctiveMeasuresTakenForSurroundingLands}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Steps have been taken to prevent contamination at the
                  harvesting and temporary storage
                </FieldName>
                <Switch
                  {...label}
                  name="preventContaminationExists"
                  id="preventContaminationExists"
                  value={formData?.preventContaminationExists || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "preventContaminationExists"
                    )
                  }
                  checked={formData?.preventContaminationExists}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Produce / harvest washed at the farm?
                </FieldName>
                <Switch
                  {...label}
                  name="harvestWashedAtFarm"
                  id="harvestWashedAtFarm"
                  value={formData?.harvestWashedAtFarm || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "harvestWashedAtFarm"
                    )
                  }
                  checked={formData?.harvestWashedAtFarm}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  If yes water quality is similar to drinking water?
                </FieldName>
                <Switch
                  {...label}
                  name="waterQualitySimilarToDrinkingWater"
                  id="waterQualitySimilarToDrinkingWater"
                  value={formData?.waterQualitySimilarToDrinkingWater || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "waterQualitySimilarToDrinkingWater"
                    )
                  }
                  checked={formData?.waterQualitySimilarToDrinkingWater}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={3} md={3} lg={3}>
              <FieldWrapper>
                <FieldName style={{}}>
                  On farm packaging was carried out?
                </FieldName>
                <Switch
                  {...label}
                  name="onFarmPackaging"
                  id="onFarmPackaging"
                  value={formData?.onFarmPackaging || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || false, "onFarmPackaging")
                  }
                  checked={formData?.onFarmPackaging}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have method to maintain traceability of produce?
                </FieldName>
                <Switch
                  {...label}
                  name="maintainTraceability"
                  id="maintainTraceability"
                  value={formData?.maintainTraceability || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "maintainTraceability"
                    )
                  }
                  checked={formData?.maintainTraceability}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={5} md={5} lg={5}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you use the SL-GAP logo and the QR code on your product
                  package?
                </FieldName>
                <Switch
                  {...label}
                  name="useSLGapQR"
                  id="useSLGapQR"
                  value={formData?.useSLGapQR || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || false, "useSLGapQR")
                  }
                  checked={formData?.useSLGapQR}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            xs="auto"
            sm={12}
            md={12}
            lg={12}
            sx={{
              border: "1px solid #bec0c2",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
            spacing={0}
          >
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName
                  style={{
                    width: "100%",
                  }}
                >
                  Do you store the both SL-GAP and non - GAP products together
                  in same place?
                </FieldName>
                <Switch
                  {...label}
                  name="storeSLGapAndNonGapTogether"
                  id="storeSLGapAndNonGapTogether"
                  value={formData?.storeSLGapAndNonGapTogether || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "storeSLGapAndNonGapTogether"
                    )
                  }
                  checked={formData?.storeSLGapAndNonGapTogether}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have protect the temporary stores and processing places
                  from insects and other animals?
                </FieldName>
                <Switch
                  {...label}
                  name="protectedTempProcessingStore"
                  id="protectedTempProcessingStore"
                  value={formData?.protectedTempProcessingStore || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "protectedTempProcessingStore"
                    )
                  }
                  checked={formData?.protectedTempProcessingStore}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you store fertilizer and pesticides in same store?
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerAndPesticidesInSameStore"
                  id="fertilizerAndPesticidesInSameStore"
                  value={formData?.fertilizerAndPesticidesInSameStore || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "fertilizerAndPesticidesInSameStore"
                    )
                  }
                  checked={formData?.fertilizerAndPesticidesInSameStore}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have stored fertilizer and pesticide separately to
                  ensure the quality?
                </FieldName>
                <Switch
                  {...label}
                  name="fertilizerAndPesticidesInSeparateStore"
                  id="fertilizerAndPesticidesInSeparateStore"
                  value={formData?.fertilizerAndPesticidesInSeparateStore || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "fertilizerAndPesticidesInSeparateStore"
                    )
                  }
                  checked={formData?.fertilizerAndPesticidesInSeparateStore}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  The workers have been trained properly on relevant trainings?
                </FieldName>
                <Switch
                  {...label}
                  name="workersTrained"
                  id="workersTrained"
                  value={formData?.workersTrained || ""}
                  onChange={(e) =>
                    handleChange(e?.target?.checked || false, "workersTrained")
                  }
                  checked={formData?.workersTrained}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
            <Grid item sm={4} md={4} lg={4}>
              <FieldWrapper>
                <FieldName style={{}}>
                  Do you have provide first aid and sanitary facilities for
                  workers?
                </FieldName>
                <Switch
                  {...label}
                  name="firstAidSanitaryProvided"
                  id="firstAidSanitaryProvided"
                  value={formData?.firstAidSanitaryProvided || ""}
                  onChange={(e) =>
                    handleChange(
                      e?.target?.checked || false,
                      "firstAidSanitaryProvided"
                    )
                  }
                  checked={formData?.firstAidSanitaryProvided}
                  disabled={state?.action === DEF_ACTIONS.VIEW}
                />
              </FieldWrapper>
            </Grid>
          </Grid>
        </Grid>
      </TabContent>

      <TabContent
        style={{ marginTop: "10px" }}
        className={toggleState === 2 ? "active-content" : ""}
      >
        <ActionWrapper isLeft>
          <ButtonGroup
            variant="outlined"
            disableElevation
            size="small"
            aria-label="action button group"
            color="success"
          >
            <PermissionWrapper
              permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.CROP_AREA}`}
            >
              {state?.action === DEF_ACTIONS.VIEW ? null : (
                <Button onClick={onCreateCropDetails}>
                  <Add />
                  {DEF_ACTIONS.ADD}
                </Button>
              )}
            </PermissionWrapper>
            {selectedCrop.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.CROP_AREA}`}
              >
                {state?.action === DEF_ACTIONS.VIEW ? null : (
                  <Button onClick={onEditCropDetails}>
                    <Edit />
                    {DEF_ACTIONS.EDIT}
                  </Button>
                )}
              </PermissionWrapper>
            )}

            {selectedCrop.length === 1 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.CROP_AREA}`}
              >
                <Button onClick={onViewCropDetails}>
                  <Vrpano />
                  {DEF_ACTIONS.VIEW}
                </Button>
              </PermissionWrapper>
            )}

            {selectedCrop.length > 0 && (
              <PermissionWrapper
                permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.CROP_AREA}`}
              >
                {state?.action === DEF_ACTIONS.VIEW ? null : (
                  <Button onClick={onDeleteCropDetails}>
                    <Delete />
                    {DEF_ACTIONS.DELETE}
                  </Button>
                )}
              </PermissionWrapper>
            )}
          </ButtonGroup>
        </ActionWrapper>
        <PermissionWrapper
          permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.CROP_AREA}`}
        >
          <CropDetailsList onRowSelect={toggleCropSelect} data={cropList} />
        </PermissionWrapper>
      </TabContent>

      <TabContent className={toggleState === 4 ? "active-content" : ""}>
        <DynamicFormListGap
          dataList={null}
          onFormSaveSuccess={null}
          formId={formData?.id}
          gapData={formData}
          formMode={null}
          auditFormType={"INTERNAL_AUDIT"}
          action={state?.action}
        />
      </TabContent>

      <TabContent className={toggleState === 5 ? "active-content" : ""}>
        <DynamicFormListGap
          dataList={null}
          onFormSaveSuccess={null}
          formId={formData?.id}
          formMode={null}
          gapData={formData}
          gapReqStatus={gapReqStatus.lblState}
          auditFormType={"EXTERNAL_AUDIT"}
          action={state?.action}
        />
      </TabContent>

      <TabContent className={toggleState === 6 ? "active-content" : ""}>
        <GapRequestCertificate
          url={formData.certificatePresignedUrl}
          gapId={formData.id}
        />
      </TabContent>

      <TabContent className={toggleState === 7 ? "active-content" : ""}>
        <GapRegActionList gapReqActionList={gapReqActionList} />
      </TabContent>

      <AddCropDetailsDialog
        open={openCropAreaAddDlg}
        setConfirmDialog={setOpenCropAreaAddDlg}
        handleClose={closeCropDetailsDlg}
        formData={cdFormData}
        action={cdAction}
        refresh={refreshCropList}
      />
      
      <ConfirmationDialog
        open={openDeleteCropDetail}
        title="Do you want to delete?"
        items={selectedCropData}
        loading={loading}
        onClose={closeCropDelete}
        onConfirm={onConfirmDeleteCropDetail}
        setDialogSelectedTypes={setDialogSelectedCrop}
        dialogSelectedTypes={dialogSelectedCrop}
        propertyId = "cropVarietyDTO.varietyName"
        propertyDescription = "cropDTO.description"
      />

      <DialogBox
        open={openConfSubmit}
        title="Submit Gap Request"
        actions={
          <ActionWrapper>
            <Button
              variant="contained"
              color="info"
              onClick={setSubmitted}
              sx={{ ml: "8px" }}
            >
              Ok
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenConfSubmit(false)}
              sx={{ ml: "8px" }}
            >
              Cancel
            </Button>
          </ActionWrapper>
        }
      >
        <>
          {/* <DeleteMsg /> */}
          If you submitted the gap request..<br></br>You can not make any
          changes to gap request
          <Divider sx={{ mt: "16px" }} />
          {renderSelectedItems()}
        </>
      </DialogBox>

      <DialogBox
        open={openApproveDialog.open}
        title={
          openApproveDialog.option === "approve"
            ? `Approve Gap Request`
            : "Reject Gap Request"
        }
        actions={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
            }}
          >
            {openApproveDialog.option === "reject" && (
              <TextField
                style={{ marginBottom: "8px", width: "95%", margin: "auto" }}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                label="Enter reject reason"
                variant="outlined"
              />
            )}
            <ActionWrapper>
              <div>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => {
                    if (openApproveDialog.option === "approve") {
                      if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.GAP_BY_DD}`
                        ) &&
                        gapReqStatus.lblState === "SUBMITTED"
                      ) {
                        changeGapReqStatus("APPROVED_BY_DD");
                      } else if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.EXTERNAL_AUDIT}`
                        ) &&
                        gapReqStatus.lblState === "ASSIGN_AUDITORS"
                      ) {
                        changeGapReqStatus("EXTERNAL_AUDITOR_SUBMITTED");
                      } else if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.EXTERNAL_AUDIT}`
                        ) &&
                        gapReqStatus.lblState === "APPROVED_BY_DD"
                      ) {
                        changeGapReqStatus("EXTERNAL_AUDITOR_SUBMITTED");
                      } else if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.GAP_BY_SCS}`
                        ) &&
                        gapReqStatus.lblState === "EXTERNAL_AUDITOR_SUBMITTED"
                      ) {
                        changeGapReqStatus("SCS_REGIONAL_OFFICER_APPROVE");
                      } else if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.GAP_BY_MAIN_SCS}`
                        ) &&
                        gapReqStatus.lblState === "SCS_REGIONAL_OFFICER_APPROVE"
                      ) {
                        changeGapReqStatus("MAIN_SCS_REGIONAL_OFFICER_APPROVE");
                      }
                    } else if (openApproveDialog.option === "reject") {
                      if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.GAP_BY_DD}`
                        ) &&
                        gapReqStatus.lblState === "SUBMITTED"
                      ) {
                        changeGapReqStatus("REJECTED_BY_DD");
                      } else if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.GAP_BY_SCS}`
                        ) &&
                        gapReqStatus.lblState === "APPROVED_BY_DD"
                      ) {
                        changeGapReqStatus("SCS_REGIONAL_OFFICER_REJECT");
                      } else if (
                        getUserPermissionStateByAuthority(
                          `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.GAP_BY_SCS}`
                        ) &&
                        gapReqStatus.lblState === "EXTERNAL_AUDITOR_SUBMITTED"
                      ) {
                        changeGapReqStatus("SCS_REGIONAL_OFFICER_REJECT");
                      } else {
                        changeGapReqStatus("REJECTED_BY_MAIN_SCS");
                      }
                    }
                    setOpenApproveDialog({ open: false, option: "" });
                  }}
                  sx={{ ml: "8px" }}
                >
                  Ok
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    setOpenApproveDialog({ open: false, option: "" })
                  }
                  sx={{ ml: "8px" }}
                >
                  Cancel
                </Button>
              </div>
            </ActionWrapper>
          </div>
        }
      >
        <>
          {openApproveDialog.option === "approve"
            ? getUserPermissionStateByAuthority(
                `${DEF_ACTIONS.APPROVE}_${DEF_COMPONENTS.EXTERNAL_AUDIT}`
              ) && gapReqStatus.lblState === "ASSIGN_AUDITORS"
              ? `Please confirm to submit this GAP request.`
              : `Please confirm to approve this GAP request.`
            : `Please confirm to reject this GAP request.`}
        </>
      </DialogBox>

      <MultiItemSelect
        options={auditores}
        open={isAuditorsAssignDialogOpen}
        mode={state?.action}
        itemHandler={auditorsAssignDialogValuesHandler}
        handleClose={auditorsAssignDialogHandler}
        existingAuditores={formData?.externalAuditors}
        changeGapReqStatus={changeGapReqStatus}
        gapReqStatus={gapReqStatus}
      />

      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openOtherCertificateDialog}
        onClose={handleCloseOtherCertificateDialog}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openOtherCertificateDialog} timeout={500}>
          <img
            src={
              otherCertificateImg != null
                ? otherCertificateImg
                : formData.otherCertificateDocPresignedUrl
            }
            alt="Certificate"
            style={{
              maxHeight: "60vh",
              maxWidth: "60vw",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Fade>
      </Modal>
    </Box>
  );
};

export default GapRegForm;

export const AddFarmerButton = styled.button`
  width: 200px;
  height: 28px;
  margin-right: 5px;
  border-radius: 22px;
  background-color: ${Colors.formButton};
  border: none;
  color: ${Colors.white};
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;
