import UserRepository from "../../src/repository/user_repository";
import PieService from "../../src/services/pie_service";

describe('PieService', () => {
    it('should call UserRepository.groupAndCountByGender', async () => {
        const spy = jest.spyOn(UserRepository, "groupAndCountByGender")
            .mockResolvedValue([])
        await PieService.getGenderRatio()
        expect(spy).toBeCalled()
    });

    it('should return the expected', async () => {
        jest.spyOn(UserRepository, "groupAndCountByGender")
            .mockResolvedValue([{count: 2, gender: "M"}])
        const genderRatio = await PieService.getGenderRatio()
        expect(genderRatio).toEqual(
            [{"label": "M", "count": 2, "gender": "M"}]
        )
    });

    describe('if there is no records', () => {
        it('should return data with an empty array', async () => {
            jest.spyOn(UserRepository, "groupAndCountByGender")
                .mockResolvedValue([])
            const genderRatio = await PieService.getGenderRatio()
            expect(genderRatio).toEqual([])
        });
    });
});
