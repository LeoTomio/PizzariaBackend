import { Log } from "@prisma/client";

export type LogInput = Omit<Log, 'id' | 'created_at' | 'user_id' | 'company_id'> & {
    user_id?: string;
    url: string
};

export enum LogType {
    delete = "Exclusão",
    create = "Criação",
    update = "Edição",
    getOne = "Seleção",
    list = "Listagem",
    statusChange = "Mudança de status",
    active = "Ativação/Desativação",
    info = "Buscando dados",
    autentication = "Autenticação",
    validate = "Validação",
}