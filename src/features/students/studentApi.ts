import axios, { AxiosError } from "axios";
import { apiUrl } from "../../App";
import { NewStudent, Student } from "./type";
import { RegistrationError } from "../user/type";

export const addStudent = async (student: NewStudent): Promise<Student> => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/students`,
      {
        numBook: student.numBook,
        firstName: student.firstName,
        lastName: student.lastName,
        yearBaptism: student.yearBaptism,
        dateBirth: student.dateBirth,
        session: student.session,
        instrument: student.instrument,
        city: student.city,
      },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as RegistrationError;
      if (responseData && responseData.errors) {
        const firstErrorKey = Object.keys(responseData.errors)[0];
        throw new Error(
          "Registration failed! " + responseData.errors[firstErrorKey]
        );
      } else {
        throw new Error("Registration failed! Reason unknown");
      }
    } else {
      throw error;
    }
  }
};

export async function fechStudent(id: number): Promise<Student> {
  const res = await axios.get(`${apiUrl}/api/v1/students/${id}`, {
    withCredentials: true, // ✅ Передача кук в запросе
  });
  return res.data;
}

export async function removeStudent(id: number): Promise<Student> {
    const res = await axios.delete(`${apiUrl}/api/v1/students/${id}`, {
      withCredentials: true, // ✅ Передача кук в запросе
    });
    return res.data;
  }

export async function fechAllStudents(): Promise<Student[]> {
  const res = await axios.get(`${apiUrl}/api/v1/students`, {
    withCredentials: true, // ✅ Передача кук в запросе
  });
  return res.data;
}

