import { ReactNode } from "react"
import { Navigate } from "react-router-dom";
import { useUser } from "../features/users/useUser";

import toast from "react-hot-toast";
import Spinner from "./Spinner";

export interface User {
    data: {
        name: string;
        role: string;
        email: string;
        photo: string
    }
}

function AuthRoute({ children, role }: { children: ReactNode; role: string[] }) {
    const { user, isLoading } = useUser()
    if (isLoading) return <Spinner />
    if (!role.includes(user?.data.role ?? "")) {
        toast.error('Your are not autherized to access that path')
        return <Navigate to='/' />
    }
    return children
}

export default AuthRoute