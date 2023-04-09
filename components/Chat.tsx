import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ChatHeader from "./ChatHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface IChatProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
}

function Chat(props: IChatProps) {
  const { modalVisible, setModalVisible } = props;
  const [messageText, setMessageText] = useState("");
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: "100%" }}>
        <ChatHeader
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
        {/* Chat Messages  */}
        <View style={styles.chatMessages}></View>
        {/* Type Messages */}
        <View style={styles.chatFormContainer}>
          <Text style={{ color: "white" }}> send to every one</Text>
          <View style={styles.chatForm}>
            <TextInput
              value={messageText}
              onChangeText={(e) => setMessageText(e)}
              style={styles.textInput}
              placeholder="Tap to chat"
            />
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: messageText ? "#0B71EB" : "#373838",
              }}
            >
              <FontAwesome name={"send"} size={25} color={"#efefef"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  chatMessages: {
    flex: 1,
  },
  chatFormContainer: {
    borderColor: "#2f2f2f",
    borderTopWidth: 1,
    padding: 12,
  },
  chatForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    color: "#efefef",
    borderColor: "#595859",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    flex: 1,
  },
  button: {
    height: 40,
    width: 40,
    marginTop: 12,
    marginLeft: 12,
    backgroundColor: "#373838",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
