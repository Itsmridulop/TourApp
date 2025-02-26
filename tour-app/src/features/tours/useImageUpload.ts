import { tour } from "@/api/tourApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useImageUpload = () => {
    const queryClient = useQueryClient()

    const { mutate: imageUpload, isPending } = useMutation({
        mutationFn: ({ formData, id }: { formData: FormData, id?: string }) => tour.imageUpload(formData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tour'] })
            toast.success('Images are uploaded successfully')
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(`Error in uploading images ${error.response.data.message}`)
        }
    })
    return { imageUpload, isPending }
}