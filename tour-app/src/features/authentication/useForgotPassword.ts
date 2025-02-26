import { useMutation } from "@tanstack/react-query";
import { auth } from "../../api/authApi";

import toast from "react-hot-toast";

export const useForgotPassword = () => {
    const { mutate: forgotPassword, isPending } = useMutation({
        mutationFn: (data: {email: string}) => auth.forgotPassword(data),
        onSuccess: () => {
            toast.success("Password reset email sent successfully");
        },
        onError: (error: {response: {data: {message: string}}}) => {
            toast.error(error.response.data.message);
        }
    });
    
    return { forgotPassword, isPending };
}
