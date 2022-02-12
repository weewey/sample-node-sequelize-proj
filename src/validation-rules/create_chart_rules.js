import {body} from "express-validator";

const nameRule = body("name")
    .exists()
    .withMessage("name must be present")
    .bail()
    .isAlpha("en-US", {ignore: " "})
    .withMessage("name should only contain alphabets")
    .trim();

const genderRule = body("gender")
    .exists()
    .withMessage("gender must be present")
    .bail()
    .isIn(["M", "F"])
    .withMessage("gender should only be M or F")

const ageRule = body("age")
    .exists()
    .withMessage("age must be present")
    .bail()
    .isNumeric()
    .withMessage("age should be a number")
    .toInt(10)

export const createChartRules = [
    nameRule, genderRule, ageRule
]
