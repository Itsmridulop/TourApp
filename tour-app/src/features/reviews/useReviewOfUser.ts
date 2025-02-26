import { review } from "@/api/reviewApi"
import { useQuery } from "@tanstack/react-query"

export const useReviewOfUser = (id: string) => {
    const { data: reviewData, isLoading } = useQuery({
        queryKey: ['review', id],
        queryFn: () => review.getReviewOfUser(id)
    })
    return { reviewData, isLoading }
}