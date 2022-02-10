import UserRepository from "../repository/user_repository.js";

class UserService {
    static async getUsers(){
        return UserRepository.fetchAll()
    }
}

export default UserService;
