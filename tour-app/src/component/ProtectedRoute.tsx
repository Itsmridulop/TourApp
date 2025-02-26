import { ReactNode } from "react"
import { auth } from "../api/authApi"
import { Navigate } from "react-router-dom"
import { useUser } from "../features/users/useUser"

function ProtectedRoute({ children }: { children: ReactNode }) {
    const user = useUser()
    if (!auth.isAuthenticated() || !user)
        return <Navigate to="/login" replace={true} />
    return children
}

export default ProtectedRoute
