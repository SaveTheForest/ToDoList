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
export default function Login({ navigation }) {
  const [secure, setSecure] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const handleLogin = () => {
    setLoading(false);
    if (email.trim() !== "" && password.trim() !== "") {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate("Home"))
        .catch((err) => showErrorMessage(err))
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

    if (error.code === "auth/invalid-email") {
      errMessage = "That email address is invalid!";
    }
    if (error.code === "auth/user-not-found") {
      errMessage = "This invalid email address/password!";
    }
    if (error.code === "auth/wrong-password") {
      errMessage = "This invalid password!";
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

      <Text style={styles.TitleScreen}>Login</Text>
      <TextInput
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
            "Login"
          ) : (
            <ActivityIndicator color={"#DDD"} size={28} />
          ),
        }}
        handle={handleLogin}
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
