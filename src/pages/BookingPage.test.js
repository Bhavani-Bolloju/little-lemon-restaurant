import { initializeTimes, updateTimes, times } from "./BookingPage";
import userEvent from "@testing-library/user-event";

//mock the fetch function

global.fetch = jest.fn();

describe("booking page", () => {
  beforeEach(() => {
    //clear mock date before each test
    global.fetch.mockClear();
  });
});
