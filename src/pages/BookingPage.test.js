import {
  render,
  waitFor,
  screen,
  act,
  fireEvent
} from "@testing-library/react";

import { jest } from "@jest/globals";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
// import nock from "nock";

import BookingPage from "./BookingPage";
// import BookingForm from "../components/booking/BookingForm";

import "@testing-library/jest-dom/extend-expect";

import { updateTimes, initialState } from "./BookingPage";

//mock the fetch function

// jest.mock("node-fetch");

test("calling handler when date is selected and make fetch call", () => {
  render(
    <BrowserRouter>
      <BookingPage />
    </BrowserRouter>
  );
});

describe("update fetch data", () => {
  test("update times in state", () => {
    const action = {
      type: "SET_TIMES",
      times: ["9.30 PM - 10.30 PM", "10.30 PM - 11.30 PM"]
    };

    const newState = updateTimes(initialState, action);
    expect(newState.times).toEqual([
      "9.30 PM - 10.30 PM",
      "10.30 PM - 11.30 PM"
    ]);
    expect(newState.isLoading).toEqual(false);
    expect(newState.reservedSlots).toEqual(null);
  });

  test("update loading state", () => {
    const action = { type: "LOADING", loading: true };
    const newState = updateTimes(initialState, action);

    expect(newState.isLoading).toEqual(true);

    expect(newState.times).toEqual([]);
    expect(newState.reservedSlots).toEqual(null);
  });

  test("update reserved slots state", () => {
    const action = {
      type: "RESERVED_SLOTS",
      reservedSlots: ["9.30 PM - 10.30 PM"]
    };

    const newState = updateTimes(initialState, action);

    expect(newState.reservedSlots).toEqual(["9.30 PM - 10.30 PM"]);

    expect(newState.isLoading).toEqual(false);
    expect(newState.times).toEqual([]);
  });

  test("no action type match", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const newState = updateTimes(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
