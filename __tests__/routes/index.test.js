import UserService from "../../src/services/user_service";
import request from "supertest"
import app from "../../src/app";
import {StatusCodes} from "http-status-codes";
import PieService from "../../src/services/pie_service";
import BarService from "../../src/services/bar_service";

describe("Routes", () => {
    describe("GET /chart", () => {
        it("should return the expected", async () => {
            const user = {
                "id": 1,
                "name": "Rubi",
                "age": 31,
                "gender": "F"
            }
            jest.spyOn(UserService, "getUsers").mockResolvedValue([user]);
            const result = await request(app).get("/chart")
            expect(result.body.data.length).toEqual(1)
            expect(result.body.data[0]).toEqual(expect.objectContaining(user))
        })
    })

    describe("POST /chart", () => {
        it("should return the created user", async () => {
            const userAttrs = {
                "name": "Rubi",
                "age": 31,
                "gender": "F"
            }
            jest.spyOn(UserService, "create").mockResolvedValue({id: 1, ...userAttrs})
            const result = await request(app).post("/chart").send(userAttrs);
            expect(result.body).toEqual({id: 1, ...userAttrs})
        })

        it('should return StatusCode 201', async () => {
            const userAttrs = {
                "name": "Rubi",
                "age": 31,
                "gender": "F"
            }
            jest.spyOn(UserService, "create").mockResolvedValue({id: 1, ...userAttrs})
            const result = await request(app).post("/chart").send(userAttrs);
            expect(result.status).toEqual(StatusCodes.CREATED)
        });
        describe('error scenarios', () => {
            it('should return 400 status code when gender is invalid', async () => {
                const userAttrs = {
                    "name": "Rubi",
                    "age": 31,
                    "gender": "A"
                }
                const result = await request(app).post("/chart").send(userAttrs);
                expect(result.status).toEqual(StatusCodes.BAD_REQUEST)
            });

            it('should return the expected error message', async () => {
                const userAttrs = {
                    "name": "Rubi",
                    "age": 31,
                    "gender": "A"
                }
                const result = await request(app).post("/chart").send(userAttrs);
                expect(result.body).toEqual(
                    {errors: [expect.objectContaining({"msg": "gender should only be M or F"})]}
                )
            });

            it("should return 400 when name contains number", async () => {
                const userAttrs = {
                    "name": "Rubi1",
                    "age": 31,
                    "gender": "M"
                }
                const result = await request(app).post("/chart").send(userAttrs);
                expect(result.status).toEqual(StatusCodes.BAD_REQUEST)
            })

            it("should return 400 when age is not a number", async () => {
                const userAttrs = {
                    "name": "Rubi",
                    "age": "a",
                    "gender": "M"
                }
                const result = await request(app).post("/chart").send(userAttrs);
                expect(result.status).toEqual(StatusCodes.BAD_REQUEST)
            })
        });
    });

    describe('GET /pie', () => {
        it('should return the expected value', async () => {
            jest.spyOn(PieService, "getGenderRatio").mockResolvedValue([
                {label: "M", count: 1, gender: "M"}])
            const result = await request(app).get("/pie")
            expect(result.body).toEqual(
                {data: [{label: "M", count: 1, gender: "M"}]}
            )
        });
    });

    describe('GET /bar', () => {
        it('should return the expected', async () => {
            jest.spyOn(BarService, "getAgeGroupStats").mockResolvedValue([
                {label: "Young Adults", count: 1}])
            const result = await request(app).get("/bar")
            expect(result.body).toEqual(
                {data: [{label: "Young Adults", count: 1}]}
            )
        });
    });
})
