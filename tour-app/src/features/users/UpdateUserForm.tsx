import { SubmitHandler, useForm } from "react-hook-form"
import { UserDataType, } from "../../types/userType"
import { useUpdateUser } from "./useUpdateUser";
import { FormDataController } from "@/utils/FormDataController";

function UpdateUserForm({ user, id, onClose }: { user?: UserDataType; id?: string; onClose?: () => void }) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<UserDataType>()
    const { updateUser, isPending } = useUpdateUser()

    const submitHandler: SubmitHandler<UserDataType> = (data) => {
        if (data.name === user?.name && (!data.photo || (typeof data.photo !== 'string' && Object.keys(data.photo).length === 0))) return;
        const userData = {
            ...data,
            photo: data.photo[0] ?? user?.photo
        }
        const formData = FormDataController(userData)

        updateUser({ formData, id }, {
            onSettled: () => reset(),
            onSuccess: () => onClose?.()
        })
    }


    return (
        <div className="max-w-md mx-auto p-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
            <form onSubmit={handleSubmit(submitHandler)}>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={user?.name}
                        placeholder="Enter your name"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
                        {...register('name')}
                    />
                    {errors?.name?.message && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="profilePhoto">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        id="profilePhoto"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
                        {...register('photo')}
                    />
                    {errors?.photo?.message && <div className="text-red-500 text-sm">{errors.photo.message}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="role">
                        Role
                    </label>
                    <select
                        id="role"
                        defaultValue={user?.role}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
                        {...register('role')}
                    >
                        <option value="user">User</option>
                        <option value="guide">Guide</option>
                        <option value="lead-guide">Lead Guide</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors?.role?.message && <div className="text-red-500 text-sm">{errors.role.message}</div>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                    disabled={isPending}
                >
                    {isPending ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    )
}

export default UpdateUserForm
