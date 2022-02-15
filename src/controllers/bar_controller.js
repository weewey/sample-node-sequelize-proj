import BarService from "../services/bar_service";

class BarController {
    static async getAgeGroupStats(req, res){
        const ageGroupStats = await BarService.getAgeGroupStats()
        return res.json({data: ageGroupStats})
    }
}

export default BarController
