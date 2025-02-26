import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../api/authApi"

import toast from "react-hot-toast"

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: (data: FormData) => auth.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            })
            toast.success('Your profile is updated successfully')
        },
        onError: (error: {reponse: {data: {message: string}}}) => {
            toast.error(`Unable to update your profile: ${error.reponse.data.message}`)
        }
    })
    return { updateProfile, isPending }
}