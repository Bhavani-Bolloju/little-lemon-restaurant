import { Routes, Route } from "react-router-dom";

// import BookingPage from "./pages/BookingPage";
// import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import { lazy, Suspense } from "react";
import Spinner from "./components/ui/Spinner";

const Home = lazy(() => import("./pages/HomePage"));
const Booking = lazy(() => import("./pages/BookingPage"));
const Confirmation = lazy(() => import("./pages/BookingConfirmationPage"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense
            fallback={
              <div className="spinner">
                <Spinner />
              </div>
            }
          >
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/booking"
        element={
          <Suspense
            fallback={
              <div className="spinner">
                <Spinner />
              </div>
            }
          >
            <Booking />
          </Suspense>
        }
      />
      <Route
        path="/bookingConfirm/:id"
        element={
          <Suspense
            fallback={
              <div className="spinner">
                <Spinner />
              </div>
            }
          >
            <Confirmation />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
