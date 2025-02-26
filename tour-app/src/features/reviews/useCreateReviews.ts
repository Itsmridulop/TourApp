import { review } from "@/api/reviewApi"
import { ReviewType } from "@/types/ReviewType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useCreateReviews = () => {
    const querClient = useQueryClient()
    const { mutate: createReview, isPending } = useMutation({
        mutationFn: (reviewData: ReviewType) => review.createReviews(reviewData),
        onSuccess: () => {
            toast.success('Your review is added successfully')
            querClient.invalidateQueries({queryKey: ['tour']})
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(`Failed to add review ${error.response.data.message}`)
        }
    })

    return { createReview: createReview, isPending }
}