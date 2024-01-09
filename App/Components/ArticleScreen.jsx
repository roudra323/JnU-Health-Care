import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import { useGlobalContext } from "../context";
import Wave from "../../assets/waveHome.png";
import { FontAwesome5 } from "@expo/vector-icons";
import client from "../api/client";

const ArticleScreen = ({ navigation, route }) => {
  const {
    atitle,
    adescription,
    author,
    date,
    userID,
    editArticle,
    isOld,
    articleId,
  } = route.params;
  const { user, articleData, setArticleData, setData, setAlert } =
    useGlobalContext();

  const [title, setTitle] = useState(`${atitle != "" ? atitle : ""}`);
  //   const [author, setAuthor] = useState(user.user?.name);
  const [description, setDescription] = useState(
    `${adescription != "" ? adescription : ""}`
  );

  const handleSubmit = async () => {
    // Code for submitting the article goes here
    // You can access the values of title, author, and description here
    // and send them to the server or perform any other action

    if (isOld) {
      console.log(user);
      console.log("Article submitted");
      await client
        .post(`/article/edit/${articleId}`, {
          title: title,
          description: description,
          posterId: userID,
          author: author,
        })
        .then((res) => {
          console.log("Article data", res.data);
          setArticleData(res.data);
          setData(articleData.length);
          setAlert({
            on: true,
            type: "success",
            message: "আপনার আর্টিকেলটি ইডিট হয়েছে",
          });
          navigation.navigate("Article");
        })
        .catch((err) => {
          setAlert({
            on: true,
            type: "error",
            message: "ত্রুটির জন্য আপনার আর্টিকেলটি ইডিট হয়নি",
          });
          console.log(err);
        });
    } else {
      console.log(user);
      console.log("Article submitted");
      await client
        .post(`/article/post`, {
          title: title,
          description: description,
          posterId: userID,
          author: author,
        })
        .then((res) => {
          console.log("Article data", res.data);
          setArticleData(res.data);
          setData(articleData.length);
          setAlert({
            on: true,
            type: "success",
            message: "আপনার আর্টিকেলটি সাবমিট হয়েছে",
          });
          navigation.navigate("Article");
        })
        .catch((err) => {
          setAlert({
            on: true,
            type: "error",
            message: "ত্রুটির জন্য আপনার আর্টিকেলটি সাবমিট হয়নি",
          });
          console.log(err);
        });
    }

    console.log(title, author, description);
  };

  const getDynamicStyle = (text) => {
    let marginRight = 300; // default margin
    if (text.length <= 4) {
      marginRight = 305;
    } else if (text.length > 10) {
      marginRight = 240; // increase margin for longer text
    }

    return {
      marginTop: 5,
      fontSize: 13,
      marginBottom: -7,
      fontFamily: "HindiSiliBold",
      marginLeft: 10,

      borderColor: "#000",
      borderWidth: 1,
      marginRight: marginRight,
      borderRadius: 10,
      backgroundColor: "#ececec",
      zIndex: 55,
      textAlign: "center",
      textAlignVertical: "center",
    };
  };

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
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            padding: 10,
            marginBottom: 30,
            marginHorizontal: 20,
            borderColor: "#000",
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "white",
            fontFamily: "HindiSiliBold",
            marginTop: -40,
          }}
        >
          মানসিক স্বাস্থ্য সম্পর্কে {"\n"} আর্টিকেলস
        </Text>
      </ImageBackground>
      <View style={styles.formContainer}>
        <Text style={getDynamicStyle("শিরোনাম")}>শিরোনাম</Text>
        {editArticle ? (
          <TextInput
            style={styles.input}
            id="title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        ) : (
          <Text style={styles.input}>{title}</Text>
        )}

        <Text style={getDynamicStyle("লেখক")}>লেখক</Text>
        <Text style={styles.input}>{author}</Text>

        <Text style={getDynamicStyle("বিস্তারিত")}>বিস্তারিত</Text>
        {editArticle ? (
          <TextInput
            style={styles.description}
            id="description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
            numberOfLines={10}
          />
        ) : (
          <Text style={styles.description}>{description}</Text>
        )}
        {/* <TextInput
          style={styles.description}
          id="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={10} // Set a larger number for numberOfLines
        /> */}
      </View>
      {editArticle ? (
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>{isOld ? "ইডিট" : "সাবমিট"}</Text>
        </Pressable>
      ) : (
        ""
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginHorizontal: 40,
    elevation: 3,
    backgroundColor: "green",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "HindiSili",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  formContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 5,
    zIndex: 1,
  },

  description: {
    minHeight: 100, // Set a minimum height
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 5,
    zIndex: 1,
    textAlignVertical: "top", // Add this to vertically center the text
  },
});

export default ArticleScreen;
