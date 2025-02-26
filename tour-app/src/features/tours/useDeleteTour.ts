import { useMutation, useQueryClient } from "@tanstack/react-query"
import { tour } from "../../api/tourApi"
import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

export const useDeleteTour = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: deleteTour, isPending } = useMutation({
        mutationFn: (id: string) => tour.deleteTour(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tours"]
            })
            navigate(-1)
            toast.success('Tour deleted successfully')
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(`Error in deleting this tour: ${error.response.data.message}`)
        }
    })

    return { deleteTour, isPending }
}