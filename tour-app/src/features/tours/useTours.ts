import { useQuery } from "@tanstack/react-query"
import { tour } from "../../api/tourApi"

const useTours = (queryStr: string, best: boolean) => {
    const { data: tours, isLoading, isError } = useQuery({
        queryKey: ['tours', queryStr, best],
        queryFn: () => tour.getAllTours(queryStr, best)
    })
    return { tours, isLoading, isError }
}

export { useTours }