import {createContext, useContext, useState} from "react";
import {pricePerItem} from "../constants";

const OrderDetails = createContext();

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);
  if (!contextValue) {
    throw new Error(
      "useOrderDetail must be called from within OrderDetailsPRovider"
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    //make a copy of existing state
    const newOptionCounts = {...optionCounts};

    //update the copy with new information
    newOptionCounts[optionType][itemName] = newItemCount;
    //update the state with the updated copy
    setOptionsCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionsCounts({scoops: {}, toppings: {}});
  }
  //utility function to derive total from optionCounts state value
  function calculateTotal(optionType) {
    //get an array of count for the option typr(for exampe, [1,2])
    const countsArray = Object.values(optionCounts[optionType]);

    //total the values  in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    //multiply the total nnumber of items by price for the item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = {optionCounts, totals, updateItemCount, resetOrder};

  return <OrderDetails.Provider value={value} {...props} />;
}
