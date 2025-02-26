import { useForm } from "react-hook-form";
import { CreateUserType, UserDataType } from "../../types/userType";
import { useUpdateProfile } from "./useUpdateProfile";
import { FormDataController } from "@/utils/FormDataController";

function UpdateProfileForm({ user, onClose }: { user: UserDataType | undefined; onClose?: () => void }) {
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<CreateUserType>({
        defaultValues: {
            name: user?.name,
        },
    });
    const { updateProfile, isPending } = useUpdateProfile();

    const submitHandler = (data: Partial<CreateUserType>) => {
        if (data.name === user?.name && !data.photo) return;

        const formData = FormDataController(data)

        updateProfile(formData, {
            onSettled: () => reset(),
            onSuccess: () => onClose?.(),
        });
    };

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
                        placeholder="Enter your name"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
                        {...register('name')}
                    />
                    {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="profilePhoto">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        id="profilePhoto"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
                        onChange={e => {
                            const file = e.target.files?.[0];
                            setValue("photo", file);
                        }}
                    />
                    {errors.photo && <div className="text-red-500">{errors.photo.message}</div>}
                </div>

                <button
                    type="submit"
                    className={`w-full bg-green-${isPending ? '600' : '500'} text-white p-2 rounded hover:bg-green-600 transition duration-200`}
                    disabled={isPending}
                >
                    {isPending ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
}

export default UpdateProfileForm;
