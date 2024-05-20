import React, {useState, useEffect} from 'react'
import {
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import {FormHeader} from "../../components/FormLayout/FormHeader";
import {SnackBarTypes} from "../../utils/constants/snackBarTypes";
import {DEF_ACTIONS} from "../../utils/constants/permission";
import {useSnackBars} from "../../context/SnackBarContext";
import {
    getQuestionsByFormId,
    handleAuditFormQuestions,
    updateAuditFormQuestions,
    deleteAuditFormQuestion
} from "../../redux/actions/auditForm/auditFormQuestions/actions";
import {ActionWrapper} from "../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import DialogBox from "../../components/PageLayout/DialogBox";
import CustFormHeader from "../../components/FormHeader/CustFormHeader";
import {useLocation} from "react-router-dom";
import AddQuestionDialog from '../AuditForm/AddQuestionDialog';
import AddCropDetailsDialog from './AddCropDetailsDialog';
import { deleteCropDetails, getCropDetailsList, handleCropDetails, updateCropDetails } from '../../redux/actions/gap/action';

const GapCropDetails = ({actionMode, gapReqId}) => {

    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({});
    const [cropAreaList, setCropAreaList] = useState([]);
    const [dialogMode, setDialogMode] = useState(null);
    const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const {addSnackBar} = useSnackBars();

    const fetchCropAreaData = () => {
        getCropDetailsList(gapReqId).then(({dataList = {}}) => {
            setCropAreaList(dataList);
        });
    }

    useEffect(() => {
        fetchCropAreaData();
    }, []);

    const handleCropAreaAdd = (prop, mode) => (event) => {
        setFormData({});
        setFormData(prop);
        setDialogMode(mode);
        setOpenCropAreaAddDlg(true);
    }

    const handleCropAreaDelete = (prop) => (event) => {
        setDeleteItem(prop);
        setOpen(true);
    }

    const closeAddCropArea = () => {
        setFormData({});
        setOpenCropAreaAddDlg(false);
    };

    const onSuccess = async (response) => {

        addSnackBar({
                        type: SnackBarTypes.success,
                        message: "Successfully executed !!!"
                    });

        // getQuestionsByFormId(formId).then(({dataList = []}) => {
        //     setDataListQuestions(dataList);
        // });

    };

    const onError = (message) => {
        addSnackBar({
                        type: SnackBarTypes.error,
                        message: message || "Login Failed",
                    });
    };

    const handle = async (event, data, functionMode) => {
        data.gapRequestDto = {id: gapReqId};
        if (functionMode === DEF_ACTIONS.ADD) {
            await handleCropDetails(data, onSuccess, onError);
        } else if (functionMode === DEF_ACTIONS.EDIT) {
            await updateCropDetails(data, onSuccess, onError);
        }
        fetchCropAreaData();
        setOpenCropAreaAddDlg(false);
    };

    const addQ = () => {
        setFormData({});
        setDialogMode(DEF_ACTIONS.ADD);
        setOpenCropAreaAddDlg(true);
    }

    const onConfirm = async () => {
        await deleteCropDetails(gapReqId, deleteItem?.id, onSuccess, onError);
        close();
    };

    const close = () => {
        setOpen(false);
    };

    const renderSelectedItems = () => {
        return (
            <p>
                {deleteItem?.questionString}
            </p>
        );
    };

    return (
        <div>
            <FormHeader>Crop Details</FormHeader>
            {(actionMode !== DEF_ACTIONS.VIEW) &&
             <Button
                 onClick={() => addQ()}
                 color="success"
                 variant="contained"
                 size="small"
                 sx={{marginLeft: "10px"}}
             >
                 ADD
             </Button>
            }

            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Season</TableCell>
                            <TableCell>Crop</TableCell>
                            <TableCell>Crop Variety</TableCell>
                            <TableCell>Plot Number</TableCell>
                            <TableCell>Extent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cropAreaList.map((row, index) => (
                            <TableRow key={row.index}>
                                <TableCell>{row?.gapCropSeason}</TableCell>
                                <TableCell>{row?.cropDTO?.cropId}</TableCell>
                                <TableCell>{row?.cropVarietyDTO?.varietyName}</TableCell>
                                <TableCell>{row?.plotNumber}</TableCell>
                                <TableCell>{row?.extent}</TableCell>
                                <TableCell>
                                    {/* <Button
                                        onClick={handleCropAreaAdd(row, DEF_ACTIONS.VIEW)}
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        sx={{marginLeft: "10px"}}
                                    >
                                        VIEW
                                    </Button>
                                    <Button
                                        onClick={handleCropAreaAdd(row, DEF_ACTIONS.EDIT)}
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        sx={{marginLeft: "10px"}}
                                        disabled={dialogMode === DEF_ACTIONS.VIEW}
                                    >
                                        EDIT
                                    </Button> */}
                                    <Button
                                        onClick={handleCropAreaDelete(row)}
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        sx={{marginLeft: "10px"}}
                                        disabled={actionMode === DEF_ACTIONS.VIEW}
                                    >
                                        DELETE
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddCropDetailsDialog
                open={openCropAreaAddDlg}
                setConfirmDialog={setOpenCropAreaAddDlg}
                // setConfirmDialog={setOpenDlg}
                confirmAction={handle}
                handleClose={closeAddCropArea}
                setFormData={setFormData}
                formData={formData}
                mode={dialogMode}
            /> 
            <DialogBox
                open={open}
                title={`Delete Question`}
                actions={
                    <ActionWrapper>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={onConfirm}
                            sx={{ml: "8px"}}
                        >
                            OK
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={close}
                            sx={{ml: "8px"}}
                        >
                            Cancel
                        </Button>
                    </ActionWrapper>
                }
            >
                <>
                    <Divider sx={{mt: "16px"}}/>
                    {renderSelectedItems()}
                </>
            </DialogBox>

        </div>
    )
}

export default GapCropDetails