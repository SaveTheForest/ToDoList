import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";

export default function AddTask({ requestClose, newTask }) {
  const [textInput, setTextInput] = useState("");

  const handleNewTask = () => {
    if (textInput.trim() !== "") {
      newTask(textInput);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => requestClose(false)}
      />
      <KeyboardAvoidingView behavior="height" style={styles.areaInput}>
        <Text style={styles.text}>Enter the task</Text>
        <View style={styles.rowCenter}>
          <TextInput
            maxLength={40}
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
            style={styles.input}
            cursorColor={"#AA85FF"}
          />
          <Text style={[styles.text, { right: 30 }]}>
            {40 - textInput.length}
          </Text>
        </View>
        <View
          style={[
            styles.rowCenter,
            {
              justifyContent: "flex-end",
              marginTop: 10,
            },
          ]}
        >
          <TouchableOpacity onPress={() => requestClose(false)}>
            <Text style={[styles.text, { marginHorizontal: 30 }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNewTask()}>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  areaInput: {
    width: "100%",
    height: "20%",
    borderRadius: 12,
    backgroundColor: "#383838",
    padding: 26,
  },
  text: {
    fontSize: 18,
    color: "#ddd",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 45,
    borderBottomColor: "#AA85FF",
    borderBottomWidth: 2,
    color: "#DDD",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});
