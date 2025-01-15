import { Category, User } from "@prisma/client";

export interface CompanyEdit extends Category {
    weekDays: weekDays[],
    User: Pick<User, 'email' | 'password'>

}

interface weekDays {
    weekday: string, workHours: string
}