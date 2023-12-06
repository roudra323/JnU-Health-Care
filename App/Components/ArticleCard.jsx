import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ArticleCard = ({ key, title, content, author }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>Author: {author}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
});

export default ArticleCard;
