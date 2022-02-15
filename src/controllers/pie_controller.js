import PieService from "../services/pie_service";

class PieController {
    static async getPie(req, res) {
        const genderRatio = await PieService.getGenderRatio()
        res.json({data: genderRatio})
    }
}

export default PieController
