import jwt from 'jsonwebtoken';
import { Token } from '../resources/user/interface';

export function tokenDecodifier(token) {
    const tokenSplit = token?.split(' ')[1];
    const decoded = jwt.verify(tokenSplit, process.env.JWT_SECRET);
    return decoded;
}


export function isUser(token: Token) {
    return token?.type === "USER";
}
export function isAdm(token: Token) {
    return token?.type === "ADMIN";
}
export function isRestaurant(token: Token) {
    return token?.type === "RESTAURANT";
}