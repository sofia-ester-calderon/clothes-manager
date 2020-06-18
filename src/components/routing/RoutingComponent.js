import React from "react";
import ClothingContainer from "../clothes/clothing/ClothingContainer";
import { Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import AllClothesContainer from "../clothes/clothesList/AllClothesContainer";
import withApiErrorHandler from "../hoc/withApiErrorHandler";
import ColorsContainer from "../colors/ColorsContainer";

function RoutingComponent() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/clothing/:id" component={ClothingContainer} />
      <Route path="/clothing" component={ClothingContainer} />
      <Route path="/clothes" component={AllClothesContainer} />
      <Route path="/colors" component={ColorsContainer} />
    </Switch>
  );
}

export default withApiErrorHandler(RoutingComponent);
