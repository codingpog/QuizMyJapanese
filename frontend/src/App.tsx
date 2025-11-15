import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./pages/About";
import MyArticles from "./pages/MyArticles";
import QuizPage from "./pages/QuizPage";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-articles" element={<MyArticles />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
}

export default App;
