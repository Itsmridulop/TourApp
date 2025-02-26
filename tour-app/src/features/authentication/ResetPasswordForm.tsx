import { useForm } from "react-hook-form"
import { useForgotPassword } from "./useForgotPassword"

function ResetPasswordForm({onClose}: {onClose?: () => void}) {
    const { forgotPassword } = useForgotPassword()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<{ email: string }>()

    const submitHandler = (data: { email: string }) => {
        forgotPassword(data, {
            onSettled: () => reset(),
            onSuccess: () => onClose?.()
        })
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-6 w-[28rem]">
                <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your email address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        {...register('email', {
                            required: 'This feild is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    {errors?.email?.message && <div>{errors.email.message}</div>}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                        Send Reset Token
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordForm
