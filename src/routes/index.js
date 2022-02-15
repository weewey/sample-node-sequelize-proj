import express, {Router} from "express";
import asyncHandler from "express-async-handler";
import {createChartRules} from "../validation-rules/create_chart_rules";
import validateRequest from "./validation_middleware";
import BarController from "../controllers/bar_controller";
import ChartController from "../controllers/chart_controller";
import PieController from "../controllers/pie_controller";

export const router = Router()

router.use(express.json())

router.get("/chart", asyncHandler(ChartController.getChart))

router.post("/chart",
    validateRequest(createChartRules),
    asyncHandler(ChartController.createChartRow))

router.get("/pie", asyncHandler(PieController.getPie))

router.get("/bar", asyncHandler(BarController.getAgeGroupStats))

export default router
