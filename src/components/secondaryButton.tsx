import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function SecondaryButton({ data, handle }) {
  return (
    <TouchableOpacity
      onPress={() => handle(data.routeName)}
      style={styles.container}
    >
      <Text style={styles.text}>{data.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderColor: "#8257E5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
  },
  text: {
    color: "#DDD",
    fontWeight: "bold",
    fontSize: 20,
  },
});
