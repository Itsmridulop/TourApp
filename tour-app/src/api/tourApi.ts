import axios, { AxiosInstance, AxiosResponse } from "axios";
import type {
  CreateTourType,
  MonthlyPlanType,
  Statstype,
  TourResponse,
  TourResponseType,
} from "../types/tourTypes";
import { auth } from "./authApi";

class Tour {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/v1/tours",
    });
  }

  public async getAllTours(
    queryStr: string,
    best: boolean,
  ): Promise<TourResponse> {
    try {
      let response: AxiosResponse<TourResponse>;
      if (!best) response = await this.api.get(`/?${queryStr}`);
      else response = await this.api.get("/top-5-tours");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getOneTour(id: string): Promise<TourResponseType> {
    try {
      const response: AxiosResponse<TourResponseType> = await this.api.get(
        `/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in getting info of this tour", error);
      throw error;
    }
  }

  public async deleteTour(id: string): Promise<void> {
    try {
      await this.api.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.gettoken()}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error in deleting this tour", error);
      throw error;
    }
  }

  public async updateTour(
    tourData: Partial<CreateTourType>,
    id?: string,
  ): Promise<TourResponse> {
    try {
      const response: AxiosResponse<TourResponse> = await this.api.patch(
        `/${id}`,
        tourData,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in updating data of this tour", error);
      throw error;
    }
  }

  public async createTour(tourData: CreateTourType): Promise<TourResponse> {
    try {
      const response: AxiosResponse<TourResponse> = await this.api.post(
        "/",
        tourData,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in creating new tour", error);
      throw error;
    }
  }

  public async getStats(): Promise<Statstype> {
    try {
      const response: AxiosResponse<Statstype> = await this.api.get("/stats", {
        headers: {
          Authorization: `Bearer ${auth.gettoken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getting stats", error);
      throw error;
    }
  }

  public async getMonthlyPlan(): Promise<MonthlyPlanType> {
    try {
      const response: AxiosResponse<MonthlyPlanType> = await this.api.get(
        `/monthly-plan`,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in getting monthly plan", error);
      throw error;
    }
  }

  public async imageUpload(data: FormData, id?: string): Promise<TourResponse> {
    try {
      const response: AxiosResponse<TourResponse> = await this.api.patch(
        `/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in uploading images");
      throw error;
    }
  }
}

const tour = new Tour();
export { tour };
