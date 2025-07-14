import axios, { AxiosError } from "axios";
import { apiUrl } from "../../App";
import { Exam, NewExam, NewScore } from "./type";

export const fechNewExam = async (dto: NewExam): Promise<Exam> => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/exams`,
      {
        name: dto.name,
        session: dto.session,
        subject: dto.subject,
        commission: dto.commission,
      },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as any;
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

export async function fechExam(id: number): Promise<Exam> {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/exams/${id}`, {
      headers: { "content-type": "application/json" },
    });
    const exam: Exam = response.data;
    //console.log(response);
    return exam;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed!!!");
  }
}

export async function fechRemoveExamId(id: number): Promise<Exam> {
  const res = await axios.delete(`${apiUrl}/api/v1/exams/${id}`, {});
  return res.data;
}

export async function fechAllExams(): Promise<Exam[]> {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/exams`, {
      headers: { "content-type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed!!!");
  }
}

export async function fechAllExamsBySessionAndYear(
  year: number,
  session: number
): Promise<Exam[]> {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/exams/years/${year}/sessions/${session}`,
      {
        headers: { "content-type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed!!!");
  }
}

export async function fechAllExamsByYear(year: number): Promise<Exam[]> {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/exams/years/${year}`, {
      headers: { "content-type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed!!!");
  }
}

export const fechNewScore = async (dto: NewScore): Promise<boolean> => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/v1/exams`,
      {
        examId: dto.examId,
        studentId: dto.studentId,
        score: dto.score,
      },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as any;
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
