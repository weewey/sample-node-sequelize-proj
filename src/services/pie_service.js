import UserRepository from "../repository/user_repository";

class PieService {
    static async getGenderRatio() {
        const genderRatio = await UserRepository.groupAndCountByGender()
        return genderRatio.map((x) => {return {label: x.dataValues.gender, data: x.dataValues.count}})
    }
}

export default PieService
