import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import StartMeeting from "../components/StartMeeting";
import { io } from "socket.io-client";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Chat from "../components/Chat";

function MeetingRoom() {
  let socket: any;
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [startCamera, setStartCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const startCameraHandler = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const joinRoom = () => {
    startCameraHandler();
    socket?.emit("join-room", { roomId, userName: name });
  };

  useEffect(() => {
    const Api_Url = "http://192.168.1.104:3001";
    socket = io(`${Api_Url}`);
    socket.on("connection", () => console.log("connected to socket"));
    socket.on("all-users", (users: any) => {
      setActiveUsers(users.filter((user: any) => user.userName !== name));
    });
  });

  return (
    <View style={styles.container}>
      {startCamera ? (
        <SafeAreaView style={{ flex: 1 }}>
          {/* active users */}
          <Modal
            animationType="slide"
            transparent={false}
            presentationStyle="fullScreen"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Chat
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </Modal>
          <View style={styles.activeUsersContainer}>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Camera
                type="front"
                style={{
                  width: activeUsers.length === 0 ? "100%" : 180,
                  height: activeUsers.length === 0 ? 600 : 180,
                }}
              ></Camera>
              {activeUsers.map((user: any, index) => {
                return (
                  <View style={styles.activeUserContainer} key={index}>
                    <Text>{user.userName}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.menu}>
            {menuIcons.map((item) => (
              <TouchableOpacity style={styles.tile} key={item.id}>
                <FontAwesome name={item.name} size={24} color={"#efefef"} />
                <Text style={styles.textTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.tile}
              onPress={() => setModalVisible(true)}
            >
              <FontAwesome name="comment" size={24} color={"#efefef"} />
              <Text style={styles.textTitle}>Chat</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <StartMeeting
          setName={setName}
          name={name}
          roomId={roomId}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />
      )}
    </View>
  );
}

export default MeetingRoom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto",
  },
  textTitle: {
    color: "white",
    marginTop: 10,
  },
  tile: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 15,
  },
  activeUserContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  activeUsersContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
});

const menuIcons = [
  {
    id: 1,
    name: "microphone",
    customColor: "#efefef",
    title: "Mute",
  },
  {
    id: 2,
    name: "video-camera",
    title: "Stop Video",
  },
  {
    id: 3,
    name: "upload",
    title: "Share Content",
  },
  {
    id: 4,
    name: "group",
    title: "Participants",
  },
];
