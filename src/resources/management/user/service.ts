
import prismaClient from '../../../prisma';

export class UserService {

    async DetailUser(user_id: string) {
        return await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                type: true
            }
        })
    }

}