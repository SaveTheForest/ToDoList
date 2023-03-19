import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { checKCircle, editIcon, trashIcon, unChecked } from "../assets/icons";

export default function Task({ data, deleteTask }) {
  const [checked, setChecked] = useState(data.status);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setChecked(!checked)}>
        {checked ? checKCircle : unChecked}
      </TouchableOpacity>

      <View style={styles.internalContainer}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.text,
              { textDecorationLine: checked ? "line-through" : "none" },
            ]}
          >
            {data.text}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity>{editIcon}</TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(data.id)}>
            {trashIcon}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#755EA9",
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    width: "98%",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: "#DDD",
    marginLeft: 10,
  },
  internalContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
