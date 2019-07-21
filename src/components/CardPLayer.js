import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements";
import Image from "react-native-remote-svg";
import * as Progress from "react-native-progress";

export const CardPlayer = ({ image, name, life }) => {
  return (
    <View
      style={{
        alignItems: "center"
      }}
    >
      <View
        style={{ backgroundColor: "white", borderWidth: 2, borderRadius: 800 }}
      >
        <Image
          source={{
            uri: image
          }}
          style={{
            width: 135,
            height: 135,
            paddingBottom: 20
          }}
        />
      </View>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 5,
          color: "white",
          fontSize: 15,
          fontWeight: "bold"
        }}
      >
        {name}
      </Text>
      <Progress.Bar color="black" progress={life} width={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
    marginBottom: 30
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default CardPlayer;
