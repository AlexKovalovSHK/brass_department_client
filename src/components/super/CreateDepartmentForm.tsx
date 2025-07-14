import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNewDepartment } from "../../features/departmen/departmentApi";
import { Department, NewDepartment } from "../../features/departmen/type";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateDepartmentForm = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mutation = useMutation<Department, Error, NewDepartment>({
    mutationFn: fetchNewDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      console.error("Ошибка создания департамента", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const departName = formData.get("departName");
    if (typeof departName === "string" && departName.trim()) {
      mutation.mutate({ departName });
    }
  };

  const status = mutation.status; // "idle" | "pending" | "error" | "success" - возможны только эти заначения!!!

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">Создать отделение</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <input name="departName" placeholder="Название департамента" />
            <button type="submit" disabled={status === "pending"}>
              {status === "pending" ? "Создаём..." : "Создать"}
            </button>
            {status === "idle" && (
              <></>
            )}
            {status === "error" && (
              <div style={{ color: "red" }}>
                Ошибка: {mutation.error?.message}
              </div>
            )}
            {status === "success" && (
              <div style={{ color: "green" }}>Отделение создано!</div>
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CreateDepartmentForm;
