import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

//mocking api req

describe("displaying all the available times and making sure time field is not empty", () => {
  const availableTimes = ["5.30 PM - 6.30 PM", "6.30 PM - 7.30 PM"];

  const mockAvailabilityCheck = jest.fn();

  test("fetch available times when date is selected", async () => {
    render(
      <BrowserRouter>
        <BookingForm
          availabilityCheck={mockAvailabilityCheck}
          availableTimes={availableTimes}
        />
      </BrowserRouter>
    );

    const dateField = screen.getByLabelText("choose date:");
    const selectedDate = new Date().toISOString().split("T")[0];

    userEvent.type(dateField, selectedDate);
    //wait for availabilitycheck function to be called
    await waitFor(() => {
      expect(mockAvailabilityCheck).toHaveBeenCalledWith(selectedDate);
    });
  });

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
});
