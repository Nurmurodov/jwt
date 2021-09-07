import $api from "../http";
import {AuthResponse} from "../models/response/AuthResponse";
import {AxiosResponse} from 'axios'

export default class AuthService {
  static async login(email: string,password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login',{email,password})
  }

  static async singUp(email: string,password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/sing-up',{email,password})
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}