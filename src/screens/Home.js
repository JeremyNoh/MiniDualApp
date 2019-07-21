import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { withNavigation } from "react-navigation";
import Container from "../components/Container";
import CardLink from "../components/CardLink";
import Title from "../components/Title";

function Home({ navigation }) {
  // for settup ComponentDidMount()
  const [firstInApp, setFirstInApp] = useState(true);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      navigate("Game");
      setFirstInApp(false);
    }
  });

  const navigate = direction => {
    navigation.navigate(direction);
  };

  const info = () => {
    Alert.alert(
      "Règlee du jeux",
      "Revenez içi vous verrez les règles complêtes",
      [
        {
          text: "OK",
          onPress: () => {}
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <Title title="Fais ton Choix" style={{ marginBottom: 30 }} />
      <CardLink title="Jouer" onPress={() => navigate("Game")} />
      <CardLink title="Comment Jouer | Règles" onPress={info} />
      <CardLink
        title="Historique des Parties"
        onPress={() => navigate("History")}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

Home.navigationOptions = () => ({
  headerTintColor: "black",
  title: "Bienvenu sur l'app",
  headerStyle: {
    backgroundColor: "blue"
  }
});

export default withNavigation(Home);
