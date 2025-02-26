import { useMutation, useQueryClient } from "@tanstack/react-query"
import { user } from "../../api/userApi"
import { useNavigate } from "react-router-dom"
import { auth } from "../../api/authApi"

import toast from "react-hot-toast"

export const useDeleteMe = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: deleteMe, isPending } = useMutation({
        mutationFn: () => user.deleteMe(),
        onSuccess: () => {
            auth.removeToken()
            navigate('/login')
            queryClient.removeQueries()
            toast.success('Your account is deleted successfully')
        },
        onError: (error: {reponse: {data: {message: string}}}) => {
            toast.error(`Error in deleting your account ${error.reponse.data.message}`)
        }
    })

    return { deleteMe, isPending }
} 