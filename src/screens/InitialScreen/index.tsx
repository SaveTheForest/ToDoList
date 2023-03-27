import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import ConfirmButton from "../../components/confirmButton";
import SecondaryButton from "../../components/secondaryButton";

export default function Initial({ navigation }) {
  const handleChangeScreen = (nameRoute: string) => {
    navigation.navigate(nameRoute);
  };

  const animation = useRef(null);
  useEffect(() => {
    animation.current?.play();
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay={true}
        loop={true}
        ref={animation}
        style={{
          width: "100%",
          height: 400,
          alignSelf: "center",
          backgroundColor: "#323232",
        }}
        source={require("../../assets/animations/9177-taskman.json")}
      />
      <Text style={styles.text}>
        Save your tasks so you don't forget them online
      </Text>
      <View style={styles.space} />
      <ConfirmButton
        data={{ title: "Login", routeName: "Login" }}
        handle={(routeName: string) => handleChangeScreen(routeName)}
      />
      <View style={styles.space} />
      <SecondaryButton
        data={{ title: "Signup", routeName: "Signup" }}
        handle={(routeName: string) => handleChangeScreen(routeName)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 44,
    backgroundColor: "#323232",
  },
  space: {
    height: 18,
  },
  text: {
    alignSelf: "center",
    color: "#DDD",
    fontSize: 18,
    textAlign: "center",
  },
});
