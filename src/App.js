import {useState} from "react";
import Container from "react-bootstrap/Container";

import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
// import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

import "./App.css";
import {OrderDetailsProvider} from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  //order phase need to be "inProgress", "review", "completed"
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; //default to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;

    default:
      break;
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
      {/* <OrderEntry/> */}
    </OrderDetailsProvider>
  );
}

export default App;
