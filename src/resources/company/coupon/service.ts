import prismaClient from '../../../prisma';

export class CouponService {

    async Find(url: string, code: string) {
        return await prismaClient.coupon.findFirst({
            select: { 
                value: true
            },
            where: {
                isActive: true,
                code,
                company: {
                    url
                }
            }
        })
    }
}
