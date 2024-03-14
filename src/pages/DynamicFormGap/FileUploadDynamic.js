import React, {useState} from 'react';
import {Button, Input} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

    const handleUpload = async () => {
        afterSelectedFile(qId, selectedFile);

    };

    return (
        <div style={{marginTop: '10px'}}>
            <input
                accept="image/*"
                style={{display: 'none'}}
                id={"file-upload-" + qId}
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor={"file-upload-" + qId}>
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon/>}
                >
                    Upload File
                </Button>
            </label>
            <Input
                id={"file-upload-input-" + qId}
                name={"file-upload-input-" + qId}
                value={selectedFile ? selectedFile.name : ''}
                readOnly
                style={{marginLeft: '10px'}}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleUpload}
                disabled={!selectedFile}
                style={{marginLeft: '10px', float: 'right'}}
            >
                Upload
            </Button>
        </div>
    );
}

export default FileUploadDynamic;
