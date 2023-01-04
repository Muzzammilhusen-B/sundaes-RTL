import {render, screen} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Order phase for happy path", async () => {
  const user = userEvent.setup();

  //render app
  //Don't need to wrap in provider; already wrapped
  render(<App />);

  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  //here don't need await before screen as called axios call for vanilla above otherwise can be called
  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  //here need to await as it's for toppings
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);

  //find and click summary order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });

  await user.click(orderSummaryButton);

  //check summary subtotals
  const summaryHeading = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $6.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  //check summmary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //alternatively
  // const optionItems = screen.getByRole("listitem");
  // const optionItemText = optionItems.map((item) => item.textContent);
  // expect(optionItemText).toEqual(["1 Vanilla", "2 Chocolate", "Cherries"]);

  //accept terms and condition button
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  //check confirmation page text
  //this one is aync because there is a POST request to server in between summary page and comfirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //finds and click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {name: /new order/i});
  await user.click(newOrderButton);

  //chech that scoops and toppings have been reset
  const ScoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(ScoopsTotal).toBeInTheDocument();
  const ToppingsTotal = await screen.findByText("Toppings total: $0.00");
  expect(ToppingsTotal).toBeInTheDocument();

  //wait for items to appear so that testing library doesn't get angry about stuf
  //happening after test is over
  await screen.findByRole("spinbutton", {name: "Vanilla"});
  await screen.findByRole("checkbox", {name: "Cherries"});
});
