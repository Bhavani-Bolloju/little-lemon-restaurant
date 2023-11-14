import { render, waitFor, screen, act } from "@testing-library/react";

import { jest } from "@jest/globals";

import userEvent from "@testing-library/user-event";
import BookingPage from "./BookingPage";
import { BrowserRouter } from "react-router-dom";

import { rest } from "msw";

import { setupServer } from "msw/node";

import "@testing-library/jest-dom/extend-expect";

//

// Create a mock server
// const server = setupServer(
//   // Define the handlers for different requests
//   rest.get(
//     "https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/restaurant_hours/:day",
//     (req, res, ctx) => {
//       // Simulate a successful response for available times
//       return res(
//         ctx.json({
//           // Mock your data here
//           // Example:
//           time1: "12:00 PM",
//           time2: "1:00 PM"
//           // ...
//         }),
//         ctx.status(200)
//       );
//     }
//   ),
//   rest.get(
//     "https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/reservations.json",
//     (req, res, ctx) => {
//       // Simulate a successful response for reserved slots
//       return res(
//         ctx.json({
//           // Mock your data here
//           // Example:
//           reservation1: { selectedTime: "12:00 PM" },
//           reservation2: { selectedTime: "1:00 PM" }
//           // ...
//         }),
//         ctx.status(200)
//       );
//     }
//   )
// );

// //mocking global fetch function

// global.fetch = jest.fn();

// //function to set up different fetch responses

// const setupFetchResponses = function (status, data) {
//   global.fetch.mockResolvedValueOnce({
//     ok: status === "success",
//     json: () => Promise.resolve(data)
//   });
// };

// test("fetching available times in loading state", async () => {
//   setupFetchResponses("loading", {});

//   render(
//     <BrowserRouter>
//       <BookingPage />
//     </BrowserRouter>
//   );

//   // userEvent.click(screen.getByLabelText("Choose Date:"));

//   // expect(screen.getByText("Loading...")).toBeInTheDocument();
// });
