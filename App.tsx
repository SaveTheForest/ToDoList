import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import LoggedoutRoute from "./src/routes/loggedout";
import auth from "@react-native-firebase/auth";
export default function App() {
  const currentUser = auth().currentUser?.email;

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#323232"} />
      <LoggedoutRoute
        initialRoute={currentUser === undefined ? "Initial" : "Home"}
      />
    </>
  );
}
