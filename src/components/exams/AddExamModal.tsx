import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { NewExam } from "../../features/exam/type";
import { addNewExam, allExams } from "../../features/exam/examSlice";
import { Box, Button, Modal, TextField } from "@mui/material";
import styles from "../students/Student.module.css";


const AddExamModal = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [commission, setCommission] = useState("");
  const [session, setSession] = useState(0);

  const createNewExam = () => {
    const dto: NewExam = {
      name: name,
      session: session,
      subject: subject,
      commission: commission,
    };
    dispatch(addNewExam(dto)).then(() => {
      dispatch(allExams());
      setOpen(false);
    });
    console.log(dto);
  };

  return (
    <div className="">
      <Button onClick={handleOpen} className=" mb-3" variant="outlined">
        Add Student
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={`${styles.modal}`}>
          <div className="container">
            <div className="m-2 mt-4 p-3 bg-light rounded-3 col-lg-12">
              <h4 id="parent-modal-title" className="ms-3 mb-3">
                Add new Student
              </h4>
              <form className="row">
                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="Name:"
                      variant="outlined"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="Subject:"
                      variant="outlined"
                      placeholder="Subject"
                      onChange={(e) => setSubject(e.target.value.trim())}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="Commission:"
                      variant="outlined"
                      placeholder="Commission"
                      onChange={(e) => setCommission(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="Session:"
                      variant="outlined"
                      placeholder="Session"
                      onChange={(e) => setSession(Number(e.target.value))}
                    />
                  </div>
                </div>
              </form>
              <div className="d-flex flex-row-reverse mt-3">
                <Button
                  onClick={createNewExam}
                  variant="contained"
                  className="ms-2"
                >
                  Add
                </Button>
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddExamModal;
