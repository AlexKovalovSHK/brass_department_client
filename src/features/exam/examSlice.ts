import { createAppSlice } from "../../app/createAppSlice";
import { fechAllExams, fechAllExamsBySessionAndYear, fechAllExamsByYear, fechExam, fechNewExam, fechRemoveExamId } from "./examApi";
import { Exam, ExamState, NewExam } from "./type";


const initialState: ExamState = {
   exam:{} as Exam,
     examsList:[] as Exam[],
     errorMessage: '',
     status: "idle" 
}

export const examSlice = createAppSlice({
    name: "exam",
    initialState,
    reducers: create => ({
        addNewExam: create.asyncThunk(
            async (newExam: NewExam) => {
                const response = await fechNewExam(newExam)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.exam = action.payload
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
        getExam: create.asyncThunk(
            async (id:number) => {
                const response = await fechExam(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.exam = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        deleteExam: create.asyncThunk(
            async (id:number) => {
                const response = await fechRemoveExamId(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.examsList?.splice(0, state.examsList.length, ...state.examsList.filter(ex => ex.id !== action.payload.id))
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        allExams: create.asyncThunk(
            async () => {
                const response = await fechAllExams()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.examsList = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        getExamsBySessionAndYear: create.asyncThunk(
            async ({ year, session }: { year: number; session: number }) => {
                const response = await fechAllExamsBySessionAndYear(year, session)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.examsList = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        getExamsByYear: create.asyncThunk(
            async ( year: number ) => {
                const response = await fechAllExamsByYear(year)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.examsList = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
    }),

    selectors: {
        selectExam: state => state.exam,
        selectExamsList: state => state.examsList,
        selectError: state => state.errorMessage,
        selectStudentStatus: state => state.status,
    },
})
export const { resetError, getExamsByYear, getExamsBySessionAndYear, allExams, deleteExam, getExam, addNewExam} = examSlice.actions
export const { selectError, selectExam, selectExamsList, selectStudentStatus } = examSlice.selectors
