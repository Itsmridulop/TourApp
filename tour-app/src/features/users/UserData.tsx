import { useNavigate, useParams } from "react-router-dom"
import { useOneUser } from "./useOneUser"
import { FaEdit, FaTrash } from "react-icons/fa"
import { roleColor } from "../../utils/roleColor"
import { useDeleteUser } from "./useDeleteUser"

import Spinner from "../../component/Spinner"
import Modal from "../../component/Modal"
import UpdateUserForm from "./UpdateUserForm"
import UserActicityPage from "./UserActivityPage"
import GuideActivityPage from "./GuideActivityPage"

function UserData() {
    const { id } = useParams()
    const { userInfo, isLoading } = useOneUser(id || "")
    const { deleteUser, isPending } = useDeleteUser()
    const navigate = useNavigate()

    const handleDelete = () => {
        deleteUser(id || "")
        navigate(-1)
    }

    if (isLoading) return <Spinner />

    return (
        <div className="w-full h-full  rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-2xl font-bold">User Details</h2>
                <div className="flex space-x-2">
                    <Modal>
                        <Modal.Open opens="updateUser">
                            <button
                                className="flex items-center text-white bg-green-500 hover:bg-green-600 font-semibold px-3 py-2 rounded"
                            >
                                <FaEdit className="mr-2 h-4 w-4" />
                                Update User
                            </button>
                        </Modal.Open>
                        <Modal.Window name="updateUser">
                            <UpdateUserForm user={userInfo?.data} id={id}/>
                        </Modal.Window>
                    </Modal>
                    <button
                        className={`flex items-center text-white bg-${isPending ? 'gray' : 'red'}-500 hover:bg-${isPending ? 'gray' : 'red'}-600 font-semibold px-3 py-2 rounded`}
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        <FaTrash className="mr-2 h-4 w-4" />
                        Delete User
                    </button>
                </div>
            </div>
            <div className="py-4 space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 bg-gray-200 rounded-full overflow-hidden">
                        <img
                            src={`${userInfo?.data.photo ?? '/src/public/img/users/default.jpg'}`}
                            alt={userInfo?.data.name}
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <div className="flex space-x-5">
                        <div>
                            <h3 className="text-xl font-semibold">{userInfo?.data.name}</h3>
                            <p className="text-sm text-gray-500">{userInfo?.data.email}</p>
                        </div>
                        <span className={`px-10 text-center pt-3 ${roleColor(userInfo?.data.role)} rounded-full font-semibold text-sm`}>
                            {userInfo?.data.role}
                        </span>
                    </div>
                </div>
                {(userInfo?.data.role === 'user' && id) && <UserActicityPage id={id}/>}
                {((userInfo?.data.role === 'guide' || userInfo?.data.role === 'lead-guide') && id) && <GuideActivityPage id={id} role='guide' email={userInfo.data.email}/>}
            </div>
        </div>
    )
}

export default UserData