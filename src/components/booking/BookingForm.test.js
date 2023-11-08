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

//write test for time options fetched from firebase

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
});

test("display error when diners filed is empty", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );
  const dinersField = screen.getByLabelText("Diners:");

  expect(dinersField).toBeInvalid();

  fireEvent.change(dinersField, { target: { value: "invalid" } });

  expect(dinersField).toBeInvalid();

  fireEvent.change(dinersField, { target: { value: "5" } });

  expect(dinersField).toBeValid();
});

test("select either indoor and outdoor seating option", () => {
  render(
    <BrowserRouter>
      <BookingForm availabilityCheck={() => {}} availableTimes={[]} />
    </BrowserRouter>
  );

  const indoorRadio = screen.getByLabelText("indoor");
  const outdoorRadio = screen.getByLabelText("outdoor");

  expect(indoorRadio).toHaveAttribute("required");
  expect(outdoorRadio).toHaveAttribute("required");

  expect(indoorRadio).not.toBeChecked();
  expect(outdoorRadio).not.toBeChecked();

  fireEvent.click(indoorRadio);
  expect(indoorRadio).toBeChecked();
  expect(outdoorRadio).not.toBeChecked();

  fireEvent.click(outdoorRadio);
  expect(outdoorRadio).toBeChecked();
  expect(indoorRadio).not.toBeChecked();
});
