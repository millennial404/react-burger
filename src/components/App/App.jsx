import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import { HomePage, LoginPage } from "../../pages";

function App() {
  return (
    <>
      <Router>
      <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
