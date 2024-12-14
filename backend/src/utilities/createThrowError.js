class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

function createHttpError(message, code) {
    throw new HttpError(message, code);
}

module.exports = createHttpError;