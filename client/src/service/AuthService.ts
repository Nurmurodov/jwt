import $api from "../http";
import {AxiosResponse} from 'axios'

export default class AuthService {
  static async login(email: string,password: string): Promise<AxiosResponse<AxiosResponse>> {
    return $api.post<AxiosResponse>('/login',{email,password})
  }

  static async singUp(email: string,password: string): Promise<AxiosResponse<AxiosResponse>> {
    return $api.post<AxiosResponse>('/sign-up',{email,password})
  }

  static async logout(email: string,password: string): Promise<void> {
    return $api.post('/logout')
  }
}