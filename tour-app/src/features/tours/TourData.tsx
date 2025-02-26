import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaStar, FaDollarSign, FaMountain, FaPaperPlane, FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useDeleteTour } from "./useDeleteTour";
import { useTour } from "./useTour";
import { useParams } from "react-router-dom";
import { ReviewType, TourReviewType } from "../../types/ReviewType";
import { UserDataType } from "../../types/userType";
import { useUpdateTour } from "./useUpdateTour";
import { useState } from "react";
import { Button } from "@/component/Button";
import { useDeleteReview } from "../reviews/useDeleteReview";
import { useBookingOfUser } from "../bookings/useBookingOfUser";
import { FormDataController } from "@/utils/FormDataController";
import { useUpdateProfile } from "../users/useUpdateProfile";
import { useUser } from "../users/useUser";
import { useCreateReviews } from "../reviews/useCreateReviews";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Spinner from "../../component/Spinner";
import Images from "./Images";
import Guides from "./Guides";
import Reviews from "./Reviews";
import Modal from "@/component/Modal";
import EditTourForm from "./EditTourForm";
import AddReviewForm from "../reviews/AddReviewForm";
import CreateBookingForm from "../bookings/CreateBookingForm.";
import TourImagesUpload from "./TourImageUploader";

L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
});

