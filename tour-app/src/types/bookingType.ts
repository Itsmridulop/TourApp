import { UserDataType } from "./userType";

export interface CreateBookingType {
    members: number;
    paymentMethod: string,
    tourId?: string,
    status?: string,
    canceledAt?: number,
    paidAt?: Date,
    paid?: boolean
}

export interface BookingDataType {
    _id: string,
    tour: {
        _id: string,
        name: string,
        startDates: string[],
        guide: UserDataType[]
    } | string,
    user: string,
    paidAt?: Date,
    canceledAt?: Date,
    members: number,
    createdAt: Date,
    paymentMethod: string,
    status: string,
    paid: boolean
}

export interface ResponseBookingType {
    status: string,
    result: number,
    data: BookingDataType[]
}