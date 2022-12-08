import {render} from "@testing-library/react";
import {OrderDetailsProvider} from "../contexts/OrderDetails";

const rederWithContext = (ui, options) =>
  render(ui, {wrapper: OrderDetailsProvider, ...options});

//re-render everything
export * from "@testing-library/react";

//override render method
export {rederWithContext as render};
