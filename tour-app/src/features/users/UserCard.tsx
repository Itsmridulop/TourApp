import { FaTrash } from "react-icons/fa";
import { UserDataType } from "../../types/userType"
import { useDeleteUser } from "./useDeleteUser";
import { useNavigate } from "react-router-dom";
import { roleColor } from '../../utils/roleColor'

function UserCard({ user }: { user: UserDataType }) {
    const { deleteUser, isPending } = useDeleteUser()
    const navigate = useNavigate()

    if(!user.active) return null
    
    return (
        <div className="relative">
            
        <div className="bg-white shadow-md rounded-lg p-4 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer" onClick={() => navigate(`user/${user._id}`)}>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={`${user.photo ?? '/src/public/img/users/default.jpg'}`} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roleColor(user.role)}`}>
                    {user.role}
                </span>
            
            </div>

        </div>
        <button
                    onClick={() => deleteUser(`${user._id}`)}
                    disabled={isPending}
                    className={`text-${isPending ? 'gray' : 'red'}-500 absolute bottom-2 right-2 hover:bg-red-100 p-2 rounded-full transition`}
                >
                    <FaTrash className="h-5 w-5" />
                    <span className="sr-only">Delete user</span>
                </button>
            </div>
    )
}

export default UserCard
