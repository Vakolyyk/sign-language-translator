export type Signup = {
  name: string,
  lastName: string,
  email: string,
  password: string,
  repeatPassword: string,
}

export type Login = {
  email: string,
  password: string,
}