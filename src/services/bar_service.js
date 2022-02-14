import UserRepository from "../repository/user_repository";

class BarService {
    static async getAgeGroupStats() {
        const stats = await UserRepository.groupAndCountByAgeGroup()
        return stats.map(x => {
            return {label: x["Age Range"], data: x["Count"]}
        })
    }
}

export default BarService
