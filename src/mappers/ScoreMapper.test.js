import { mapScoreResponseToTableData } from "./ScoreMapper";
import { mockScoreResponse, mockTableRowValue } from "../mocks/ScoreMocks";

describe("ScoreMapper", () => {
  it("should map score response to table row", () => {
    expect(mapScoreResponseToTableData(mockScoreResponse)).toEqual(
      mockTableRowValue,
    );
  });
});
