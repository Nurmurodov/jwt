import {IUser} from "../models/IUser";
import {makeAutoObservable} from 'mobx'
import AuthService from "../service/AuthService";

export default class Store {
  user= {} as IUser
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  async login(email:string,password:string) {
    try {
      const response = await AuthService.login(email,password)
      console.log(response)
      localStorage.setItem('token',response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      // @ts-ignore
      console.log(e?.response?.data?.message)
    }
  }

  async singUp(email:string,password:string) {
    try {
      const response = await AuthService.singUp(email,password)
      console.log(response)
      localStorage.setItem('token',response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      // @ts-ignore
      console.log(e?.response?.data?.message)
    }
  }

  async logout(email:string,password:string) {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e) {
      // @ts-ignore
      console.log(e?.response?.data?.message)
    }
  }
}