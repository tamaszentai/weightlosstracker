import {describe, it, expect} from 'vitest'


const allWeeks = [
    {year: 2023, weekNumber: 51},
    {year: 2023, weekNumber: 52},
    {year: 2024, weekNumber: 1},
    {year: 2024, weekNumber: 2},
];
describe('previousWeek', () => {
    it('should return the previous week based on Week 52 Year 2023', () => {
        const currentYear = 2023;
        const currentWeekNumber = 52;

        const previousWeek = allWeeks.find((week) => {
            if (currentYear === week.year) {
                return currentWeekNumber - 1 === week.weekNumber;
            } else if (currentYear > week.year && currentWeekNumber === 1) {
                return week.weekNumber === 52;
            }
        });

        expect(previousWeek).toEqual({year: 2023, weekNumber: 51});
    });

    it('should return the previous week based on Week 1 Year 2024', () => {
        const currentYear = 2024;
        const currentWeekNumber = 1;

        const previousWeek = allWeeks.find((week) => {
            if (currentYear === week.year) {
                return currentWeekNumber - 1 === week.weekNumber;
            } else if (currentYear > week.year && currentWeekNumber === 1) {
                return week.weekNumber === 52;
            }
        });

        expect(previousWeek).toEqual({year: 2023, weekNumber: 52});
    });

    it('should return the previous week based on Week 2 Year 2024', () => {
        const currentYear = 2024;
        const currentWeekNumber = 2;

        const previousWeek = allWeeks.find((week) => {
            if (currentYear === week.year) {
                return currentWeekNumber - 1 === week.weekNumber;
            } else if (currentYear > week.year && currentWeekNumber === 1) {
                return week.weekNumber === 52;
            }
        });

        expect(previousWeek).toEqual({year: 2024, weekNumber: 1});

    });
});