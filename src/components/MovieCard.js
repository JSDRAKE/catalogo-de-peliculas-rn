import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";

const Card = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 600,
  },
  textContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;
