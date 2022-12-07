import axios from "axios";

import {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./ScoopOptions";
import ToopingOption from "./ToopingOption";
import AlertBanner from "../common/AlertBanner";
import {pricePerItem} from "../../constants";
import {formatCurrency} from "../../utilities";
import {useOrderDetails} from "../../contexts/OrderDetails";

export default function Options({optionType}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const {totals} = useOrderDetails();
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);
  if (error) {
    return <AlertBanner />;
  }
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToopingOption;
  const tital = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItem = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{tital}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {tital} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItem}</Row>
    </>
  );
}
