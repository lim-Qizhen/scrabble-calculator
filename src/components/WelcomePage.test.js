import { fireEvent, render, screen } from "@testing-library/react";
import WelcomePage from "./WelcomePage";

describe("WelcomePage", () => {
  it("should display main page with play button on load", () => {
    render(<WelcomePage />);
    const playButton = screen.getByRole("button", { name: "Play" });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    const userName = "User Name";
    const nameInput = screen.getByRole("textbox");
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: userName } });
    expect(playButton).not.toBeDisabled();
    fireEvent.click(playButton);

    expect(
      screen.queryByRole("button", { name: "Play" }),
    ).not.toBeInTheDocument();

    expect(screen.getByText(`Name: ${userName}`)).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
});
