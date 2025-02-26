import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../api/authApi"
import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

const useSignup = () => {
    const navigate = useNavigate()
    const queryCleint = useQueryClient()

    const { mutate: signup, isPending } = useMutation({
        mutationFn: (userData: { name: string; password: string; confirmPassword: string; email: string }) => auth.signup(userData),
        onSuccess: data => {
            queryCleint.setQueryData(['user'], data)
            navigate('/', {
                replace: true
            })
            toast.success('Signup successfully')
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(`Signup failed: ${error.response.data.message}`)
        }
    })
    return { signup, isPending }
}

export { useSignup }