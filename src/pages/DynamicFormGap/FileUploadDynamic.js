import React, { useState } from 'react';
import { Button, Input, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {getQuestionsByFormId, handleAuditFormQuestions} from "../../redux/actions/auditForm/auditFormQuestions/actions";
import {fileUploadForm} from "../../redux/actions/auditForm/action";
import {SnackBarTypes} from "../../utils/constants/snackBarTypes";

function FileUploadDynamic() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSuccess = async (response) => {
        console.log('response ', response);
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

        const data = {
            file: selectedFile
        };
        const formData = new FormData();
        formData.append("file", selectedFile);

        await fileUploadForm(1, 'basic-assessment', 1, formData, onSuccess, onError);
        console.log('Selected File:', selectedFile);
    };

    return (
        <div>
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
                style={{ marginTop: '10px' }}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleUpload}
                disabled={!selectedFile}
                style={{ marginTop: '10px' }}
            >
                Upload
            </Button>
        </div>
    );
}

export default FileUploadDynamic;
