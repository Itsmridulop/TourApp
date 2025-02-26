import { useQuery } from "@tanstack/react-query"
import { tour } from "../../api/tourApi"

export const useTour = (id: string) => {
    const { data: tourData, isLoading } = useQuery({
        queryKey: ['tour'],
        queryFn: () => tour.getOneTour(id)
    })

    return { tourData, isLoading }
}