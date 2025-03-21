import { Company, Coupon } from '@prisma/client';
import prismaClient from '../../../../prisma';
import { Token } from '../../../user/interface';
import { CompanyEdit } from './interface';
import moment from 'moment';

export class CouponService {

    async GetOne(url: string, token: Token) {
        return await prismaClient.coupon.findFirst({
            select: {
                code: true,
                value: true,
                isActive: true
            },
            where: {
                company: {
                    url
                }
            }
        })

    }

    async List(url: string) {
        return await prismaClient.coupon.findMany({
            select: {
                id: true,
                code: true,
                value: true,
                isActive: true
            },
            where: {
                company: {
                    url
                }
            }
        })
    }

    async Create(CouponCreate: Coupon) {
        return await prismaClient.coupon.create({
            data: {
                code: CouponCreate.code,
                value: CouponCreate.value,
                company_id: CouponCreate.company_id
            }
        })

    }

    async Edit(couponUpdate: Coupon) {
        return await prismaClient.coupon.update({
            data: {
                code: couponUpdate.code,
                value: couponUpdate.value,
                updated_at: moment().toDate()
            },
            where: {
                id: couponUpdate.id
            }
        })
    }

    async Delete(id: Coupon['id']) {
        return await prismaClient.coupon.delete({
            where: { id }
        })
    }
    async ChangeStatus(id: string) {
        let isActive = (await prismaClient.coupon.findFirst({
            select: {
                isActive: true
            },
            where: {
                id
            }
        })).isActive
        return await prismaClient.coupon.update({
            data: {
                isActive: !isActive,
                updated_at: moment().toDate()
            },
            where: {
                id: id
            }
        })
    }
}
