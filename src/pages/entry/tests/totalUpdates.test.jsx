import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {OrderDetailsProvider} from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />, {wrapper: OrderDetailsProvider});

  //make sure subtotal start at $0
  const scoopsSubtotal = screen.getByText("Scoops total: $", {exact: false});
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  //update vanilla scoop to 1 and check subtotal
  const vanillaInput = await screen.findAllByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoop to 2 and check subtotal
  const chocolateInput = await screen.findAllByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});
