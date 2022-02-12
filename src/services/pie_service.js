import UserRepository from "../repository/user_repository";

class PieService {
    static async getGenderRatio() {
        const genderRatio = await UserRepository.groupAndCountByGender()
        return genderRatio.map((x) => {return {label: x.gender, ...x}})
    }
}

export default PieService
