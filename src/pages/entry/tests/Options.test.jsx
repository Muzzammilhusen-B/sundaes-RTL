import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i});
  expect(scoopImages).toHaveLength(2);

  //confirm alt text
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Display image for each tooping from the server", async () => {
  render(<Options optionType="toppings" />);

  //find images
  const toopingImages = await screen.findAllByRole("img", {name: /topping$/i});
  expect(toopingImages).toHaveLength(3);

  //confirm alt text
  const imageTitles = toopingImages.map((element) => element.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //wait for vanilla input to appear after server call
  const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"});

  //find the scoop subtotal, which starts out at 0
  const scoopsSubTotal = screen.getByText("Scoops total: $0.00");

  //clear the input
  await user.clear(vanillaInput);

  //.type() will type one character at a time
  await user.type(vanillaInput, "2.5");

  //make sure scoops subtotal hasn't updated
  expect(scoopsSubTotal).toHaveTextContent("$0.00");

  //do same for test "100"
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");

  expect(scoopsSubTotal).toHaveTextContent("$0.00");

  //do same test for "-1"
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");

  expect(scoopsSubTotal).toHaveTextContent("$0.00");
});
