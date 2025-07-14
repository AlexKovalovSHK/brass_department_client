import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import ExamsTable from "./ExamsTable";
import { allExams } from "../../features/exam/examSlice";

const Exams = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allExams());
  }, [dispatch]);
  return (
    <div>
      <h3>Exams</h3>
      <ExamsTable />
    </div>
  );
};

export default Exams;
