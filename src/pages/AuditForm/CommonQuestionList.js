import React, { useState, useEffect } from 'react'
import {CardWrapper} from "../../components/PageLayout/Card";
import {DataTable} from "../../components/PageLayout/Table";
import {
    Button,
    CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import {ViewButton} from "../Gap/CropDetails";
import CropAreaAddDialog from "../Gap/CropAreaAddDialog/CropAreaAddDialog";
import AddQuestionDialog from "./AddQuestionDialog";
import {FormHeader} from "../../components/FormLayout/FormHeader";
import {deleteAuditForm, handleAuditForm, updateAuditForm} from "../../redux/actions/auditForm/action";
import {SnackBarTypes} from "../../utils/constants/snackBarTypes";
import {DEF_ACTIONS} from "../../utils/constants/permission";
import {useSnackBars} from "../../context/SnackBarContext";
import {getQuestionsByFormId, handleAuditFormQuestions, updateAuditFormQuestions, deleteAuditFormQuestion} from "../../redux/actions/auditForm/auditFormQuestions/actions";
import {get_AiRegionList} from "../../redux/actions/aiRegion/action";
import {ActionWrapper} from "../../components/PageLayout/ActionWrapper";
import DeleteMsg from "../../utils/constants/DeleteMsg";
import DialogBox from "../../components/PageLayout/DialogBox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const CommonQuestionList = ({
                                selectedRows = [],
                                onRowSelect = (_c) => {
                                },
                                selectAll = (_list = []) => {
                                },
                                unSelectAll = () => {
                                },
                                dataList = [],
                                onFormSaveSuccess = false,
                                formId = null,
                                formMode = null
                            }) => {

    const [formData, setFormData] = useState({});
    const [dataListQuestions, setDataListQuestions] = useState([]);
    const [dialogMode, setDialogMode] = useState(null);
    const [openCropDlg, setOpenCropDlg] = useState(false);
    const [openCropAreaAddDlg, setOpenCropAreaAddDlg] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const { addSnackBar } = useSnackBars();

    useEffect(() => { setDataListQuestions(dataList) }, [dataList]);

    const columns = [
        {field: "questionString", headerName: "Question String"},
        {field: "questionType", headerName: "Question Type"},
        {field: "itemGroup", headerName: "Item Group"},
        {field: "complianceGroup", headerName: "Compliance Group"},
        {field: "proofRequired", headerName: "Proof Required"},
        {field: "order", headerName: "Order"}
    ];

    const handleCropAreaAdd = (prop, mode) => (event) =>  {
        console.log('after clioeck ', prop)
        setFormData({});
        setFormData(prop);
        setDialogMode(mode);
        setOpenCropAreaAddDlg(true);
    }

    const handleCropAreaDelete = (prop) => (event) =>  {
        console.log('dlg prop ', prop);
        console.log('dlg event ', event);
        setDeleteItem(prop);
        setOpen(true);
    }

    const closeAddCropArea = () => {
        setFormData({});
        setOpenCropAreaAddDlg(false);
    };

/*    const handleFormSubmit = async () => {
        if (enableSave()) {
            setSaving(true);
            formData.formType = auditFormType;
            try {
                if (formData?.id) {
                    console.log('form edit ', formData);
                    await updateAuditForm(formData, onSuccess, onError);
                } else {
                    console.log('form ', formData);
                    await handleAuditForm(formData, onSuccess, onError);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };*/

    const onSuccess = async (response) => {

        addSnackBar({
                        type: SnackBarTypes.success,
                        message: "Successfully executed !!!"
                    });

        getQuestionsByFormId(formId).then(({ dataList = [] }) => {
            console.log('after succss ', dataList);
            setDataListQuestions(dataList);
        });

    };

    const onError = (message) => {
        addSnackBar({
                        type: SnackBarTypes.error,
                        message: message || "Login Failed",
                    });
    };

    const handle = async (event, data, functionMode) => {

        if (functionMode === DEF_ACTIONS.ADD) {
            await handleAuditFormQuestions(formId, data, onSuccess, onError);
        } else if(functionMode === DEF_ACTIONS.EDIT) {
            await updateAuditFormQuestions(formId, data, onSuccess, onError);
        }
        setOpenCropAreaAddDlg(false);
    };


    const addQ = () => {
        setFormData({});
        setDialogMode(DEF_ACTIONS.ADD);
        setOpenCropAreaAddDlg(true);
    }

    const onConfirm = async () => {
        console.log('on confirm');
        await deleteAuditFormQuestion(formId, deleteItem?.id, onSuccess, onError);
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
            <FormHeader>
                Audit Form Questions
            </FormHeader>
            {(onFormSaveSuccess || (formMode == DEF_ACTIONS.EDIT)) &&
             <Button
                 onClick={() => addQ()}
                 color="success"
                 variant="contained"
                 size="small"
                 sx={{marginLeft: "10px"}}
             >
                 ADD Questions
             </Button>
            }

            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question String</TableCell>
                            <TableCell>Question Type</TableCell>
                            <TableCell>Item Group</TableCell>
                            <TableCell>Order</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataListQuestions.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell>{row.questionString}</TableCell>
                                <TableCell>{row.questionType}</TableCell>
                                <TableCell>{row.itemGroup}</TableCell>
                                <TableCell>{row.order}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={handleCropAreaAdd(row, DEF_ACTIONS.VIEW)}
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        sx={{ marginLeft: "10px" }}
                                    >
                                        VIEW
                                    </Button>
                                    <Button
                                        onClick={handleCropAreaAdd(row, DEF_ACTIONS.EDIT)}
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        sx={{ marginLeft: "10px" }}
                                    >
                                        EDIT
                                    </Button>
                                    <Button
                                        onClick={handleCropAreaDelete(row)}
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        sx={{ marginLeft: "10px" }}
                                    >
                                        DELETE
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*            <DataTable
                loadingTable
                dataEndPoint={"question-form-template/all/SELF_ASSESSMENT"}
                dataRows={dataList}
                columns={columns}
                selectable
                selectedRows={selectedRows}
                selectAll={selectAll}
                onRowSelect={onRowSelect}
                unSelectAll={unSelectAll}
            />*/}
            <AddQuestionDialog
                open={openCropAreaAddDlg}
                setConfirmDialog={setOpenCropAreaAddDlg}
                // setConfirmDialog={setOpenDlg}
                confirmAction={handle}
                handleClose={closeAddCropArea}
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
                            sx={{ ml: "8px" }}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={close}
                            sx={{ ml: "8px" }}
                        >
                            Close
                        </Button>
                    </ActionWrapper>
                }
            >
                <>
                    <DeleteMsg />
                    <Divider sx={{ mt: "16px" }} />
                    {renderSelectedItems()}
                </>
            </DialogBox>

        </div>
    )
}

export default CommonQuestionList