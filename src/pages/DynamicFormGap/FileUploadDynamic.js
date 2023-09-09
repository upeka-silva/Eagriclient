import React, { useState } from 'react';
import { Button, Input, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {getQuestionsByFormId, handleAuditFormQuestions} from "../../redux/actions/auditForm/auditFormQuestions/actions";
import {fileUploadForm} from "../../redux/actions/auditForm/action";
import {SnackBarTypes} from "../../utils/constants/snackBarTypes";

function FileUploadDynamic({
                               qId = null,
                               gapId = null,
                               auditId = null,
                               auditAPIPath = '',
                               afterSelectedFile
                           }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSuccess = async (response) => {
        console.log('response ', response);
        //afterSave(response);
/*        addSnackBar({
                        type: SnackBarTypes.success,
                        message: "Successfully executed !!!"
                    });

        getQuestionsByFormId(formId).then(({dataList = []}) => {
            setDataListQuestions(dataList);
        });*/

    };

    const onError = (message) => {
/*        addSnackBar({
                        type: SnackBarTypes.error,
                        message: message || "Login Failed",
                    });*/
        console.log('error ', message);
    };

    const handleUpload = async () => {
        // You can implement the file upload logic here, e.g., send the file to a server.
        // For this example, we'll simply log the selected file.
        console.log(' inside qid ', qId);
        console.log(' inside selectedFile ', selectedFile);
        afterSelectedFile(qId, selectedFile);

    };

    return (
        <div style={{ marginTop: '10px' }}>
            <input
                accept="image/*" // You can specify the accepted file types here
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload File
                </Button>
            </label>
            <Input
                value={selectedFile ? selectedFile.name : ''}
                readOnly
                style={{ marginLeft: '10px' }}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleUpload}
                disabled={!selectedFile}
                style={{ marginLeft: '10px', float: 'right' }}
            >
                Upload
            </Button>
        </div>
    );
}

export default FileUploadDynamic;
