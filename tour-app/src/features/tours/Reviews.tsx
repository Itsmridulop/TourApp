import React from "react";
import { ReviewType, TourReviewType } from "../../types/ReviewType";

interface ReviewSectionProps {
    reviews?: ReviewType[] | TourReviewType[];
    renderReview: (review: ReviewType[] | TourReviewType[]) => React.ReactNode;
}

const Reviews: React.FC<ReviewSectionProps> = ({ reviews, renderReview }) => {
    return (
        <div className="mt-6 mb-4">
            <h2 className="text-xl font-semibold">Review</h2>
            <div className="bg-gray-100 p-4 rounded-lg mt-2 space-y-14">
                {(reviews && reviews.length > 0) ? (
                    renderReview(reviews) 
                ) : (
                    <p>No reviews yet</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;