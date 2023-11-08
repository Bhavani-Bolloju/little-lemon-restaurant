import { render, fireEvent, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";

test("displays error when date field is empty", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const submitBtn = screen.getByText("confirm your reservation");
  fireEvent.click(submitBtn);

  const dateInput = screen.getByLabelText("choose date:");
  expect(dateInput).toBeInvalid();

  fireEvent.change(dateInput, { target: { value: "2023-11-07" } });

  expect(dateInput).toBeValid();
});

test("displays error when time field is empty", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const submitBtn = screen.getByText("confirm your reservation");
  fireEvent.click(submitBtn);

  const timeInput = screen.getByLabelText("time:");

  expect(timeInput).toBeInvalid();
});

// test("displays available time options", () => {
//   const availableTimes = ["12:00", "13:00", "14:00"];

//   render(
//     <BrowserRouter>
//       <BookingForm
//         availableTimes={availableTimes}
//         availabilityCheck={() => {}}
//       />
//     </BrowserRouter>
//   );

//   const timeInput = screen.getByLabelText("time:");

//   expect(timeInput).toBeValid();

//   expect(screen.getByDisplayValue("12:00")).toBeInTheDocument();
//   expect(screen.getByDisplayValue("13:00")).toBeInTheDocument();
//   expect(screen.getByDisplayValue("14:00")).toBeInTheDocument();
// });
