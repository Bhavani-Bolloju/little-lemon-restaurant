import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import fetchMock from "jest-fetch-mock";
import { fetchReq } from "./BookingForm";

beforeEach(() => {
  fetchMock.enableMocks();
  fetchMock.doMock();
});

afterAll(() => {
  fetchMock.mockReset();
});

test("display error when first name is empty", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const firstNameInput = screen.getByLabelText("first name:");

  expect(firstNameInput).toBeInvalid();

  fireEvent.change(firstNameInput, { target: { value: "joe" } });

  expect(firstNameInput).toBeValid();
});

test("display error when last name is empty", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const lastNameInput = screen.getByLabelText("last name:");

  expect(lastNameInput).toBeInvalid();

  fireEvent.change(lastNameInput, { target: { value: "doe" } });

  expect(lastNameInput).toBeValid();
});

test("displays error when date field is empty", () => {
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  const currentDate = new Date();
  const tmrw = new Date(currentDate);

  tmrw.setDate(currentDate.getDate() + 1);

  // const date = new Date(tmrw).toISOString().split("T"[0]);
  const dateInput = screen.getByLabelText("choose date:");

  const submitBtn = screen.getByText("confirm your reservation");
  fireEvent.click(submitBtn);
  expect(dateInput).toBeInvalid();
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

  const commentsField = screen.getByLabelText("special requests:");

  expect(commentsField).toHaveAttribute("maxlength", "150");
});

test("handles form submission and make POST request", async () => {
  const returnData = ["9.30 PM - 10.30 PM"];

  fetch.mockResponseOnce(JSON.stringify(returnData));

  //render the component
  render(
    <BrowserRouter>
      <BookingForm availableTimes={[]} availabilityCheck={() => {}} />
    </BrowserRouter>
  );

  //user interactions
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

  fireEvent.change(screen.getByLabelText("special requests:"), {
    target: { value: "hello" }
  });

  //trigger for submission
  fireEvent.click(screen.getByText("confirm your reservation"));

  //assert on response
  await waitFor(() => {
    fetchReq({
      selectedDate: "",
      selectedTime: "",
      occasion: "",
      numberOfDiners: 0,
      seatingOption: "",
      comments: ""
    }).then((res) => expect(res).toEqual(returnData));
  });
});
