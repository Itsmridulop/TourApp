import { ReviewReturnType, ReviewType } from "@/types/ReviewType";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "./authApi";

class Review {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/v1",
      headers: {
        "Content-Type": "Application/json",
      },
    });
  }

  public async createReviews(
    reviewData: ReviewType,
  ): Promise<ReviewReturnType> {
    try {
      const response: AxiosResponse<ReviewReturnType> = await this.api.post(
        `/tours/${reviewData.tour}/reviews`,
        {
          review: reviewData.review,
          rating: reviewData.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in create your review", error);
      throw error;
    }
  }

  public async deleteReview(tourId: string, reviewId: string): Promise<void> {
    try {
      await this.api.delete(`/tours/${tourId}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${auth.gettoken()}`,
        },
      });
    } catch (error) {
      console.error("Error in deleting your review", error);
      throw error;
    }
  }

  public async updateReview(
    tourId: string,
    reviewId: string,
    reviewBody: Partial<ReviewType>,
  ): Promise<ReviewReturnType> {
    try {
      const response: AxiosResponse<ReviewReturnType> = await this.api.post(
        `/tours/${tourId}/reviews/${reviewId}`,
        reviewBody,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in updating your review", error);
      throw error;
    }
  }

  public async getReviewOfUser(id: string): Promise<ReviewReturnType> {
    try {
      const response: AxiosResponse<ReviewReturnType> = await this.api.get(
        `/reviews/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const review = new Review();
export { review };
