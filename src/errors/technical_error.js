import {StatusCodes} from "http-status-codes";

class TechnicalError extends Error {
    constructor(message) {
        super(message)
        this.status = StatusCodes.INTERNAL_SERVER_ERROR
    }
}

export default TechnicalError;
