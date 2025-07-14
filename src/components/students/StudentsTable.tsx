import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { styled } from '@mui/material/styles'
import AddStudentModal from './AddStudentModal'
import StudentInfoModal from './StudentInfoModal'
import { getStudent, selectStudentsList } from '../../features/students/studentSlice'
import { Student } from '../../features/students/type'
import { useState } from 'react'

const StudentsTable = () => {
    const dispatch = useAppDispatch()
    const students = useAppSelector(selectStudentsList)

    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [openModal, setOpenModal] = useState(false)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }))
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }))

    const handleOpenModal = (student: Student) => {
        dispatch(getStudent(student.id))
        setSelectedStudent(student)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedStudent(null)
    }

  return (
        <div>
            <AddStudentModal/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell >Book</StyledTableCell>
                            <StyledTableCell align="right">Name, Forname</StyledTableCell>
                            <StyledTableCell align="right">City</StyledTableCell>
                            <StyledTableCell align="right">Instrument</StyledTableCell>
                            <StyledTableCell align="right">Date of birth</StyledTableCell>
                            <StyledTableCell align="right">Date of baptism</StyledTableCell>
                            <StyledTableCell align="right">Date of admission</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students?.map((row) => (
                            <StyledTableRow 
                                key={row.id} 
                                onClick={() => handleOpenModal(row)}
                                hover
                                style={{ cursor: 'pointer' }}
                            >
                                <StyledTableCell>{row.numberBook}</StyledTableCell>
                                <StyledTableCell align="right" component="th" scope="row">
                                    {row.firstName} {row.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.city}</StyledTableCell>
                                <StyledTableCell align="right">{row.instrument}</StyledTableCell>
                                <StyledTableCell align="right">{row.dateBirth}</StyledTableCell>
                                <StyledTableCell align="right">{row.dateBaptism}</StyledTableCell>
                                <StyledTableCell align="right">{row.dateReceipt
                                    
                                    
                                    }</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Использование модального окна */}
            <StudentInfoModal 
                open={openModal}
                onClose={handleCloseModal}
                student={selectedStudent}
            />
        </div>
    )
}

export default StudentsTable