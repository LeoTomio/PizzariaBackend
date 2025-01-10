import { Type } from "@prisma/client";

interface PayLoad {
    sub: string
}


interface UserRequest {
    name: string;
    email: string;
    password: string;
    type: Type
}

interface AuthRequest {
    email: string;
    password: string
}

interface Token {
    name: string,
    email: string,
    type: string,
    company_id: string
    sub:string //userId
}

export { PayLoad, UserRequest, AuthRequest, Token }


