import { CreateBookingType, ResponseBookingType } from "@/types/bookingType";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "./authApi";

class Booking {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/v1/bookings",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async createBooking(
    bookingData: CreateBookingType,
  ): Promise<ResponseBookingType> {
    try {
      const response: AxiosResponse<ResponseBookingType> = await this.api.post(
        "/",
        {
          members: bookingData.members,
          tour: bookingData.tourId,
          paymentMethod: bookingData.paymentMethod,
        },
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

  public async getBookingOfCurrentUser(): Promise<ResponseBookingType> {
    try {
      const response: AxiosResponse<ResponseBookingType> = await this.api.get(
        "/user",
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

  public async getBookingOfUser(id: string): Promise<ResponseBookingType> {
    try {
      const response: AxiosResponse<ResponseBookingType> = await this.api.get(
        `/user/${id}`,
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

  public async updateBooking(
    bookingData: Partial<CreateBookingType>,
    id: string,
  ): Promise<ResponseBookingType> {
    try {
      const response: AxiosResponse<ResponseBookingType> = await this.api.patch(
        `/${id}`,
        bookingData,
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

const booking = new Booking();
export { booking };
