import React from "react";

import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export const CardLink = props => {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    height: 70
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default CardLink;
