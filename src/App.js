import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import TodoPage from "./pages/TodoPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/todo" element={<PrivateRoute />}>
          <Route path="/todo" element={<TodoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
