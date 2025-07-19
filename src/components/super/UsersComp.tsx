import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";

export interface User {
  id: number;
  username: string;
  roles: string[];
  departmentId: number;
}

// Запрос через fetch
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://brass-serv.shk.solutions/api/v1/users", {
    method: "GET",
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error("Ошибка при получении пользователей");
  }

  return response.json(); // предполагается, что API возвращает массив пользователей
};

// UI-компонент
const UsersTable = () => {
  const { data, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography color="error">
        Ошибка: {error.message}
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Department ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.roles.join(", ")}</TableCell>
              <TableCell>{user.departmentId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Оборачиваем в QueryClientProvider (если не сделано на уровне App)
const queryClient = new QueryClient();

const UsersComp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Typography variant="h5" gutterBottom>
        Список пользователей
      </Typography>
      <UsersTable />
    </QueryClientProvider>
  );
};

export default UsersComp;
