import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import BackScreen from "../../components/backScreen";
import { TextInput } from "react-native-paper";
import ConfirmButton from "../../components/confirmButton";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
export default function Signup({ navigation }) {
  const [secure, setSecure] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const createUserAccount = () => {
    setLoading(false);
    if (email.trim() !== "" && password.trim() !== "" && name.trim() !== "") {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() =>
          firestore().collection("users").doc(email.toLowerCase()).set({
            name: name,
          })
        )
        .then(() => {
          setEmail(""), setName(""), setPassword("");
        })
        .then(() => showToast("User account successfully created!"))
        .then(() => navigation.navigate("Initial"))
        .catch((error) => showErrorMessage(error))
        .finally(() => setLoading(true));
    } else {
      showToast("Fill in all fields!");
      setLoading(true);
    }
  };

  const showErrorMessage = (error: any) => {
    let errMessage = "";
    if (error.code === "auth/email-already-in-use") {
      errMessage = "That email address is already in use!";
    }

    if (error.code === "auth/weak-password") {
      errMessage = "This password is weak!";
    }
    if (error.code === "auth/invalid-email") {
      errMessage = "This email address is invalid";
    }
    showToast(errMessage);
  };

  const showToast = (e: string) => {
    ToastAndroid.show(e, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackScreen />
      </TouchableOpacity>
      <Text style={styles.TitleScreen}>Signup</Text>
      <TextInput
        outlineColor={"#929292"}
        activeOutlineColor={"#AA85FF"}
        style={styles.input}
        textColor={"#FFF"}
        mode="outlined"
        label="Name"
        placeholderTextColor={"#FFF"}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        outlineColor={"#929292"}
        activeOutlineColor={"#AA85FF"}
        style={styles.input}
        textColor={"#FFF"}
        mode="outlined"
        label="Email"
        placeholderTextColor={"#FFF"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        outlineColor={"#929292"}
        activeOutlineColor={"#AA85FF"}
        style={styles.input}
        textColor={"#DDD"}
        mode="outlined"
        label="Password"
        right={
          <TextInput.Icon
            icon={secure ? "eye" : "eye-off"}
            onPress={() => setSecure(!secure)}
          />
        }
        secureTextEntry={secure}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.space}></View>
      <ConfirmButton
        data={{
          title: loading ? (
            "Signup"
          ) : (
            <ActivityIndicator color={"#DDD"} size={28} />
          ),
        }}
        handle={createUserAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 44,
    flex: 1,
    backgroundColor: "#323232",
  },
  TitleScreen: {
    color: "#DDD",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#323232",
    marginVertical: 8,
  },
  space: {
    height: 15,
  },
});
