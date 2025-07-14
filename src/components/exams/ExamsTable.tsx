import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { styled } from '@mui/material/styles'
import { getExam, selectExamsList } from '../../features/exam/examSlice'
import { Button } from '@mui/material'
import AddExamModal from './AddExamModal'
import { useState } from 'react'
import ExamInfoModal from './ExamInfoModal'


const ExamsTable = () => {
    const dispatch = useAppDispatch()
        const exams = useAppSelector(selectExamsList)

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

        const handleOpenModal = (id: number) => {
                dispatch(getExam(id)).then(() => setOpenModal(true))
            }
        
            const handleCloseModal = () => {
                setOpenModal(false)
            }

        return (
            <div>
                <AddExamModal/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell >ID</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Session</StyledTableCell>
                                <StyledTableCell align="right">Subject</StyledTableCell>
                                <StyledTableCell align="right">Date</StyledTableCell>
                                <StyledTableCell align="right">Commission</StyledTableCell>
                                <StyledTableCell align="right">Result</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exams?.map((row) => (
                                <StyledTableRow 
                                    key={row.id} 
                                    onClick={() => handleOpenModal(row.id)}
                                    hover
                                    style={{ cursor: 'pointer' }}
                                >
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell align="right" component="th" scope="row">
                                        {row.name} 
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.session}</StyledTableCell>
                                    <StyledTableCell align="right">{row.subject}</StyledTableCell>
                                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                                    <StyledTableCell align="right">{row.commission}</StyledTableCell>
                                    <StyledTableCell align="right">Result</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    
                {/* Использование модального окна */}
            <ExamInfoModal 
                open={openModal}
                onClose={handleCloseModal}
            />
            </div>
        )
};

export default ExamsTable;
