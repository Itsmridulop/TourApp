import { review } from "@/api/reviewApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast";

export const useDeleteReview = () => {
    const querClient = useQueryClient()
    const {mutate: deleteReview, isPending} = useMutation({
        mutationFn: (data: {tourId: string; reviewId: string}) => review.deleteReview(data.tourId, data.reviewId),
        onSuccess: () => {
            querClient.invalidateQueries({queryKey: ['tour']})
            toast.success('Review is deleted successfully')
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(`Failed to delete review ${error.response.data.message}`)
        }
    })

    return {deleteReview, isPending}
}