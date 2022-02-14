import {sequelize, User} from '../models';
import {mapSequelizeErrorToErrorMessage} from "../utils/error-helpers";
import BusinessError from "../errors/business_error";
import Sequelize, {QueryTypes, ValidationError} from "sequelize";
import TechnicalError from "../errors/technical_error";
import {adults, youngAdults} from "../constants";

class UserRepository {

    static async fetchAll() {
        return User.findAll()
    }

    // async, await
    static async create(userAttributes) {
        try {
            return await User.create(userAttributes)
        } catch (e) {
            if (e instanceof ValidationError) {
                const errorMessage = mapSequelizeErrorToErrorMessage(e)
                throw new BusinessError(errorMessage)
            }
            throw new TechnicalError(e.message)
        }
    }

    //then, catch
    // static create(userAttributes) {
    //     return User.create(userAttributes)
    //         .then((createdUser) => createdUser)
    //         .catch((e) => {
    //             if (e instanceof ValidationError) {
    //                 const errorMessage = mapSequelizeErrorToErrorMessage(e)
    //                 throw new BusinessError(errorMessage)
    //             }
    //             throw new TechnicalError(e.message)
    //         })
    // }

    static async groupAndCountByGender() {
        return await User.findAll({
            group: ['gender'],
            attributes: ['gender', [Sequelize.fn('COUNT', Sequelize.col('gender')), "count"]],
        })
    }

    static async groupAndCountByAgeGroup() {
        const query = `
            select t.ageRange as [Age Range], count(*) as [Count]
            from (
                select case
                when age between ${youngAdults.ageStart} and ${youngAdults.ageEnd} then 'Young Adults'
                when age between ${adults.ageStart} and ${adults.ageEnd} then 'Adults'
                else 'Seniors' end as ageRange
                from Users) t
            group by t.ageRange`
        return await sequelize.query(query, {type: QueryTypes.SELECT});
    }
}

export default UserRepository
