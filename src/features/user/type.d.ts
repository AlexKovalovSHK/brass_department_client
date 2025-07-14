export interface User {
  id: number
  username: string
  roles:string[]
  departmentId: number
}

export interface UserLogin {
  username: string
  password: string
}

export interface UserRegister {
  username: string
  password: string
}

export interface RegistrationError {
  message?: string
  errors?: {
    [key: string]: string
  }
}

export interface UserState {
  user?: User
  usersList?: User[]
  userID?: string
  errorMessage?: string
  role?: string
  status?: "idle" | "loading" | "success" | "error"
  paginationUsers: UsersPage
}

export interface UsersPage {
  current_pag: number
  data: User[]
  total_elements: number
  total_pages: number
}

export interface UserEdit {
  userId: string
  firstName: string
  lastName: string
  email: string
  telefon?: string
}

export interface ChangePwd {
  userId: string
  password2: string
}
