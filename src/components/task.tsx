import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { checKCircle, editIcon, trashIcon, unChecked } from "../assets/icons";

export default function Task({ data, deleteTask, updateTask, editTask }) {
  const status = { status: !data.status, id: data.id };

  return (
    <View style={[styles.container, { opacity: data.status ? 0.5 : 1 }]}>
      <TouchableOpacity onPress={() => updateTask(status)}>
        {data.status ? checKCircle : unChecked}
      </TouchableOpacity>
      <View style={styles.internalContainer}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.text,
              { textDecorationLine: data.status ? "line-through" : "none" },
            ]}
          >
            {data.text}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            onPress={() => editTask({ id: data.id, text: data.text })}
          >
            {editIcon}
          </TouchableOpacity>
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
