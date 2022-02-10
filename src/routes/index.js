import express, {Router} from "express";
import asyncHandler from "express-async-handler";
import UserService from "../services/user_service.js";

export const router = Router()

router.use(express.json())

router.get("/chart",
    asyncHandler(async (req, res, next) => {
        const users = await UserService.getUsers()
        res.json(users)
    }))

export default router
