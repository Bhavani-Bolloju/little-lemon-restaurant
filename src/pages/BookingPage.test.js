import { initializeTimes, updateTimes } from "./BookingPage";

test("initializetimes returns correct initial state", () => {
  const expectedInitialState = [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
  ];

  const result = initializeTimes();

  expect(result).toEqual(expectedInitialState);
});

test("updateTimes update state correctly based on action", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  const action = {
    type: "booking",
    value: { time: "16:00", date: "2023-10-31" }
  };
  const newState = updateTimes(initialState, action);

  expect(newState).toEqual(initialState);
});
