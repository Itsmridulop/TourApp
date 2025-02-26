import { user } from "@/api/userApi"
import { useQuery } from "@tanstack/react-query"

export const useAssociatedTour = (id: string) => {
    const { data: associatedTours, isLoading: isAssociatedToursLoading } = useQuery({
        queryKey: ['associatedTours', id],
        queryFn: () => user.getAssociatedTour(id)
    })
    return { associatedTours, isAssociatedToursLoading }
}