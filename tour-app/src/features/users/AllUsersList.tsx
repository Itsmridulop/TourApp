import { useUsers } from "./useUsers";

import Spinner from "../../component/Spinner";
import UserCard from "./UserCard";
import Modal from "../../component/Modal";
import CreateNewUserForm from "./CreateNewUserForm";

export default function UserList() {
  const { users, isPending } = useUsers()

  if (isPending) return <Spinner />

  return (
    <div className="min-h-full flex mt-18 flex-col bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-14 px-6">
          <h1 className="text-3xl w-screen font-semibold text-center">User List</h1>
          <Modal>
            <Modal.Open opens="createUser">
              <button className="bg-green-500 text-white px-4 py-2 rounded w-60 hover:bg-green-600 transition">
                Create New User
              </button>
            </Modal.Open>
            <Modal.Window name="createUser">
              <CreateNewUserForm />
            </Modal.Window>
          </Modal>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(users?.data) && users.data.map((user) => (user.role === 'admin' ||
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
