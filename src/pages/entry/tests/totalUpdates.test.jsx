import {
  render,
  screen,
  //  waitFor
} from "../../../test-utils/testing-library-utils";
import {logRoles} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import Options from "../Options";

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
