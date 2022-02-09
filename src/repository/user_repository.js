import {User} from '../models';

class UserRepository {

    static async fetchAll() {
        return User.findAll()
    }
}

export default UserRepository