export default function TourData() {
    const { user } = useUser()
    const { bookingData } = useBookingOfUser(`${user?.data._id}`)
    const { id } = useParams()
    const { isPending: isUpdating } = useUpdateTour()
    const { createReview } = useCreateReviews()
    const { tourData, isLoading } = useTour(id || "")
    const { updateProfile } = useUpdateProfile()
    const { deleteTour, isPending } = useDeleteTour()
    const { deleteReview } = useDeleteReview()
    const [isBooked, setIsBooked] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const handleReviewChange = (reviewData: ReviewType) => {
        const reviewedIn = [...(user?.data.reviewedIn || []), id]
        const data = FormDataController({ reviewedIn })
        updateProfile(data)
        createReview(reviewData)
    };

    const handleReviewDelete = ({ reviewId, tourId }: { tourId?: string; reviewId?: string }) => {
        const reviewedIn = user?.data.reviewedIn.filter(reviewInId => reviewInId !== id)
        const data = FormDataController({ reviewedIn })
        updateProfile(data)
        deleteReview({ reviewId: reviewId || '', tourId: tourId || '' });
    };

    if (isLoading) return <Spinner />

    const position: [number, number] = [tourData?.data.startLocation.coordinates?.[1] ?? 0, tourData?.data.startLocation.coordinates?.[0] ?? 0];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                    <img
                        src={`${tourData?.data.imageCover}`}
                        alt={tourData?.data.name}
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">{tourData?.data.name}</h1>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 border border-green-600 rounded">
                            <FaClock className="mr-1" /> {tourData?.data.duration} days
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded">
                            <FaMapMarkerAlt className="mr-1" /> {tourData?.data.startLocation.description}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600 rounded">
                            <FaUsers className="mr-1" /> Max {tourData?.data.maxGroupSize} people
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-600 border border-yellow-600 rounded">
                            <FaMountain className="mr-1" /> {tourData?.data.difficulty ?
                                tourData.data.difficulty.charAt(0).toUpperCase() + tourData.data.difficulty.slice(1)
                                : 'Not specified'}
                        </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold">Tour Overview</h2>
                            <p className="mt-2 text-gray-700">{tourData?.data.summary}</p>
                            <div className="mt-4 flex items-center">
                                <FaStar className="mr-1 text-yellow-500" />
                                <span className="font-bold">{tourData?.data.ratingsAverage}</span>
                                <span className="ml-1 text-gray-500">({tourData?.data.ratingsQuantity} reviews)</span>
                            </div>
                            <div className="mt-2 flex items-center">
                                <FaDollarSign className="mr-1 text-green-500" />
                                <span className="text-2xl font-bold">{tourData?.data.price}</span>
                                <span className="ml-1 text-gray-500">per person</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Tour Description</h2>
                            <p className="mt-2 text-gray-700">{tourData?.data.description}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Start Location</h2>
                        <p className="mt-2 text-gray-700">{tourData?.data.startLocation.address}</p>
                        <div className="aspect-video w-full rounded-lg overflow-hidden">
                            <MapContainer center={position} zoom={17} className="w-full h-full">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={position} icon={customMarkerIcon}>
                                    <Popup>{tourData?.data.startLocation.address}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    {tourData?.data.images && <Images images={tourData?.data.images}
                        renderImage={(image: string, index: number) => (
                            <img
                                src={`${image}`}
                                alt={`Tour image ${index + 1}`}
                                className="transition-transform duration-300 hover:scale-110"
                            />
                        )}
                    ><TourImagesUpload imagesArr={tourData?.data.images} /></Images>}

                    <Guides
                        guides={tourData?.data.guides}
                        renderGuide={(guide: UserDataType) => (
                            <div key={guide.email} className="flex space-x-4">
                                <img
                                    src={`${guide.photo ?? '/src/public/img/users/default.jpg'}`}
                                    alt={guide.name}
                                    className="h-10 w-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{guide.name}</p>
                                    <p className="text-sm text-gray-500">{guide.role}</p>
                                </div>
                            </div>
                        )}
                    />
                </div>

                <div className="flex flex-col items-start p-4">
                    <h2 className="text-lg font-semibold mb-2">Tour Dates</h2>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {tourData?.data.startDates.map((date, index) => (
                            <span
                                key={index}
                                className="flex items-center bg-gray-200 text-primary px-2 py-1 rounded-lg text-sm font-medium"
                            >
                                <FaCalendarAlt className="mr-1 h-3 w-3" />
                                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-lg font-semibold mb-2 mt-6">Tour Locations</h2>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {tourData?.data.locations.map((location, index) => (
                            <div key={index} className="p-2 border border-gray-200 rounded-lg">
                                <h3 className="text-sm font-medium">{location.description}</h3>
                                <p className="text-xs text-gray-600">Day {location.day}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 w-full">
                            <div className="w-full sm:w-auto">

                                <Modal>
                                    <Modal.Open opens="bookTour">
                                        <button
                                            className={`w-full sm:w-auto flex justify-center bg-green-500 items-center text-white font-bold py-2 px-4 rounded transition transform ${!(
                                                bookingData?.data.some((booking) => typeof booking.tour === "object" && booking.tour._id === id) ||
                                                isBooked
                                            )
                                                ? "hover:scale-105 hover:bg-green-700"
                                                : "bg-green-900"
                                                }`}
                                            disabled={
                                                bookingData?.data.some((booking) => typeof booking.tour === "object" && booking.tour._id === id) ||
                                                isBooked
                                            }
                                        >
                                            <FaPaperPlane className="mr-2" />
                                            {bookingData?.data.some((booking) => typeof booking.tour === "object" && booking.tour._id === id) ||
                                                isBooked
                                                ? "Booked"
                                                : "Book Tour"}
                                        </button>
                                    </Modal.Open>
                                    <Modal.Window name="bookTour">
                                        <CreateBookingForm onBooked={setIsBooked} />
                                    </Modal.Window>
                                </Modal>
                            </div>

                            {(user?.data.role === "admin" || user?.data.role === "lead-guide") && (
                                <>
                                    <Modal>
                                        <Modal.Open opens="updateTour">
                                            <button className="w-full sm:w-auto flex justify-center items-center bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition transform hover:scale-105">
                                                <FaEdit className="mr-2" />
                                                Edit Tour
                                            </button>
                                        </Modal.Open>
                                        <Modal.Window name="updateTour">
                                            <EditTourForm tour={tourData?.data} title="Edit Tour: " isPending={isUpdating} />
                                        </Modal.Window>
                                    </Modal>

                                    <button
                                        className={`w-full sm:w-auto flex justify-center items-center ${isPending ? "bg-gray-600" : "bg-red-600"
                                            } text-white font-bold py-2 px-4 rounded ${isPending ? "hover:bg-gray-800" : "hover:bg-red-800"
                                            } transition transform hover:scale-105`}
                                        disabled={isPending}
                                        onClick={() => deleteTour(tourData?.data._id ?? "")}
                                    >
                                        <FaTrash className="mr-2" />
                                        Delete Tour
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {!(user?.data.reviewedIn.some(reviewInId => reviewInId === id) || isEditing) && <AddReviewForm onReviewChange={handleReviewChange} />}
            <Reviews
                reviews={tourData?.data.reviews}
                renderReview={(review: ReviewType[] | TourReviewType[]) => (
                    review.map((reviewData, idx) => {
                        if (reviewData.tour !== id) return null

                        return (<div key={idx} className="p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-500" />
                                    <span className="font-bold ml-2">{reviewData.rating}</span>
                                </div>
                            </div>
                            <span className="mt-2 flex justify-between">{reviewData.review}
                                <div className="flex space-x-2">
                                    {(!reviewData.user?._id || `${user?.data._id}` === reviewData.user._id) && <><Button variant="ghost" size="sm">
                                        <FaEdit className="h-4 w-4 text-gray-500" onClick={() => setIsEditing(true)} />
                                    </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleReviewDelete({ reviewId: reviewData._id, tourId: id })}>
                                            <FaTrashAlt className="h-4 w-4 text-gray-500" />
                                        </Button></>}
                                </div>
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                                Reviewed on {new Date(reviewData.createdAt ?? Date.now()).toLocaleDateString()}
                            </p>
                        </div>)
                    })
                )}
            />
        </div>

    );
}