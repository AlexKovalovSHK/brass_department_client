import { Button } from "@mui/material";
import { useState } from "react";
import DepartmentModal from "./DepartmentModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Department } from "../../features/departmen/type";
import { fechRemoveDepartmentId, fetchAllDepartments } from "../../features/departmen/departmentApi";
import CreateDepartmentForm from "./CreateDepartmentForm";

const ListDepartmentComp = () => {

    const [openModal, setOpenModal] = useState(false);
      const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);

       const handleOpen = (id: number) => {
    setSelectedDeptId(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedDeptId(null);
  };

  const { data, isLoading, error } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: fetchAllDepartments,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: fechRemoveDepartmentId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error: unknown) => {
      console.error("Ошибка удаления", error);
    },
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error instanceof Error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
         <h3 className="mt-3 mb-2">Список отделений</h3>
          <div className="col-lg">
            <div className="d-flex justify-content-between"></div>
            {data?.map((dept) => (
              <div
                key={dept.id}
                className="p-2 border border-dark-subtle rounded mb-2"
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{dept.departName}</strong> —{" "}
                    {new Date(dept.creationDate).toLocaleDateString()}
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      size="small"
                      className="me-1"
                      onClick={() => handleOpen(dept.id)}
                    >
                      Get
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => {
                        if (window.confirm("Удалить департамент?")) {
                          deleteMutation.mutate(dept.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CreateDepartmentForm />

          <DepartmentModal
        open={openModal}
        onClose={handleClose}
        departmentId={selectedDeptId}
      />
    </div>
  )
}

export default ListDepartmentComp