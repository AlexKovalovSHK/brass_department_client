
import { createAppSlice } from "../../app/createAppSlice";
import { ChangePwd, User, UserEdit, UserLogin, UserRegister, UsersPage, UserState } from "./type";
import { fechAllUsers, fechNewPwd, fechUserAuth, fechUserByEmail, fechUserId, loginUser, register, removeUserId, updateUserAccount, userLogout } from "./userApi";


const initialState: UserState = {
    user: {} as User,
    usersList: [] as User[],
    userID: "",
    errorMessage: "",
    status: "idle",
    paginationUsers: {} as UsersPage
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: create => ({
        registrationUserAsync: create.asyncThunk(
            async (userReg: UserRegister) => {
                const response = await register(userReg)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.userID = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        resetError: create.reducer(state => {
            state.errorMessage = ""
        }),
        login: create.asyncThunk(
            async (userLog: UserLogin) => {
                const response = await loginUser(userLog)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        logout: create.asyncThunk(
            async () => {
                const response = await userLogout()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: state => {
                    state.user = initialState.user
                    state.status = "idle"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        authUser: create.asyncThunk(
            async () => {
                const response = await fechUserAuth()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        getUser: create.asyncThunk(
            async (userId:string) => {
                const response = await fechUserId(userId)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        deleteUser: create.asyncThunk(
            async (userId:string) => {
                const response = await removeUserId(userId)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.usersList?.splice(0, state.usersList.length, ...state.usersList.filter(u => u.id !== action.payload.id))
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        updateUser: create.asyncThunk(
            async (user: UserEdit) => {
                const response = await updateUserAccount(user)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        allUsers: create.asyncThunk(
            async () => {
                const response = await fechAllUsers()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.paginationUsers = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                    state.user = initialState.user
                },
            },
        ),
        /*allUsersPagination: create.asyncThunk(
            async (pag: MyPagination) => {
                const response = await fechAllUsersPagination(pag.page, pag.size)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.paginationUsers = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),*/
        changePwdAsync: create.asyncThunk(
            async (obj: ChangePwd) => {
              const response = await fechNewPwd(obj)
              return response
            },
            {
              pending: () => {},
              fulfilled: state => {
                state.user = state.user
              },
              rejected: (state, action) => {
                state.errorMessage = action.error.message
              },
            },
          ),

          getUserByEmail: create.asyncThunk(
            async (email: string) => {
              const response = await fechUserByEmail(email)
              return response
            },
            {
              pending: () => {},
              fulfilled: (state, action)  => {
                state.user = action.payload
              },
              rejected: (state, action) => {
                state.errorMessage = action.error.message
              },
            },
          ),
         
    }),

    selectors: {
        selectUser: state => state.user,
        selectUsersList: state => state.usersList,
        selectUserId: state => state.userID,
        selectError: state => state.errorMessage,
        selectUserStatus: state => state.status,
        selectUsersPagination:state => state.paginationUsers
    },
})
/*export const { registrationStudentAsync, resetError, emailConfirmAsync, login, logout, authUser, allUsers, getUser, editUserAsync, removeUser } = userSlice.actions*/
export const { registrationUserAsync, resetError, login, logout, authUser, allUsers, getUser, deleteUser, updateUser, changePwdAsync, getUserByEmail } = userSlice.actions
export const { selectUser, selectError, selectUserStatus, selectUserId, selectUsersList, selectUsersPagination } = userSlice.selectors
