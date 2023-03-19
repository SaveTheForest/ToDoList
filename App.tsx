import React from "react";
import { StatusBar } from "react-native";
import LoggedoutRoute from "./src/routes/loggedout";

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={"#323232"} />
      <LoggedoutRoute />
    </>
  );
}
