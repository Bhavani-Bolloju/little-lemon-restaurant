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

  fireEvent.change(dateInput, {
    target: { value: new Date().toISOString().split("T")[0] }
  });

  expect(dateInput).toBeValid();
  expect(dateInput).toHaveAttribute(
    "min",
    new Date().toISOString().split("T")[0]
  );
});

//test for writing time

test("rendering times array", () => {
  const times = ["9.30 PM - 10.30 PM", "10.30 PM - 11.30 PM"];

  render(
    <BrowserRouter>
      <BookingForm availableTimes={times} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const timeInput = screen.getByLabelText("time:");
  expect(timeInput).toBeInTheDocument();

  times.forEach((time) => {
    const optionEl = screen.getByText(time);
    expect(optionEl).toBeInTheDocument();
  });
});

test("update selected time on drop down change", () => {
  const times = ["9.30 PM - 10.30 PM", "10.30 PM - 11.30 PM"];

  render(
    <BrowserRouter>
      <BookingForm availableTimes={times} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const timeInput = screen.getByLabelText("time:");
  expect(timeInput).toBeInvalid();

  fireEvent.change(timeInput, { target: { value: "9.30 PM - 10.30 PM" } });

  expect(timeInput).toHaveValue("9.30 PM - 10.30 PM");
});

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

test("restricting additional comments to 150 characters", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const commentsField = screen.getByLabelText("additional comments:");

  expect(commentsField).toHaveAttribute("maxlength", "150");
});

//write logic for form submission
