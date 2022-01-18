import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// import LandingPage from "./pages/Landing";
import { Landing, Error, Register, Dashboard } from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
