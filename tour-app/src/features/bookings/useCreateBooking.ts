import { booking } from "@/api/bookingApi"
import { CreateBookingType } from "@/types/bookingType"
import { useMutation } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useCreateBooking = () => {
    const { mutate: createBooking, isPending } = useMutation({
        mutationFn: (bookingData: CreateBookingType) => booking.createBooking(bookingData),
        onSuccess: () => {
            toast.success('Booking is created successfully')
        },
        onError: (error: {reponse: {data: {message: string}}}) => {
            toast.error(`Unable to create booking ${error.reponse.data.message}`)
        }
    })
    return { createBooking, isPending }
}