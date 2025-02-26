import { useQuery } from "@tanstack/react-query"
import { user } from "../../api/userApi"

export const useUsers = () => {
    const { data: users, isPending, isError } = useQuery({
        queryKey: ['all-users'],
        queryFn: () => user.getUsers()
    })
    
    return { users, isPending, isError }
}