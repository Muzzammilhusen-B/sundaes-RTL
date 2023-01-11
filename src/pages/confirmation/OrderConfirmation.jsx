import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import {useOrderDetails} from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({setOrderPhase}) {
  const [orderNumber, setOrderNumber] = useState(null);
  const {resetOrder} = useOrderDetails();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      //in real app we would get order details from context
      //and set with POST
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        //catch error
        //TODO; handle error here
        setError(true);
      });
  }, []);

  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  function handleClick() {
    resetOrder();

    //send back to order page
    setOrderPhase("inProgress");
  }
  if (orderNumber) {
    return (
      <div style={{textAlign: "center"}}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{fontSize: "25%"}}>
          as per our terms and conditions, nothinf will happen now
        </p>
        {newOrderButton}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
