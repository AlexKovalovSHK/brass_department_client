export interface Student {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  firstNameRu: string;
  lastNameRu: string;
  sessionNum: number;
  city: string;
  dateBirth: string;
  dateBaptism: string;
  dateReceipt: string;
  dateEnd: string;
  tel: string;
  instrument: string;
  speciality: string;
  email: string;
  numberBook: string;
  note: string;
  groupNum: string;
}

export interface StudentState {
  student?: Student;
  studentsList?: Student[];
  errorMessage?: string;
  status?: "idle" | "loading" | "success" | "error";
  paginationUsers?: UsersPage;
}

export interface NewStudent {
  numBook: string;
  firstName: string;
  lastName: string;
  yearBaptism: number;
  dateBirth: string;
  session: number;
  instrument: string;
  city: string;
}
