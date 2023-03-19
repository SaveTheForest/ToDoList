import { View, StyleSheet } from "react-native";
import React from "react";
import { backScreenIcon } from "../assets/icons";

export default function BackScreen() {
  return <View style={styles.container}>{backScreenIcon}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderColor: "#DDD",
    borderWidth: 0.5,
    borderRadius: 6,
  },
});
