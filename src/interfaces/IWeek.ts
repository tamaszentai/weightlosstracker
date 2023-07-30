import {type IDay} from "./IDay";

export interface IWeek {
    weekStartDate: Date,
    weekEndDate: Date,
    year: number,
    weekNumber: number,
    weeklyAverage: number,
    days: IDay[]
}