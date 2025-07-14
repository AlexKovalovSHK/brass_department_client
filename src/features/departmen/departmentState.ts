import { createAppSlice } from "../../app/createAppSlice"
import { fetchDepartmentId, fechDepartmentsByCompanyId, fechRemoveDepartmentId, fetchNewDepartment } from "./departmentApi"
import { Department, DepartmentState, NewDepartment } from "./type"


const initialState: DepartmentState = {
    department: {} as Department,
    departmentsList: [] as Department[],
    errorMessage: "",
    status: "idle",
}

export const departmentSlice = createAppSlice({
    name: "departments",
    initialState,
    reducers: create => ({
        addDepartment: create.asyncThunk(
            async (dto: NewDepartment) => {
                const response = await fetchNewDepartment(dto)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.department = action.payload
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
        getDepartment: create.asyncThunk(
            async (id: number) => {
                const response = await fetchDepartmentId(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.department = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        getDepartmentByCompany: create.asyncThunk(
            async (id: number) => {
                const response = await fechDepartmentsByCompanyId(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.departmentsList = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        deleteDepartment: create.asyncThunk(
            async (id: number) => {
                const response = await fechRemoveDepartmentId(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action)  => {
                    state.department = action.payload
                    state.status = "idle"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "idle"
                },
            },
        ),
         
    }),

    selectors: {
        selectDepartment: state => state.department,
        selectDepartmentsList: state => state.departmentsList,
        selectError: state => state.errorMessage,
        selectDepartmentStatus: state => state.status,
    },
})
export const { addDepartment, getDepartment, getDepartmentByCompany, deleteDepartment, resetError, } = departmentSlice.actions
export const { selectDepartment, selectDepartmentsList, selectError, selectDepartmentStatus, } = departmentSlice.selectors