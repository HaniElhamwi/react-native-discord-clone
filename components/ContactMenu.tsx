import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const contacts = [
  {
    type: "starred",
    id: 1,
    name: "Starred",
  },
  {
    type: "contact",
    id: 2,
    name: "Hani El",
    photo: require("../assets/skill3.jpg"),
  },
  {
    type: "contact",
    id: 3,
    name: "Jessy The",
    photo: require("../assets/skill2.jpg"),
  },
  {
    type: "contact",
    id: 4,
    name: "Maher salh",
    photo: require("../assets/skill1.jpg"),
  },
];

function ContactMenu() {
  return (
    <View style={styles.container}>
      {contacts.map((item) => (
        <View style={styles.row} key={item.id}>
          {/* image */}
          {!item?.photo ? (
            <View style={styles.starredIcon}>
              <AntDesign name="star" size={30} color="#efefef" />
            </View>
          ) : (
            <Image
              source={item.photo}
              style={{ width: 55, height: 55, borderRadius: 20 }}
            />
          )}
          <Text style={styles.text}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
}

export default ContactMenu;

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  starredIcon: {
    backgroundColor: "#333333",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    color: "white",
    paddingLeft: 15,
    fontSize: 18,
  },
});
