console.disableYellowBox = true;

import React from "react";
import Home from "./src/screens/Home";
import Game from "./src/screens/Game";
import History from "./src/screens/History";

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

const Stack = createStackNavigator({
  Home,
  Game,
  History
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Stack
    },
    {
      initialRouteName: "Stack"
    }
  )
);
