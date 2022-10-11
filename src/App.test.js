/* eslint-disable no-unused-vars */
import {fireEvent, render, screen} from "@testing-library/react";
import App from "./App";

describe("Starting", () => {
  test("initial button and checkbox", () => {
    render(<App />);
    const redCheckbox = screen.getByRole("checkbox", {name: "Red"});

    const greenCheckbox = screen.getByRole("checkbox", {
      name: "Green",
    });

    const button1 = screen.getByRole("button", {name: "Button1"});
    const button2 = screen.getByRole("button", {name: "Button2"});

    // screen.debug();
    // expect(redCheckbox).toHaveTextContent("Change to green");
  });

  test("testing fire event for chebox checked and button color for red", () => {
    render(<App />);
    const redCheckbox = screen.getByRole("checkbox", {name: "Red"});

    const button1 = screen.getByRole("button", {name: "Button1"});

    fireEvent.click(redCheckbox);

    expect(redCheckbox).toBeChecked();

    expect(button1).toHaveStyle({backgroundColor: "red"});
  });
  test("testing fire event for chebox checked and button color for green", () => {
    render(<App />);

    const greenCheckbox = screen.getByRole("checkbox", {
      name: "Green",
    });

    const button2 = screen.getByRole("button", {name: "Button2"});
    fireEvent.click(greenCheckbox);

    expect(greenCheckbox).toBeChecked();

    expect(button2).toHaveStyle({backgroundColor: "green"});
  });
});
