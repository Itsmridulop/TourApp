import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "./authApi";
import { ResponseType, UserDataType } from "../types/userType";

class User {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/v1/users",
    });
  }

  public async getUsers(): Promise<{
    status: string;
    data: UserDataType;
    result: number;
  }> {
    try {
      const response: AxiosResponse<{
        status: string;
        result: number;
        data: UserDataType;
      }> = await this.api.get("/", {
        headers: {
          Authorization: `Bearer ${auth.gettoken()}`,
          "Content-Type": "Application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getting users: ", error);
      throw error;
    }
  }

  public async createUser(userData: FormData): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.post(
        "/",
        userData,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in creating this user: ", error);
      throw error;
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await this.api.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.gettoken()}`,
          "Content-Type": "Application/json",
        },
      });
    } catch (error) {
      console.error("Error in deleting this user");
      throw error;
    }
  }

  public async getOneUser(id: string): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.get(
        `/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "Application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in getting info of this user", error);
      throw error;
    }
  }

  public async deleteMe(): Promise<void> {
    try {
      await this.api.delete("/deleteMe", {
        headers: {
          Authorization: `Bearer ${auth.gettoken()}`,
          "Content-Type": "Application/json",
        },
      });
    } catch (error) {
      console.error("Error in delete your account", error);
      throw error;
    }
  }

  public async updateUser({
    formData,
    id,
  }: {
    formData: FormData;
    id?: string;
  }): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.patch(
        `/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in updating this user", error);
      throw error;
    }
  }

  public async getAssociatedTour(id: string): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.get(
        `/associatedTour/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.gettoken()}`,
            "Content-Type": "Application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error in getting associated tour", error);
      throw error;
    }
  }
}

const user = new User();
export { user };
