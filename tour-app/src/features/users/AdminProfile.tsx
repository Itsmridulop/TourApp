import { Card, CardContent, CardHeader, CardTitle } from "@/component/Card";
import { Button } from "@/component/Button";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useTours } from "../tours/useTours";
import { useCreateTour } from "../tours/useCreateTour";
import { useDeleteTour } from "../tours/useDeleteTour";
import { useUpdateTour } from "../tours/useUpdateTour";

import Modal from "@/component/Modal";
import Stats from "../tours/Stats";
import MonthlyPlanGraph from "./MothlyPlanGraph";
import TourEditForm from "../tours/EditTourForm";
import Spinner from "@/component/Spinner";


function AdminProfile() {
    const { tours: sampleTours, isLoading: isTourLoading } = useTours("sort=price", false)
    const { isPending: isCreating } = useCreateTour()
    const { deleteTour, isPending: isDeleting } = useDeleteTour()
    const { isPending: isUpdating } = useUpdateTour()

    if (isCreating || isDeleting || isUpdating || isTourLoading) return <Spinner />

    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8 p-4 w-[98%]">
                <div className="w-full md:w-1/2">
                    <MonthlyPlanGraph />
                </div>
                <div className="w-full md:w-1/2">
                    <Stats />
                </div>
            </div>
            <div className='flex-1 p-4'>


                <h2 className="text-xl font-semibold mb-4">Manage Tours</h2>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Tours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 h-96 overflow-scroll">
                            {sampleTours?.data.map((tour) => (
                                <div key={tour.id} className="flex items-center  justify-between p-4 bg-gray-100 rounded-lg">
                                    <div>
                                        <h3 className="font-semibold">{tour.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {tour.duration} | Difficulty: {tour.difficulty}
                                        </p>
                                        <p className="text-sm font-medium">${tour.price}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Modal>
                                            <Modal.Open opens='updateTour'>
                                                <Button variant="ghost" size="sm" >
                                                    <FaEdit className="h-4 w-4" />
                                                </Button>
                                            </Modal.Open>
                                            <Modal.Window name="updateTour">
                                                <TourEditForm tour={tour} title='Edit Tour' />
                                            </Modal.Window>
                                        </Modal>
                                        <Button variant="ghost" size="sm">
                                            <FaTrashAlt className="h-4 w-4" onClick={() => deleteTour(tour._id)} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Modal>
                                <Modal.Open opens='createTour'>
                                    <Button>
                                        <FaPlus className="h-4 w-4 mr-2" />
                                        Add New Tour
                                    </Button>
                                </Modal.Open>
                                <Modal.Window name="createTour">
                                    <TourEditForm title='Create Tour' />
                                </Modal.Window>
                            </Modal>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default AdminProfile;