import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import ArticleCard from "../Components/ArticleCard";
import { AntDesign } from "@expo/vector-icons";
import Wave from "../../assets/waveHome.png";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGlobalContext } from "../context";
import client from "../api/client";

const Articles = ({ navigation }) => {
  const { user, articleData, setArticleData, setData, data } =
    useGlobalContext();

  const [otherArticles, setOtherArticles] = useState([]);

  const fetchArticle = async () => {
    try {
      const res = await client.get("/article/");
      console.log("Article data", res.data);

      const otherArticles = res.data?.articles;

      setOtherArticles(otherArticles);

      console.log("Other articles", otherArticles);
      setData(res.data.articles.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [data]);

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
          {/* Removed unused Recorder component */}
        </View>
      </ImageBackground>
      <View style={styles.headerArt}>
        <Text style={styles.headerText}>আর্টিকেলস</Text>
      </View>

      <View style={styles.articlesContainer}>
        {otherArticles
          ? otherArticles.map((article) => (
              <TouchableOpacity
                key={article._id}
                onPress={() =>
                  navigation.navigate("ArticleScreen", {
                    articleId: article._id,
                    atitle: article.title,
                    adescription: article.description,
                    author: article.author,
                    date: article.date,
                    userID: article.posterId,
                    editArticle: false,
                  })
                }
              >
                <ArticleCard
                  title={article.title}
                  content={article.description.substring(0, 100) + "......"}
                  author={article.author}
                />
              </TouchableOpacity>
            ))
          : null}
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
  headerArt: {
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 90,
    marginHorizontal: 10,
  },
  artSection: {
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 90,
    marginHorizontal: 10,
  },
  arBox: {
    alignItems: "center",
    width: "45%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 10, // Add elevation for shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  arText: {
    fontSize: 20,
    color: "#555",
    marginTop: 10,
    paddingLeft: 20,
    fontFamily: "HindiSiliBold",
  },

  headerText: {
    fontFamily: "HindiSiliBold",
    fontSize: 30,
    paddingLeft: 15,
  },
});

export default Articles;
