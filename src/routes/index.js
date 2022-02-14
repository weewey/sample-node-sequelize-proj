import express, {Router} from "express";
import asyncHandler from "express-async-handler";
import UserService from "../services/user_service.js";
import {StatusCodes} from "http-status-codes";
import {validationResult} from "express-validator";
import {createChartRules} from "../validation-rules/create_chart_rules";
import validateRequest from "./validation_middleware";
import PieService from "../services/pie_service";
import BarService from "../services/bar_service";

export const router = Router()

router.use(express.json())

router.get("/chart",
    asyncHandler(async (req, res, next) => {
        const users = await UserService.getUsers()
        res.json(users)
    }))

router.post("/chart",
    validateRequest(createChartRules),
    asyncHandler(async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, gender, age} = req.body;
        const user = await UserService.create({name, gender, age})
        res.status(StatusCodes.CREATED).json(user)
    }))

router.get("/pie",
    asyncHandler(async (req, res) => {
        const genderRatio = await PieService.getGenderRatio()
        res.json({data: genderRatio})
    }))

router.get("/bar",
    asyncHandler(async (req, res) => {
        const ageGroupStats = await BarService.getAgeGroupStats()
        res.json({data: ageGroupStats})
    }))

export default router
