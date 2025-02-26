import { booking } from "@/api/bookingApi"
import { CreateBookingType } from "@/types/bookingType"
import { useMutation } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useUpdateBooking = () => {
    const { mutate: updateBooking, isPending } = useMutation({
        mutationFn: ({ bookingData, id }: { bookingData: Partial<CreateBookingType>, id: string }) => booking.updateBooking(bookingData, id),
        onSuccess: () => {
            toast.success('Booking updated successfully')
        },
        onError: () => {
            toast.error('Failed to update booking')
        }
    })
    return { updateBooking, isPending }
}