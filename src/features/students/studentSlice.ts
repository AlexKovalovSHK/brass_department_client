import { createAppSlice } from "../../app/createAppSlice";
import { addStudent, fechAllStudents, fechStudent, removeStudent } from "./studentApi";
import {  NewStudent, Student, StudentState } from "./type";


const initialState: StudentState = {
   student:{} as Student,
     studentsList:[] as Student[],
     errorMessage: '',
     status: "idle" 
}

export const studentSlice = createAppSlice({
    name: "student",
    initialState,
    reducers: create => ({
        addNewStudent: create.asyncThunk(
            async (newStudent: NewStudent) => {
                const response = await addStudent(newStudent)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.student = action.payload
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
        getStudent: create.asyncThunk(
            async (id:number) => {
                const response = await fechStudent(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.student = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        deleteStudent: create.asyncThunk(
            async (id:number) => {
                const response = await removeStudent(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.studentsList?.splice(0, state.studentsList.length, ...state.studentsList.filter(s => s.id !== action.payload.id))
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        allStudents: create.asyncThunk(
            async () => {
                const response = await fechAllStudents()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.studentsList = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
         
    }),

    selectors: {
        selectStudent: state => state.student,
        selectStudentsList: state => state.studentsList,
        selectError: state => state.errorMessage,
        selectStudentStatus: state => state.status,
    },
})
export const { resetError, allStudents, deleteStudent, getStudent, addNewStudent} = studentSlice.actions
export const { selectError, selectStudent, selectStudentsList, selectStudentStatus } = studentSlice.selectors
