import { tour } from "@/api/tourApi"
import { useQuery } from "@tanstack/react-query"

export const useStats = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: () => tour.getStats(),
    })
    return { stats, isLoading }
} 