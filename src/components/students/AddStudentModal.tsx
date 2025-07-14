import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NewStudent } from "../../features/students/type";
import {
  addNewStudent,
  allStudents,
} from "../../features/students/studentSlice";
import { Box, Button, Modal, TextField } from "@mui/material";
import styles from "./Student.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const AddStudentModal = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numBook, setNumBook] = useState("");
  const [city, setCity] = useState("");
  const [yearBaptism, setYearBaptism] = useState(0);
  const [dateBirth, setDateBirth] = useState<Dayjs | null>(null);
  const [session, setSession] = useState(0);
  const [instrument, setInstrument] = useState("");

  const createNewStudent = () => {
    const dto: NewStudent = {
      numBook: numBook,
      firstName: firstName,
      lastName: lastName,
      yearBaptism: yearBaptism,
      dateBirth: dateBirth ? dateBirth.format("YYYY-MM-DD") : "",
      session: session,
      instrument: instrument,
      city: city,
    };
    dispatch(addNewStudent(dto)).then(() => {
      dispatch(allStudents());
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
                      label="FirstName:"
                      variant="outlined"
                      placeholder="FirstName"
                      onChange={(e) => setFirstName(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="LastName:"
                      variant="outlined"
                      placeholder="LastName"
                      onChange={(e) => setLastName(e.target.value.trim())}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="Num book:"
                      variant="outlined"
                      placeholder="Num book"
                      onChange={(e) => setNumBook(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="City:"
                      variant="outlined"
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value.trim())}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="Instrument:"
                      variant="outlined"
                      placeholder="Instrument"
                      onChange={(e) => setInstrument(e.target.value.trim())}
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

                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of birth"
                        value={dateBirth}
                        onChange={(newValue: Dayjs | null) =>
                          setDateBirth(newValue)
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            variant: "outlined",
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3 mt-3">
                    <TextField
                      id="outlined-basic"
                      className="form-control"
                      label="Year Baptism:"
                      variant="outlined"
                      placeholder="Year Baptism"
                      onChange={(e) => setYearBaptism(Number(e.target.value))}
                    />
                  </div>
                </div>
              </form>
              <div className="d-flex flex-row-reverse mt-3">
                <Button
                  onClick={createNewStudent}
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

export default AddStudentModal;
