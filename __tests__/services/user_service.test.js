import UserRepository from "../../src/repository/user_repository";
import UserService from "../../src/services/user_service";

describe("UserService", () => {
    it("should call UserRepository#fetchAll", async () => {
        const spy = jest.spyOn(UserRepository, "fetchAll").mockResolvedValue([]);
        await UserService.getUsers()

        expect(spy).toBeCalled()
    })

    describe('#CREATE', () => {
        it("should call UserRepository.create", async () => {
            const userAttrs = {name: "Test", age: 10, gender: "A"}
            const spy = jest.spyOn(UserRepository,
                "create").mockResolvedValue([]);

            await UserService.create(userAttrs)
            expect(spy).toBeCalled()
        })

        it('should throw the error from UserRepository', async () => {
            const userAttrs = {name: "Test", age: 10, gender: "A"}
            jest.spyOn(UserRepository,
                "create").mockRejectedValue(new Error("test"));
            await expect(UserService.create(userAttrs)).rejects.toThrow(new Error("test"))
        });
    });

})
