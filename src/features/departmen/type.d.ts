export interface DepartmentState {
  department?: Department;
  departmentsList?: Department[];
  errorMessage?: string;
  status?: "idle" | "loading" | "success" | "error";
}

export interface Department {
  id: number;
  departName: string;
  creationDate: string;
  managerName?: string;
  status:string
}

export interface NewDepartment {
  departName: string;
}
