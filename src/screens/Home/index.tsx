import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { addMore, dotsMenu } from "../../assets/icons";
import Task from "../../components/task";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import AddTask from "../../components/addTask";
import uuid from "react-native-uuid";

export default function Home({ navigation }) {
  const [name, setNome] = useState("");
  const [tasks, setTask] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const email = auth().currentUser.email;
  const handleDeleteTask = (task: string) => {
    firestore()
      .collection("users")
      .doc(email)
      .collection("Task")
      .doc(task)
      .delete()
      .then(() => dataUser())
      .then(() => ToastAndroid.show("Task Deleted", ToastAndroid.SHORT))
      .catch(() => console.log("err"));
  };
  const handleNewTask = (task: string) => {
    const id = uuid.v4().toString();
    firestore()
      .collection("users")
      .doc(email)
      .collection("Task")
      .doc(id)
      .set({
        id: id,
        text: task,
        status: false,
        timestamp: new Date(),
      })
      .then(() => setVisibleModal(false))
      .then(() => dataUser());
  };

  const dataUser = async () => {
    let previousTask = [];

    const data = await firestore().collection("users").doc(email).get();
    const tasks = await firestore()
      .collection("users")
      .doc(email)
      .collection("Task")
      .orderBy("timestamp", "desc")
      .get();

    tasks.docs.map((item) => previousTask.push(item.data()));
    setTask(previousTask);
    setNome(data.data().name);
  };
  useLayoutEffect(() => {
    dataUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.helloText}>
          Hello,
          <Text style={styles.userNameText}> {name}</Text>
        </Text>
        <TouchableOpacity>{dotsMenu}</TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Task
            data={item}
            deleteTask={(text: string) => handleDeleteTask(text)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 10,
            }}
          />
        )}
      />

      <TouchableOpacity
        onPress={() => setVisibleModal(true)}
        style={styles.addTaskButton}
      >
        {addMore}
      </TouchableOpacity>

      <Modal
        visible={visibleModal}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => setVisibleModal(false)}
      >
        <AddTask
          newTask={(text: string) => handleNewTask(text)}
          requestClose={(call: boolean) => setVisibleModal(call)}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#323232",
    padding: 36,
  },
  helloText: {
    color: "#DDD",
    fontSize: 24,
  },
  userNameText: {
    color: "#DDD",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25,
  },
  addTaskButton: {
    alignSelf: "flex-end",
  },
});
