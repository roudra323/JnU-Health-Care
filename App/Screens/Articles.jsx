// ArticlesScreen.js
import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import ArticleCard from "../Components/ArticleCard";

const Articles = ({ navigation }) => {
  const dummyArticleData = [
    {
      id: 1,
      title: "Understanding Mental Health",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Tips for a Healthy Mind",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "Jane Smith",
    },
    // Add more dummy articles as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.articlesContainer}>
        {dummyArticleData.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            content={article.content}
            author={article.author}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  articlesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default Articles;
