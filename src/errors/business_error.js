import {StatusCodes} from "http-status-codes";

class BusinessError extends Error {
    constructor(message) {
        super(message)
        this.status = StatusCodes.BAD_REQUEST
    }
}

export default BusinessError;
