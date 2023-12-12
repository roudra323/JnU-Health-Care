// ArticlesScreen.js
import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import ArticleCard from "../Components/ArticleCard";
import Wave from "../../assets/waveHome.png";
import Recorder from "../Components/Recorder/Recorder";
import Expand from "../Components/Recorder/Expand";
import { FontAwesome5 } from "@expo/vector-icons";
const Articles = ({ navigation }) => {
  const [isListExpanded, setIsListExpanded] = useState(false);
  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  const dummyArticleData = [
    {
      id: 1,
      title: "মানসিক স্বাস্থ্য বুঝতে",
      content:
        "লোরেম ইপসাম ডোলর সিট আমেট, কনসেকটেটুর অ্যাডিপিসিং এলিট। লোরেম ইপসাম ডোলর সিট আমেট, কনসেকটেটুর অ্যাডিপিসিং এলিট...",
      author: "জন ডো",
    },
    {
      id: 2,
      title: "সুস্থ মানসিকতা জন্য টিপস",
      content: "লোরেম ইপসাম ডোলর সিট আমেট, কনসেকটেটুর অ্যাডিপিসিং এলিট...",
      author: "জেন স্মিথ",
    },
    // Add more dummy articles as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={Wave} style={styles.image}>
        <View style={styles.header}>
          <FontAwesome5
            name="arrow-left"
            size={24}
            color="black"
            style={{ paddingLeft: 20 }}
            onPress={() => navigation.goBack()}
          />
          <Recorder toggleList={toggleList} />
        </View>
      </ImageBackground>
      {isListExpanded && <Expand />}
      <Text style={styles.headerText}>আর্টিকেলস</Text>
      <View style={styles.articlesContainer}>
        {dummyArticleData.map((article) => (
          <ArticleCard
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
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  headerText: {
    fontFamily: "HindiSiliBold",
    fontSize: 30,
    paddingLeft: 15,
  },
});

export default Articles;
