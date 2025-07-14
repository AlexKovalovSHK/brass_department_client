import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchDepartmentId } from "../../features/departmen/departmentApi";
import { Department } from "../../features/departmen/type";

interface Props {
  open: boolean;
  onClose: () => void;
  departmentId: number | null;
}

const DepartmentModal = ({ open, onClose, departmentId }: Props) => {
  const { data, isLoading, error } = useQuery<Department>({
    queryKey: ["department", departmentId],
    queryFn: () => fetchDepartmentId(departmentId!),
    enabled: !!departmentId && open, // запрос срабатывает только если есть ID и модалка открыта
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Информация о департаменте</DialogTitle>
      <DialogContent dividers>
        {isLoading && <CircularProgress />}
        {error instanceof Error && (
          <Typography color="error">Ошибка: {error.message}</Typography>
        )}
        {data && (
          <>
            <Typography>
              <strong>ID:</strong> {data.id}
            </Typography>
            <Typography>
              <strong>Название:</strong> {data.departName}
            </Typography>
            <Typography>
              <strong>Дата создания:</strong>{" "}
              {new Date(data.creationDate).toLocaleDateString()}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentModal;
