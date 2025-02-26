import { tour } from "@/api/tourApi"
import { CreateTourType } from "@/types/tourTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useUpdateTour = () => {
    const queryClient = useQueryClient()

    const { mutate: updateTour, isPending } = useMutation({
        mutationFn: ({ tourData, id }: { tourData: Partial<CreateTourType>, id?: string }) => tour.updateTour(tourData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tour']
            })
            toast.success('Tour is updated successfully')
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(`Failed to update tour: ${error.response.data.message}`)
        }
    })

    return { updateTour, isPending }
}