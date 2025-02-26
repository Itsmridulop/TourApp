import { useForm } from "react-hook-form"
import { useLogin } from "./useLogin"

import Footer from "../../component/Footer"
import Spinner from "../../component/Spinner";
import Modal from "../../component/Modal";
import ResetPasswordForm from "./ResetPasswordForm";

function Login() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<{ email: string; password: string }>()
    const { login, isPending } = useLogin()

    const submitHandler = (data: { email: string; password: string }) => {
        login(data, {
            onSettled: () => reset()
        })
    }

    if (isPending) return <Spinner />

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-col flex-grow items-center justify-center">
                <div className="bg-white shadow-2xl rounded-lg p-10 w-screen max-w-lg">
                    <h2 className="text-3xl font-semibold text-green-500 text-center mb-8">
                        LOG INTO YOUR ACCOUNT
                    </h2>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="w-full px-5 py-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                {...register('email', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Please Enter a valid email'
                                    }
                                })}
                            />
                            {errors?.email?.message && <div className="text-red-500 mt-1">{errors.email.message}</div>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="• • • • • • • •"
                                className="w-full px-5 py-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                {...register('password', {
                                    required: 'This field is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                            />
                            {errors?.password?.message && <div className="text-red-500 mt-1">{errors.password.message}</div>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded-md font-medium text-lg hover:bg-green-600 transition duration-300"
                        >
                            LOGIN
                        </button>
                    </form>
                    <Modal>
                        <Modal.Open opens="resetPassword">
                            <button>
                                Forget Your Password?
                            </button>
                        </Modal.Open>
                        <Modal.Window name="resetPassword">
                            <ResetPasswordForm />
                        </Modal.Window>
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
