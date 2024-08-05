import { render, screen } from "@testing-library/react";
import ScoresTable from "./ScoresTable";
import { mockTableRowValue } from "../mocks/ScoreMocks";

describe("ScoresTable", () => {
  it("should have 3 column headers and the no records text when the rows is empty", () => {
    render(<ScoresTable rows={[]} />);
    ["Name", "Word", "Score", "No data"].forEach((tableText) => {
      expect(screen.getByText(tableText)).toBeInTheDocument();
    });
  });

  it("should have 3 column headers and display the records", () => {
    render(<ScoresTable rows={[mockTableRowValue]} />);
    ["Name", "Word", "Score"].forEach((columnHeader) => {
      expect(screen.getByText(columnHeader)).toBeInTheDocument();
    });
    ["User 1", "EXAMPLE", "16"].forEach((rowData) => {
      expect(screen.getByText(rowData)).toBeInTheDocument();
    });
  });
});
