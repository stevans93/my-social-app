module.exports = {
    httpStatus: {
        EXIST: {
            status: 202,
            send: {msg: 'Already exists'}
        },
        SERVICE_ERROR: {
            status: 500,
            send: {msg: 'Service error'}
        }
    }
}