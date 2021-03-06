import UserRepository from "../../src/repository/user_repository";
import {sequelize, User} from "../../src/models"
import {ValidationError, ValidationErrorItem} from "sequelize";
import BusinessError from "../../src/errors/business_error";
import TechnicalError from "../../src/errors/technical_error";

describe("UserRepository", () => {

        it("should call User#findAll", async () => {
            const spy = jest.spyOn(User, "findAll").mockResolvedValue([]);
            await UserRepository.fetchAll()

            expect(spy).toBeCalled()
        })

        describe('create', () => {
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

        describe("#groupAndCountByGender", () => {
            it('should call User.findAll with the expected params', async () => {
                const spy = jest.spyOn(User, "findAll").mockResolvedValue([]);
                await UserRepository.groupAndCountByGender()
                expect(spy).toBeCalledWith({
                    "attributes": ["gender", [{
                        "args": [{"col": "gender"}],
                        "fn": "COUNT"
                    }, "count"]], "group": ["gender"]
                })
            });
        })

        describe('groupAndCountByAgeGroup', () => {
            it('should return the expected', async () => {
                const spy = jest.spyOn(sequelize, "query").mockResolvedValue([{
                    "Age Range": "Adults",
                    "Count": 2
                }, {"Age Range": "Seniors", "Count": 1}, {"Age Range": "Young Adults", "Count": 6}])
                await UserRepository.groupAndCountByAgeGroup()
                const expectedQuery = `
            select t.ageRange as [Age Range], count(*) as [Count]
            from (
                select case
                when age between 0 and 35 then 'Young Adults'
                when age between 36 and 50 then 'Adults'
                else 'Seniors' end as ageRange
                from Users) t
            group by t.ageRange`
                expect(spy).toBeCalledWith(expectedQuery, {type: "SELECT"})
            });
        });
    }
)
