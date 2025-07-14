import { Box, Button, Modal, Typography } from "@mui/material";
import { Student } from "../../features/students/type";
import styles from "./Student.module.css";

interface StudentInfoModalProps {
  open: boolean;
  onClose: () => void;
  student: Student | null;
}

const StudentInfoModal = ({
  open,
  onClose,
  student,
}: StudentInfoModalProps) => {
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
              Student Information
            </h4>

            {student && (
              <div className="ms-3">
                <Typography variant="h6">
                  {student.firstName} {student.lastName}
                </Typography>
                <Typography>Book: {student.numBook}</Typography>
                <Typography>City: {student.city}</Typography>
                <Typography>Instrument: {student.instrument}</Typography>
                <Typography>Date of birth: {student.dateBirth}</Typography>
                <Typography>Date of baptism: {student.yearBaptism}</Typography>
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

export default StudentInfoModal;
