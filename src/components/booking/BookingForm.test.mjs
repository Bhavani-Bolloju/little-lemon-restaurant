import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import fetch from "node-fetch";
// const fetch = require("node-fetch");
// const nock = require("nock");
import nock from "nock";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

// global.fetch = jest.fn(() => {
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve({ name: "reservationId" })
//   });
// });

nock("https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com")
  .post("/reservations.json")
  .reply(200, { name: "reservationId" });

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
test("submit the form and navigate the user to confirmation page", async () => {
  //mock the global fetch with node-fetch

  global.fetch = fetch;

  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  //stimulate user response

  const date = new Date().toISOString().split("T")[0];

  fireEvent.change(screen.getByLabelText("choose date:"), {
    target: { value: date }
  });

  fireEvent.change(screen.getByLabelText("time:"), {
    target: { value: "9.30 PM - 10.30 PM" }
  });
  fireEvent.change(screen.getByLabelText("occasion:"), {
    target: { value: "birthday" }
  });
  fireEvent.change(screen.getByLabelText("Diners:"), {
    target: { value: "3" }
  });

  fireEvent.click(screen.getByLabelText("indoor"));
  // fireEvent.click(screen.getByLabelText("outdoor"));

  fireEvent.change(screen.getByLabelText("additional comments:"), {
    target: { value: "hello" }
  });

  //submit the form

  await (async () => {
    fireEvent.click(screen.getByText("confirm your reservation"));
  });

  //wait for async operation to complete
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/reservations.json",
      expect.objectContaining({
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          selectedDate: date,
          selectedTime: "9.30 PM - 10.30 PM",
          occasion: "birthday",
          numberOfDiners: 3,
          seatingOption: "indoor",
          comments: "hello"
        })
      })
    );
  });
});
