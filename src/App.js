import React from "react";
import Container from "react-bootstrap/Container";
import {OrderEntry} from "./pages/entry/OrderEntry";
import "./App.css";
import {OrderDetailsProvider} from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page needs provide  */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Conformation page does not need provider */}
    </Container>
  );
}

export default App;
