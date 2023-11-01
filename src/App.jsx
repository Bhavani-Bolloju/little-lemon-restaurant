import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/bookingConfirm" element={<BookingConfirmationPage />} />
    </Routes>
  );
}

export default App;
