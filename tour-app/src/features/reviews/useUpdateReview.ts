import { review } from "@/api/reviewApi"
import { ReviewType } from "@/types/ReviewType"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateReview = () => {
    const { mutate: updateReview, isPending } = useMutation({
        mutationFn: ({ reviewBody, tourId, reviewId }: { reviewBody: Partial<ReviewType>; tourId: string; reviewId: string }) => review.updateReview(tourId, reviewId, reviewBody),
        onSuccess: () => {
            toast.success('Review is updated successfully')
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(`Failed to update review ${error.response.data.message}`)
        }
    })
    
    return { updateReview, isPending }
}