import { useNavigate } from "react-router-dom";
import { TourType } from "../../types/tourTypes";

function TourCard({ tour }: { tour: TourType }) {
  const navigate = useNavigate()
  const dateString: string = tour.startDates[0];
  const dateObject: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  const formattedDate: string = dateObject.toLocaleDateString('en-US', options);

  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl" >
      <div className="relative">
        <img
          src={`${tour.imageCover}`}
          alt="Tour"
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-green-500 opacity-60"></div>
        <div className="absolute bottom-4 right-4 text-white text-2xl font-bold">
          {tour.name}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-md font-semibold uppercase text-gray-600">{tour.difficulty} {tour.duration}-day tour</h3>
        <p className="text-gray-700 text-sm mt-2">
          {tour.summary}
        </p>

        <div className="flex items-center justify-between text-green-500 mt-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            </svg>
            <span className="text-xs text-gray-600">{tour.startLocation?.description}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            </svg>
            <span className="text-xs text-gray-600">{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-green-500 mt-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            </svg>
            <span className="text-xs text-gray-600">{tour.locations.length} stops</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            </svg>
            <span className="text-xs text-gray-600">{tour.maxGroupSize} people</span>
          </div>
        </div>
      </div>

      {/* Price and Button */}
      <div className="bg-gray-100 px-6 py-4">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
          <span>${tour.price} per person</span>
          <span>{tour.ratingsAverage} rating ({tour.ratingsQuantity})</span>
        </div>
        <button className="w-full mt-4 py-2 text-green-500 font-semibold border border-green-500 rounded-full hover:bg-green-500 hover:text-white " onClick={() => navigate(`/tour/${tour._id}`)}>
          DETAILS
        </button>
      </div>
    </div>
  );
}

export default TourCard;
