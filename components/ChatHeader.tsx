import React, { Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

interface IChatProps {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
}

function ChatHeader(props: IChatProps) {
  const { modalVisible, setModalVisible } = props;
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setModalVisible(false)}>
        <Text style={styles.buttonText}>Close</Text>
      </Pressable>
      <Text style={styles.heading}>Chat</Text>
      <Entypo name="bell" size={25} color="#efefef" />
    </View>
  );
}

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
