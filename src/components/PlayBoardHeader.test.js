import { fireEvent, render, screen } from "@testing-library/react";
import PlayBoardHeader from "./PlayBoardHeader";
import { useState } from "react";

describe("PlayBoardHeader", () => {
  const originalName = "Original Name";
  const TestComponent = () => {
    const [name, setName] = useState(originalName);
    return <PlayBoardHeader name={name} setName={setName} />;
  };
  it("should display the name and edit button to edit the name", () => {
    render(<TestComponent />);
    expect(screen.getByText(`Name: ${originalName}`)).toBeInTheDocument();
    const editButton = screen.getByTestId("edit-name-icon");
    expect(editButton).toBeInTheDocument();

    // open edit name modal
    fireEvent.click(editButton);
    expect(screen.getByText("Edit your name:")).toBeInTheDocument();
    const saveButton = screen.getByRole("button", { name: "Save" });
    expect(saveButton).toBeDisabled();

    // edit name
    const newName = "New Name";
    const nameInput = screen.getByRole("textbox");
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: newName } });
    expect(saveButton).not.toBeDisabled();

    // disable button if no name is input or same name is input
    fireEvent.change(nameInput, { target: { value: "" } });
    expect(saveButton).toBeDisabled();
    fireEvent.change(nameInput, { target: { value: originalName } });
    expect(saveButton).toBeDisabled();

    // save new name and close modal
    fireEvent.change(nameInput, { target: { value: newName } });
    fireEvent.click(saveButton);
    expect(screen.getByText(`Name: ${newName}`)).toBeInTheDocument();

    // check close button
    fireEvent.click(editButton);
    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(screen.getByText(`Name: ${newName}`)).toBeInTheDocument();
  });
});
