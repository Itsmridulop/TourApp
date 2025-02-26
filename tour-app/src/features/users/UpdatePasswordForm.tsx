import { useForm } from "react-hook-form";
import { UserPasswordType } from "../../types/userType";
import { useUpdatePassword } from "./useUpdatePassword";

function UpdatePasswordForm({ onClose }: { onClose?: () => void }) {
    const { handleSubmit, register, reset, getValues, formState: { errors } } = useForm<UserPasswordType>()
    const { updatePassword } = useUpdatePassword()

    const submitHandler = (data: UserPasswordType) => {
        updatePassword(data, {
            onSettled: () => reset(),
            onSuccess: () => onClose?.()
        })
    }

    return (
        <div className="max-w-md mx-auto p-8 mt-10 w-[28rem]">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Update Password</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2" htmlFor="currentPassword">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter current password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                        {...register('password', {
                            required: 'This feild is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long',
                            }
                        })}
                    />
                </div>
                {errors?.password?.message && <div>{errors.password.message}</div>}
                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                        {...register('newPassword', {
                            required: 'This feild is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long',
                            }
                        })}
                    />
                </div>
                {errors?.newPassword?.message && <div>{errors.newPassword.message}</div>}
                <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-2" htmlFor="confirmPassword">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="newPasswordConfirm"
                        placeholder="Confirm new password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                        {...register('newPasswordConfirm', {
                            required: 'This feild is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long',
                            },
                            validate: (val) => val === getValues().newPassword || 'Passwords do not match'
                        })}
                    />
                </div>
                {errors?.newPasswordConfirm?.message && <div>{errors.newPasswordConfirm.message}</div>}

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-semibold p-3 rounded-lg hover:bg-green-600 transition duration-200 shadow-md focus:ring-2 focus:ring-green-300"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
}

export default UpdatePasswordForm;
