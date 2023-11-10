import { render, fireEvent, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

//mocking api req

describe("BookingForm", () => {
  const availableTimes = ["5.30 PM - 6.30 PM", "6.30 PM - 7.30 PM"];

  test("renders BookingForm with available times", async () => {
    render(
      <BrowserRouter>
        <BookingForm
          availabilityCheck={() => {}}
          availableTimes={availableTimes}
        />
      </BrowserRouter>
    );

    const timeSelect = screen.getByLabelText("time:");

    availableTimes.forEach((time) => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });

    userEvent.selectOptions(timeSelect, availableTimes[0]);
    expect(timeSelect).toHaveValue(availableTimes[0]);
  });
});

//testing to make sure time shuldn't have empty value

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
