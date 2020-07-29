import React from "react";
import ClothingContainer from "../clothes/clothing/ClothingContainer";
import { Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import AllClothesContainer from "../clothes/clothesList/AllClothesContainer";
import ColorsContainer from "../colors/colorList/ColorsContainer";
import NotFound from "../notFound/NotFound";
import LoginContainer from "../authentication/login/LoginContainer";
import SignUpContainer from "../authentication/signup/SignUpContainer";
import LogoutComponent from "../authentication/logout/LogutComponent";

function RoutingComponent() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/clothing/:id" component={ClothingContainer} />
      <Route path="/clothing" component={ClothingContainer} />
      <Route path="/clothes" component={AllClothesContainer} />
      <Route path="/colors" component={ColorsContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signup" component={SignUpContainer} />
      <Route path="/logout" component={LogoutComponent} />
      <Route component={NotFound}></Route>
    </Switch>
  );
}

export default RoutingComponent;
