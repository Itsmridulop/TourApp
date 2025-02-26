import { booking } from "@/api/bookingApi"
import { useQuery } from "@tanstack/react-query"

export const useBookingOfUser = (id: string) => {
    const { data: bookingData, isLoading } = useQuery({
        queryKey: ["booking", id],
        queryFn: () => booking.getBookingOfUser(id)
    })
    return { bookingData, isLoading }
}