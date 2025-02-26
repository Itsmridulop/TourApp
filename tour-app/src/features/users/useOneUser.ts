import { useQuery } from "@tanstack/react-query"
import { user } from "../../api/userApi"

export const useOneUser = (id: string) => {
    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['last-user'],
        queryFn: () => user.getOneUser(id)
    })

    return { userInfo, isLoading }
}