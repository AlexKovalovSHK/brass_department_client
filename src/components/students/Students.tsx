import { useEffect } from "react"
import StudentsTable from "./StudentsTable"
import { useAppDispatch } from "../../app/hooks"
import { allStudents } from "../../features/students/studentSlice"


const Students = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(allStudents())
    }, [])

  return (
    <div>
        <h1>Students</h1>
        <StudentsTable/>
    </div>
  )
}

export default Students