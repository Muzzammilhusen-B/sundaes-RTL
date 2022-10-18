import {render, screen} from "@testing-library/react";
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
