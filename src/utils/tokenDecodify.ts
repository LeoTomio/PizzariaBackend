import jwt from 'jsonwebtoken';

export function tokenDecodifier(token) {
    const tokenSplit = token?.split(' ')[1];
    const decoded = jwt.verify(tokenSplit, process.env.JWT_SECRET);
    return decoded;


}