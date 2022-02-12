import {User} from '../models';
import {mapSequelizeErrorToErrorMessage} from "../utils/error-helpers";
import BusinessError from "../errors/business_error";
import {ValidationError} from "sequelize";
import TechnicalError from "../errors/technical_error";

class UserRepository {

    static async fetchAll() {
        return User.findAll()
    }

    static async create(userAttributes) {
        let user;
        try {
            user = await User.create(userAttributes)
        } catch (e) {
            if (e instanceof ValidationError) {
                const errorMessage = mapSequelizeErrorToErrorMessage(e)
                throw new BusinessError(errorMessage)
            }
            throw new TechnicalError(e.message)
        }
        return user;
    }
}

export default UserRepository
