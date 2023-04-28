export interface ISession {
  expires: Date
  user: {
    name: string
    email: string
    image: string
  }
}
