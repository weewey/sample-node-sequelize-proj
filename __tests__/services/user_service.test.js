import UserRepository from "../../src/repository/user_repository";
import UserService from "../../src/services/user_service";

describe("UserService", () => {
    it("should call UserRepository#fetchAll", async () => {
        const spy = jest.spyOn(UserRepository, "fetchAll").mockResolvedValue([]);
        await UserService.getUsers()

        expect(spy).toBeCalled()
    })
})
