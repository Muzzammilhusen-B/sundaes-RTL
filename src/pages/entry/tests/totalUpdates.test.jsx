import {
  render,
  screen,
  //  waitFor
} from "../../../test-utils/testing-library-utils";
import {logRoles} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  const {container} = render(<Options optionType="scoops" />);
  logRoles(container);

  //make sure subtotal start at $0
  const scoopsSubtotal = screen.getByText("Scoops total: $", {exact: false});
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  //update vanilla scoop to 1 and check subtotal

  // await waitFor(async () => {
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");
  // });

  //update chocolate scoop to 2 and check subtotal
  // await waitFor(async () => {
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
  // });
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  const {container} = render(<Options optionType="toppings" />);
  logRoles(container);
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  //make sure toppings subtotal start from 0
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  //add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //add hot fudges and check substotaal
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  //remove hot fudges and check substotaal

  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

//got grand total
describe("grand total", () => {
  test("grand total should start from $0.00", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/});
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/});
    expect(grandTotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/});
    expect(grandTotal).toHaveTextContent("0.00");
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    // expect(grandTotal).toHaveTextContent("1.50");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", {name: /Grand total: \$/});
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
