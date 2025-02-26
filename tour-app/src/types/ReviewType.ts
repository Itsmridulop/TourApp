import { UserDataType } from "./userType";

export interface ReviewType {
    rating: number;
    _id?: string
    review: string;
    createdAt?: string;
    user?: { _id: string };
    tour?: string
}

export interface TourReviewType {
    rating: number;
    review: string;
    user: {
        _id: string;
        name: string;
        photo: string;
    },
    createdAt: string;
    tour: string;
    _id: string
}

export interface ReviewReturnType {
    status: string;
    data: {
        rating: number;
        review: string;
        user: UserDataType | string;
        tour: string | {name: string};
        createdAt: string;
        _id: string
    }[]
}