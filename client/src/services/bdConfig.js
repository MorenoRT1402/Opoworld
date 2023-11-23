const CONTENT_TYPES = {
    JSON : 'application/json',
    FORM_DATA: 'multipart/form-data'
}

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getHeader = (contentType = 'application/json') => {
    return {
        headers: {
            'Content-Type': contentType, 
            Authorization: token
        }
    };
};

export default { CONTENT_TYPES, setToken, getHeader }