import { useMutation, useQueryClient } from "@tanstack/react-query"
import { user } from "../../api/userApi"

import toast from "react-hot-toast"

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: ({ formData, id }: { formData: FormData; id?: string }) => user.updateUser({ formData, id }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["last-user"]
            })
            toast.success('User data is updated successfully')
        },
        onError: (error: {reponse: {data: {message: string}}}) => {
            toast.error(`Failed to update user data: ${error.reponse.data.message}`)
        }
    })

    return { updateUser, isPending }
}