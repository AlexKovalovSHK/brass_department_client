export interface Exam {
  id: number;
  name: string;
  session: number;
  subject: string;
  date: string;
  commission: string;
  examResults?: Score[];
}

export interface NewExam {
  name: string;
  session: number;
  subject: string;
  commission: string;
}

export interface Score {
  examId: number;
  studentId: number;
  studentName: string;
  score: number;
}

export interface NewScore {
  examId: number;
  studentId: number;
  score: number;
}

export interface ExamState {
  exam?: Exam;
  examsList?: Exam[];
  errorMessage?: string;
  status?: "idle" | "loading" | "success" | "error";
}
