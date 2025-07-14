import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styles from "../students/Student.module.css";
import { useAppSelector } from "../../app/hooks";
import { selectExam } from "../../features/exam/examSlice";
import Paper from "@mui/material/Paper";
import ModalAddResult from "./ModalAddResult";

interface ExamInfoModalProps {
  open: boolean;
  onClose: () => void;
}

const ExamInfoModal = ({ open, onClose }: ExamInfoModalProps) => {
  const exam = useAppSelector(selectExam);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="employee-modal-title"
      aria-describedby="employee-modal-description"
    >
      <Box className={`${styles.modal}`}>
        <div className="container">
          <div className="m-2 mt-4 p-3 bg-light rounded-3 col-lg-8 mx-auto">
            <h4 id="employee-modal-title" className="ms-3 mb-3">
              Exam Information
            </h4>

            {exam && (
              <div className="mt-3">
                <Typography variant="h6">{exam.name}</Typography>
                <Typography>Name: {exam.name}</Typography>
                <Typography>Date: {exam.date}</Typography>
                <Typography>Session: {exam.session}</Typography>
                <Typography>Subject: {exam.subject}</Typography>
                {exam.examResults ? (
                  <>
                    <TableContainer component={Paper} className="mt-3">
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Nr.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {exam.examResults.map((row, i) => (
                            <TableRow
                              key={row.examId}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {i + 1}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row.studentName}
                              </TableCell>
                              <TableCell align="right">{row.score}</TableCell>
                              <TableCell align="right">edit</TableCell>
                              <TableCell align="right">delete</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Button variant="outlined" size="small" className="mt-2">
                      Add result
                    </Button>
                    <ModalAddResult/>
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}

            <div className="d-flex flex-row-reverse mt-3">
              <Button onClick={onClose} variant="outlined">
                Close
              </Button>
              <Button
                onClick={() => alert("Edit")}
                variant="outlined"
                className="me-2"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ExamInfoModal;
