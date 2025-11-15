import React, { useEffect } from "react";
import type { QuizQuestion } from "../types";
import Form from "../components/Form";
import Header from "../pages/Header";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useNavigate } from "react-router-dom";

function Body(): React.JSX.Element {
  const [quizData, setQuizData] = React.useState<QuizQuestion[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  // Navigate to QuizPage when quizData is populated
  useEffect(() => {
    if (quizData.length > 0 && !loading) {
      navigate("/quiz", { state: { quizData: quizData } });
    }
  }, [quizData, loading, navigate]);

  return (
    <main>
      <Header />
      {
        quizData.length == 0 && !loading && (
          <Form setQuizData={setQuizData} setLoading={setLoading} />
        ) /* Form component setting Loading state */
      }
      {loading && (
        <div className="loader-container">
          <ClimbingBoxLoader color="#009cdf" size={20} />
        </div>
      )}

      {/* {quizData.length > 0 && !loading && <Quiz quizData={quizData} />} */}
    </main>
  );
}

export default Body;
