import express from "express";
import router from "./routes";
import {StatusCodes} from "http-status-codes";

const errorHandler = (err, req, res) => {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR
    res.status(status).json({error: err})
}

const app = express();

app.use(router)
app.use(errorHandler)

export default app
