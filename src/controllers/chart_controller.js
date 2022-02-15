import UserService from "../services/user_service";
import {validationResult} from "express-validator";
import {StatusCodes} from "http-status-codes";

class ChartController {
    static async getChart(req,res) {
        const users = await UserService.getUsers()
        res.json(users)
    }

    static async createChartRow(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, gender, age} = req.body;
        const user = await UserService.create({name, gender, age})
        res.status(StatusCodes.CREATED).json(user)
    }
}

export default ChartController
