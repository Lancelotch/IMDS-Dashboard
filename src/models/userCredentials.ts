import { IResponseBody } from "./general";

export interface IPayloadLogin {
    username: string,
    password: string
  }
  
  export interface IUser {
    username: string;
    roleId: string;
    roleName: string;
  }
  
  export interface IResponseLogin extends IResponseBody<IUser>{
    token: string;
  }