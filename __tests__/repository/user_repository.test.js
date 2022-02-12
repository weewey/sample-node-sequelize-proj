import UserRepository from "../../src/repository/user_repository";
import {User} from "../../src/models"
import {ValidationError, ValidationErrorItem} from "sequelize";
import BusinessError from "../../src/errors/business_error";
import TechnicalError from "../../src/errors/technical_error";

describe("UserRepository", () => {

        it("should call User#findAll", async () => {
            const spy = jest.spyOn(User, "findAll").mockResolvedValue([]);
            await UserRepository.fetchAll()

            expect(spy).toBeCalled()
        })

        describe('CREATE', () => {
            it('should create user with the expected attributes', async () => {
                const userAttrs = {name: "Test", age: 10, gender: "M"}
                const spy = jest.spyOn(User, "create").mockResolvedValue();
                await UserRepository.create(userAttrs)
                expect(spy).toBeCalledWith(userAttrs)
            });

            describe('when it encounters Sequelize Validation error', () => {
                it("should throw a business error", async () => {
                    const userAttrs = {name: "Test", age: 10, gender: "A"}
                    jest.spyOn(User, "create").mockRejectedValue(
                        new ValidationError("Validation error in gender", [
                            new ValidationErrorItem("Only either M or F is allowed in gender",
                                "Validation error", "gender"
                            )])
                    )
                    await expect(UserRepository.create(userAttrs))
                        .rejects.toThrow(new BusinessError("Fields: [ gender ], message: [ Only either M or F is allowed in gender ]"))
                })
            });

            describe('when it encounters random errors', () => {
                it('should return technical error', async () => {
                    const userAttrs = {name: "Test", age: 10, gender: "A"}
                    jest.spyOn(User, "create").mockRejectedValue(new Error("test"))
                    await expect(UserRepository.create(userAttrs)).rejects.toThrow(new TechnicalError("test"))
                });
            });
        });
    }
)
