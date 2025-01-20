import { Company, User } from "@prisma/client";

export interface CompanyEdit extends Company {
    weekDays: weekDays[],
    User: Pick<User, 'email' | 'password'>

}

interface weekDays {
    weekday: string, workHours: string
}