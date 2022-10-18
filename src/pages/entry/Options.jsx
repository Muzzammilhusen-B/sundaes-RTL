import axios from "axios";

import {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./ScoopOptions";
import ToopingOption from "./ToopingOption";
import AlertBanner from "../common/AlertBanner";

export default function Options({optionType}) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  const optionItem = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItem}</Row>;
}
