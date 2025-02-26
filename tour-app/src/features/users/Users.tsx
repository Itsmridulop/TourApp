import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/component/Avatar"
import { Button } from "@/component/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/component/Dialog"
import { FaUserEdit, FaKey, FaUserTimes } from 'react-icons/fa'
import { useUser } from './useUser'
import { useDeleteMe } from './useDeleteMe'

import GuideActivityPage from "./GuideActivityPage";
import Spinner from '@/component/Spinner'
import Modal from '@/component/Modal'
import UpdateProfileForm from './UpdateProfileForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import AdminProfile from './AdminProfile'
import UserProfile from './UserProfile'
import LeadGuideProfile from './LeadGuideProfile'
import GuideProfile from './GuideProfile'

export default function Component() {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const { user, isLoading } = useUser()
    const { deleteMe, isPending } = useDeleteMe()

    if (isLoading) return <Spinner />

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={`${user?.data.photo || '/src/public/img/users/defualt.jpg'}`} alt="User's avatar" />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.data.name}</h1>
                        <p className="text-gray-500">{user?.data.email}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Modal>
                        <Modal.Open opens='updateMe'>
                            <Button variant="outline" className="w-full md:w-auto">
                                <FaUserEdit className="mr-2 h-4 w-4" /> Update Profile
                            </Button>
                        </Modal.Open>
                        <Modal.Window name="updateMe">
                            <UpdateProfileForm user={user?.data} />
                        </Modal.Window>
                    </Modal>
                    <Modal>
                        <Modal.Open opens='updatePass'>
                            <Button variant="outline" className="w-full md:w-auto">
                                <FaKey className="mr-2 h-4 w-4" /> Change Password
                            </Button>
                        </Modal.Open>
                        <Modal.Window name="updatePass">
                            <UpdatePasswordForm />
                        </Modal.Window>
                    </Modal>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="w-full md:w-auto" onClick={() => deleteMe()}>
                                <FaUserTimes className="mr-2 h-4 w-4" /> {isPending ? 'Deleting...' : 'Delete Account'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={() => {
                                    setIsDeleteDialogOpen(false)
                                }}>
                                    Yes, delete my account
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {user?.data.role === "admin" && <AdminProfile />}
            {user?.data.role === 'lead-guide' && <LeadGuideProfile ><GuideActivityPage id={`${user.data._id}`} role={user.data.role} email={user.data.email}/></LeadGuideProfile>}
            {user?.data.role === 'user' && <UserProfile />}
            {user?.data.role === 'guide' && <GuideProfile><GuideActivityPage role={user.data.role} id={`${user.data._id}`} email={user.data.email}/></GuideProfile>}
        </div>
    )
}