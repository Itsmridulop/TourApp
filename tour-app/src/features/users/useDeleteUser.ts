import { useMutation, useQueryClient } from "@tanstack/react-query"
import { user } from "../../api/userApi"

import toast from "react-hot-toast"

export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: (id: string) => user.deleteUser(id),
        onSuccess: () => {
            toast.success('User is deleted successfully')
            queryClient.invalidateQueries({
                queryKey: ['all-users']
            })
        },
        onError: (error: {reponse: {data: {message: string}}}) => {
            toast.error(`Error in deleting this user: ${error.reponse.data.message}`)
        }
    })
    
    return { deleteUser, isPending }
}