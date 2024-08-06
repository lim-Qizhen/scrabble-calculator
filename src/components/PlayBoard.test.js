import PlayBoard from "./PlayBoard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { maxLength } from "../constants";
import { calculateScore, getWords, submitWord } from "../apis/ScoreApi";
import { mockScoreResponse } from "../mocks/ScoreMocks";

jest.mock("../apis/ScoreApi");
describe("PlayBoard", () => {
  beforeEach(() => jest.resetAllMocks());
  it("should render with max length of tiles and score text and 3 buttons", () => {
    render(<PlayBoard name={"User name"} setName={jest.fn()} />);
    const inputBoxes = screen.getAllByRole("textbox");
    expect(inputBoxes).toHaveLength(maxLength);
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
    const resetTilesButton = screen.getByRole("button", {
      name: "Reset Tiles",
    });
    const submitWordButton = screen.getByRole("button", {
      name: "Submit Word",
    });
    [resetTilesButton, submitWordButton].forEach((button) => {
      expect(button).toBeDisabled();
    });
    const highScoresButton = screen.getByRole("button", {
      name: "Show High Scores",
    });
    expect(highScoresButton).not.toBeDisabled();

    const firstInput = inputBoxes[0];
    fireEvent.change(firstInput, { target: { value: "A" } });
    expect(resetTilesButton).not.toBeDisabled();
    fireEvent.click(resetTilesButton);
    expect(firstInput).toHaveValue("");
  });

  describe("show high scores button", () => {
    const clickHighScoresButton = () => {
      render(<PlayBoard name={"User name"} setName={jest.fn()} />);
      const highScoresButton = screen.getByRole("button", {
        name: "Show High Scores",
      });
      fireEvent.click(highScoresButton);
      expect(getWords).toHaveBeenCalledTimes(1);
    };

    it("should open high scores modal and display data", async () => {
      getWords.mockResolvedValue({ data: { content: [mockScoreResponse] } });
      render(<PlayBoard name={"User name"} setName={jest.fn()} />);
      const highScoresButton = screen.getByRole("button", {
        name: "Show High Scores",
      });
      fireEvent.click(highScoresButton);
      expect(getWords).toHaveBeenCalledTimes(1);
      await screen.findByText("User 1");
      await screen.findByText("EXAMPLE");
      await screen.findByText("16");
    });

    it("should open high scores modal with no data", () => {
      getWords.mockRejectedValue(new Error());
      clickHighScoresButton();
      expect(screen.getByText("No data")).toBeInTheDocument();
    });
  });

  describe("submit word button", () => {
    it("should enable submit word button if word is valid", async () => {
      calculateScore.mockResolvedValue(10);
      submitWord.mockResolvedValue(mockScoreResponse);
      render(<PlayBoard name={"User name"} setName={jest.fn()} />);
      const submitWordButton = screen.getByRole("button", {
        name: "Submit Word",
      });
      const inputBoxes = screen.getAllByRole("textbox");
      const firstInput = inputBoxes[0];
      fireEvent.change(firstInput, { target: { value: "A" } });
      await waitFor(() => expect(submitWordButton).not.toBeDisabled());
      fireEvent.change(firstInput, { target: { value: "" } });
      await waitFor(() => expect(submitWordButton).toBeDisabled());
      fireEvent.change(firstInput, { target: { value: "A" } });
      await waitFor(() => {
        expect(submitWordButton).not.toBeDisabled();
        expect(screen.getByText("Score: 10")).toBeInTheDocument();
      });
      fireEvent.click(submitWordButton);
      await waitFor(() => {
        expect(submitWordButton).toBeDisabled();
        expect(screen.getByText("Score: 0")).toBeInTheDocument();
        expect(firstInput).toHaveValue("");
      });
    });
  });

  describe("input section", () => {
    it("should only allow letters and move to next box when letter is input or shift back to previous box when backspace", () => {
      render(<PlayBoard name={"User name"} setName={jest.fn()} />);
      const inputBoxes = screen.getAllByRole("textbox");
      // shift focus to next box
      fireEvent.change(inputBoxes[0], { target: { value: "A" } });
      expect(inputBoxes[1]).toHaveFocus();
      fireEvent.keyDown(inputBoxes[1], { key: "1" });
      expect(inputBoxes[1]).toHaveValue("");
      // shift focus to previous box
      fireEvent.keyDown(inputBoxes[1], { key: "Backspace", code: "Backspace" });
      expect(inputBoxes[0]).toHaveFocus();
    });
  });
});
