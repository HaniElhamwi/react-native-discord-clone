import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";

interface IStartMeetingProps {
  setName: Dispatch<SetStateAction<string>>;
  name: string;
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
  joinRoom: () => void;
}

export default function StartMeeting(props: IStartMeetingProps) {
  const { name, roomId, setName, setRoomId, joinRoom } = props;
  return (
    <View>
      <View style={styles.info}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor={"#767476"}
          placeholder="Enter Name"
        />
      </View>
      <View style={styles.info}>
        <TextInput
          style={styles.textInput}
          value={roomId}
          onChangeText={(data) => setRoomId(data)}
          placeholder="Enter Room Id"
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.startMeeting} onPress={joinRoom}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Start Meeting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    width: "100%",
    backgroundColor: "#373538",
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#484648",
    padding: 12,
    justifyContent: "center",
  },
  textInput: {
    color: "white",
    fontSize: 18,
  },
  startMeeting: {
    marginTop: 20,
    backgroundColor: "#0470DC",
    borderRadius: 15,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});
