import { tour } from "@/api/tourApi"
import { useQuery } from "@tanstack/react-query"

export const useMonthlyPlan = () => {
    const { data: monthlyPlan, isLoading } = useQuery({
        queryKey: ['monthly-plan'],
        queryFn: () => tour.getMonthlyPlan()
    })
    return { monthlyPlan, isLoading }
}