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
import AsyncStorage from "@react-native-async-storage/async-storage";
type StatusType = {
  status: boolean;
  id: string;
};

export default function Home({ navigation }) {
  const [name, setNome] = useState("");
  const [tasks, setTask] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeFunction, setChangeFunction] = useState(0);
  const email = auth().currentUser.email;

  const previousEditTask = async (data) => {
    try {
      await AsyncStorage.setItem("@storage_Key", data.id);
    } catch (e) {}
    setChangeFunction(2);
    setVisibleModal(true);
  };
  const handleEditTask = async (data) => {
    const value = await AsyncStorage.getItem("@storage_Key");
    firestore()
      .collection("users")
      .doc(email)
      .collection("Task")
      .doc(value)
      .update({
        text: data,
      })
      .then(() => dataUser())
      .then(() => setVisibleModal(false));
  };

  const handleUpdateStatusTask = (status: StatusType) => {
    firestore()
      .collection("users")
      .doc(email)
      .collection("Task")
      .doc(status.id)
      .update({
        status: status.status,
      })
      .then(() => dataUser());
  };

  const handleDeleteTask = (task: string) => {
    firestore()
      .collection("users")
      .doc(email)
      .collection("Task")
      .doc(task)
      .delete()
      .then(() => dataUser())
      .then(() => ToastAndroid.show("Task Deleted", ToastAndroid.SHORT))
      .catch(() => ToastAndroid.show("Failed Delete", ToastAndroid.SHORT));
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
      .then(() => dataUser())
      .then(() => setVisibleModal(false));
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
            updateTask={(status: StatusType) => handleUpdateStatusTask(status)}
            editTask={(data) => previousEditTask(data)}
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
        onPress={() => {
          setVisibleModal(true), setChangeFunction(1);
        }}
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
          newTask={(text: string) =>
            changeFunction === 1 ? handleNewTask(text) : handleEditTask(text)
          }
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
