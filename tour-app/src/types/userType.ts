interface Location {
  coordinates: [string],
  address: string,
  description: string,
  type: string,
}

export interface Tour {
  _id: string,
  name: string,
  startLocation: Location,
  duration: number,
  description: string,
  maxGroupSize: number,
  difficulty: string,
  price: number,
  summary: string,
  imageCover: string
}

export interface UserDataType {
  _id: number;
  name: string;
  email: string;
  photo: string;
  role: string;
  active: boolean,
  reviewedIn: string[],
  tour?: Tour[]
}

export interface ResponseType {
  status: string;
  token: string;
  data: UserDataType;
}

export interface CreateUserType {
  name: string;
  role: string;
  password: string;
  confirmPassword: string;
  photo?: File;
  email: string
}

export interface UserPasswordType {
  password: string;
  newPassword: string;
  newPasswordConfirm: string
}