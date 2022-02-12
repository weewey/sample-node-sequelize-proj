import UserRepository from "../repository/user_repository.js";

class UserService {
    static async getUsers() {
        return UserRepository.fetchAll()
    }

    static async create(userAttrs) {
        try {
            return await UserRepository.create(userAttrs)
        } catch (e) {
            throw e
        }
    }
}

export default UserService;
