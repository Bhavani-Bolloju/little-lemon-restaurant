import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/booking"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <BookingPage />
          </Suspense>
        }
      />
      <Route
        path="/bookingConfirm/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <BookingConfirmationPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
