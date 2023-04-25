import axios from 'axios';
import { baseURL } from '../../utils/constants/api';
import { getLSItem } from '../storage';
import { StorageConstants } from '../storage/constant';

axios.defaults.headers.common['requestToken'] = '';
axios.defaults.headers.common['signature'] = '';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';



const get = async (path = '', requestToken = false, requestSecret = null) => {
    let signature = '';
    if (requestSecret) {
        signature = "generateSignature()";
    }
    let token = "";

    if (requestToken) {
        token = `Bearer ${(await getLSItem(StorageConstants.token))?.value || ''}`;
    }

    const configHeaders = {
        headers: {
            Authorization: token,
            signature: signature,
        }
    };

    configHeaders.headers['Access-Control-Allow-Origin'] = '*';
    configHeaders.headers['Access-Control-Allow-Credentials'] = 'true';


    let url = baseURL + path;


    return new Promise((resolve, reject) => {
        axios.get(url, configHeaders)
            .then(response => {
                if (response.status === 200 && response.data) {
                    if (response.data.error) {
                        reject(response.data);
                    } else {
                        resolve(response.data);
                    }
                } else if (response.status === 200 || response.status === 201 || response.status === 204) {
                    reject({ error: 'Status : ' + response.status + ' no content.' });
                } else {
                    reject({ error: response.status ? 'An status : ' + response.status + ' has occurred.' : 'An unexpected error has occurred.' });
                }
            }).catch(error => {
                if (error.response) {
                    reject({ error: error.response || 'An unexpected error has occurred.' });
                } else {
                    reject({ error: 'An unexpected error has occurred.' });
                }
            })
    });
};

const post = async (path = '', req, requestToken = false, requestSecret = null) => {
    let signature = '';
    if (requestSecret) {
        signature = "generateSignature()";
    }
    let token = "";

    if (requestToken) {
        token = `Bearer ${(await getLSItem(StorageConstants.token))?.value || ''}`;
    }

    const configHeaders = {
        headers: {
            Authorization: token,
            signature: signature,
        }
    };

    configHeaders.headers['Access-Control-Allow-Origin'] = '*';
    configHeaders.headers['Access-Control-Allow-Credentials'] = 'true';


    let url = baseURL + path;

    return new Promise((resolve, reject) => {
        axios.post(url, req, configHeaders)
            .then(response => {
                if (response.status === 200 && response.data) {
                    if (response.data.error) {
                        reject(response.data);
                    } else {
                        resolve(response.data);
                    }
                } else if (response.status === 200 || response.status === 201 || response.status === 204) {
                    reject({ error: 'Status : ' + response.status + ' no content.' });
                } else {
                    reject({ error: response.status ? 'An status : ' + response.status + ' has occurred.' : 'An unexpected error has occurred.' });
                }
            }).catch(error => {
                if (error.response) {
                    reject({ error: error.response || 'An unexpected error has occurred.' });
                } else {
                    reject({ error: 'An unexpected error has occurred.' });
                }
            })
    });
};

const getFileFromApi = async (path = '', requestToken = false) => {

    let token = "";

    if (requestToken) {
        token = `Bearer ${(await getLSItem(StorageConstants.token))?.value || ''}`;
    }

    const configHeaders = {
        headers: {
            Authorization: token,
            signature: '',
        },
        responseType: 'arraybuffer'
    };

    let url = 's3bucket' + path;

    return new Promise((resolve, reject) => {
        axios.get(url, configHeaders)
            .then(response => {
                if (response.status === 200 && response.data) {
                    if (response.data.error) {
                        reject(response.data);
                    } else {
                        resolve(response.data);
                    }
                } else if (response.status === 200 || response.status === 201 || response.status === 204) {
                    reject({ error: 'Status : ' + response.status + ' no content.' });
                } else {
                    reject({ error: response.status ? 'An status : ' + response.status + ' has occurred.' : 'An unexpected error has occurred.' });
                }
            }).catch(error => {
                if (error.response) {
                    reject({ error: error.response || 'An unexpected error has occurred.' });
                } else {
                    reject({ error: 'An unexpected error has occurred.' });
                }
            })
    });
};

const postUploadFile = async (path = '', requestToken = false, key, id = 0, file) => {

    let token = "";

    if (requestToken) {
        token = `Bearer ${(await getLSItem(StorageConstants.token))?.value || ''}`;
    }

    const configHeaders = {
        headers: {
            Authorization: token,
            signature: '',
            id: id,
            filename: file.name || '',
            filetype: file.filetype || file.type || 'image/jpeg',
            key: key || '',
        }
    };
    let url = 's3bucket path / authorized url' + path;

    /**
    const formData = new FormData();
    formData.append(
        key,
        file,
        file.name
    );
    */

    return new Promise((resolve, reject) => {
        axios.post(url, file, configHeaders)
            .then(response => {
                if (response.status === 200 && response.data) {
                    if (response.data.error) {
                        reject(response.data);
                    } else {
                        resolve(response.data);
                    }
                } else if (response.status === 200 || response.status === 201 || response.status === 204) {
                    reject({ error: 'Status : ' + response.status + ' no content.' });
                } else {
                    reject({ error: response.status ? 'An status : ' + response.status + ' has occurred.' : 'An unexpected error has occurred.' });
                }
            }).catch(error => {
                if (error.response) {
                    reject({ error: error.response || 'An unexpected error has occurred.' });
                } else {
                    reject({ error: 'An unexpected error has occurred.' });
                }
            })
    });
};

export { get, post, postUploadFile, getFileFromApi };
