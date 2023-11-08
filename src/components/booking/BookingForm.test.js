import { render, fireEvent, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { BrowserRouter } from "react-router-dom";
// import { rest } from "msw";
// import { setupServer } from "msw/node";

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

  // fireEvent.change(dateInput, { target: { value: "2023-11-07" } });

  // expect(dateInput).toBeValid();
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

// const sampleOptions = [
//   "5.30 PM - 6.30 PM",
//   "6.30 PM - 7.30 PM",
//   "7.30 PM - 8.30 PM"
// ];

// const server = setupServer(rest.get());

test("display error when occasion is empty", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const occasionSelect = screen.getByLabelText("occasion:");

  expect(occasionSelect).toBeInvalid();

  fireEvent.change(occasionSelect, { target: { value: "birthday" } });

  expect(occasionSelect).not.toHaveValue("");

  // const selectOccasion = screen
});
