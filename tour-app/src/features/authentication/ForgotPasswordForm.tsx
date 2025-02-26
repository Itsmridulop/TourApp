import { useForm } from 'react-hook-form';
import { useResetPassword } from './useResetPassword';
import { useParams } from 'react-router-dom';

const ForgotPasswordForm = () => {
    const { token } = useParams()
    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm<{ password: string; confirmPassword: string }>();
    const { resetPassword } = useResetPassword()

    const onSubmit = (data: { password: string; confirmPassword: string }) => {
        const dataObj = { ...data, token }
        resetPassword(dataObj, {
            onSettled: () => reset()
        })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your new password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            {...register('password', {
                                required: 'This feild is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                }
                            })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your new password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                },
                                validate: value => value === getValues().password || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
