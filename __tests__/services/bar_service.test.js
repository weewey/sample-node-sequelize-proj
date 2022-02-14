import BarService from "../../src/services/bar_service";
import UserRepository from "../../src/repository/user_repository";

describe('BarService', () => {
    describe('getAgeGroupStats', () => {
        it('should return the expected value', async () => {
            jest.spyOn(UserRepository, "groupAndCountByAgeGroup")
                .mockResolvedValue([
                    {"Age Range": "Adults", "Count": 2},
                    {"Age Range": "Young Adults", "Count": 6},
                    {"Age Range": "Seniors", "Count": 1},
                ])
            const result = await BarService.getAgeGroupStats()
            expect(result).toEqual(
                [
                    {label: "Adults", data: 2},
                    {label: "Young Adults", data: 6},
                    {label: "Seniors", data: 1},
                ]
            )
        });

        describe('when the data is an empty array', () => {
            it('should return an empty array', async () => {
                jest.spyOn(UserRepository, "groupAndCountByAgeGroup")
                    .mockResolvedValue([])
                expect(await BarService.getAgeGroupStats()).toEqual([])
            });
        });

    });
});
