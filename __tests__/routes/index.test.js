import UserService from "../../src/services/user_service";
import request from "supertest"
import app from "../../src/app";

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
            expect(result.body.length).toEqual(1)
            expect(result.body[0]).toEqual(expect.objectContaining(user))
        })
    })
})
