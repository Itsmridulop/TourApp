import { useForm } from "react-hook-form"
import { useCreateUser } from "./useCreateUser";
import { CreateUserType } from "../../types/userType";
import { FormDataController } from "@/utils/FormDataController";

function CreateNewUserForm({onClose}: {onClose?: () => void}) {
    const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm<CreateUserType>()
    const { createUser, isPending } = useCreateUser()

    const submitHandler = (data: CreateUserType) => {
        const formData = FormDataController(data);
    
        createUser(formData, {
            onSettled: () => reset(),
            onSuccess: () => onClose?.(),
        });
    };
    
    return (
        <div className="w-[28rem] max-w-sm mx-auto p-6">
            <h2 className="text-xl font-bold text-center mb-6">Create New User</h2>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Full Name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        {...register('name', {
                            required: 'This feild is required'
                        })}
                    />
                </div>
                {errors?.name?.message && <div>{errors.name.message}</div>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        {...register('email', {
                            required: 'This feild is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Please Enter a valid email'
                            }
                        })}
                    />
                </div>
                {errors?.email?.message && <div>{errors.email.message}</div>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        {...register('role')}

                    >
                        <option value="user">User</option>
                        <option value="guide">Guide</option>
                        <option value="lead-guide">Lead Guide</option>
                    </select>
                </div>
                {errors?.role?.message && <div>{errors.role.message}</div>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="• • • • • • • •"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        {...register('password', {
                            required: 'This feild is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }
                        })}
                    />
                </div>
                {errors?.password?.message && <div>{errors.password.message}</div>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="• • • • • • • •"
                        id="confirmPassword"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        {...register('confirmPassword', {
                            required: "This feild is required",
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            },
                            validate: (value) => value === getValues().password || 'Passwords do not match'
                        })}
                    />
                </div>
                {errors?.confirmPassword?.message && <div>{errors.confirmPassword.message}</div>}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                    <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        onChange={e => {
                            const file = e.target.files?.[0]
                            setValue('photo', file)
                        }} 

                    />
                </div>
                {errors?.photo?.message && <div>{errors.photo.message}</div>}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                    disabled={isPending}
                >
                    {isPending ? 'Creating New User...' : 'Create User'}
                </button>
            </form>
        </div>
    )
}

export default CreateNewUserForm
