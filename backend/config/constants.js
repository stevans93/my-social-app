module.exports = {
    httpStatus: {
        EXIST: {
            status: 202,
            send: {msg: 'Already exists'}
        },
        SERVICE_ERROR: {
            status: 500,
            send: {msg: 'Service error'}
        },
        TOKEN_EXPIRES: {
            status: 401,
            send: {msg: 'Token has expired'}
        },
        NOT_EXIST: {
            status: 415,
            send: {msg: 'Data not exist'}
        },
        INVALID_DATA: {
            status: 205,
            send: {msg: 'Invalid data.'}
        },
    }
}