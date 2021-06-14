export interface IUser {
  userId?: string;
  name?: string;
  email: string;
  password: string;
}

export interface ICourse {
  _id?: string;
  created_by?: string;
  title: string;
  description: string;
  authors?: [string];
  duration: number;
}

export interface IResponse {
  message: string;
}
