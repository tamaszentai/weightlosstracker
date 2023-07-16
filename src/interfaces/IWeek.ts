import {IDay} from "./IDay";

export interface IWeek {
    weekStartDate: Date,
    year: number,
    weekNumber: number,
    days: IDay[]
}