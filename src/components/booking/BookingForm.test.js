import React from "react";
import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";
import "@testing-library/jest-dom";

test("renders 'Reserve a table' heading", () => {
  render(<BookingForm availableTimes={[]} onTimeChange={() => {}} />);

  const heading = screen.getByText("Reserve a table");

  // expect(heading).toBeDefined();
  expect(heading).toBeInTheDocument();
});
