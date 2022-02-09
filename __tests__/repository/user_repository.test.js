import UserRepository from "../../src/repository/user_repository";
import {User} from "../../src/models"

describe("UserRepository", () => {

        it("should call User#findAll", async () => {
            const spy = jest.spyOn(User, "findAll").mockResolvedValue([]);
            await UserRepository.fetchAll()

            expect(spy).toBeCalled()
        })
    }
)
