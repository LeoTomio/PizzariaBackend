import { Log } from "@prisma/client";

export type LogInput = Omit<Log, 'id' | 'created_at' | 'user_id' | 'company_id'> & {
    user_id?: string;
    url: string
};